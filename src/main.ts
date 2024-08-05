import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import * as express from 'express';
import * as morgan from 'morgan';
import * as requestIp from 'request-ip';
import * as responseTime from 'response-time';
import { AllExceptionsFilterDevelopment } from './errors/developmentFilters.errors';
import { AllExceptionsFilterProduction } from './errors/productionFilters.errors';
import * as cookieSession from 'cookie-session';

async function DevelopmentMode(app: any) {
  console.log('Development mode' + ' ' + process.env.NODE_ENV);
  app.use(responseTime());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(
    cookieSession({
      name: 'session',
      keys: ['ey123123'],
      // domain: '127.0.0.1',
      // path: '/',
      httpOnly: false,
      // sameSite: 'None',
      //  secure: true,
    }),
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle('library API')
    .setDescription('The Main Api Documentation for library.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api-docs', app, document);
  app.useGlobalFilters(new AllExceptionsFilterDevelopment());
}

async function ProductionMode(app: INestApplication<any>) {
  console.log('Production mode');
  const whitelist = [];
  app.use(helmet({ hidePoweredBy: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '200mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
    }),
  );
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, origin);
      } else callback(new Error('Not allowed by CORS'));
    },

    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionsFilterProduction());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(requestIp.mw());
  app.use(morgan(':method :url :status :response-time ms - :date[web]'));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(require('express-status-monitor')());
  process.env.NODE_ENV == 'Production'
    ? await ProductionMode(app)
    : await DevelopmentMode(app);
    
  await app.listen("3001" || process.env.PORT);
}
bootstrap();

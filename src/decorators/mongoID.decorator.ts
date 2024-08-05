import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { MongoIDGuard } from 'src/guards/mongoID.guard';

export function MongoIDValid() {
  return applyDecorators(
    SetMetadata('isPublic', false),
    UseGuards(MongoIDGuard),
  );
}

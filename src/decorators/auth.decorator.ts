import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { roles } from 'src/constants/enums';
import { AuthGuard } from 'src/guards/auth.guard';

export function Authenticated(role: typeof roles[keyof typeof roles], service?: string) {
  return applyDecorators(
    SetMetadata('isPublic', false),
    SetMetadata('role', role), // Set the role metadata
    SetMetadata('service', service),
    UseGuards(AuthGuard),
  );
}

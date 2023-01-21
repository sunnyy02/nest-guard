import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const authMetaData = this.reflector.getAllAndOverride<string[]>('auth', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (authMetaData?.includes('skipAuthCheck')) {
      return true;
    }
    // we use a hardcoded string to validate the user for sake of simplicity
    return request.headers?.authorization === 'valid_token';
  }
}

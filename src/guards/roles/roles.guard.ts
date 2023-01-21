import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} //reflectore nos permite coger metadatos
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRolMeta = this.reflector.get<string[]>(
      'rol',
      context.getHandler(),
    );
    const req = context.getArgByIndex(0);
    const { rol } = req.user;
    const isAllow = rol.some((rol) => getRolMeta.includes(rol)); //compáramos ambos array el del rol de usuario, con el getRolMeta que es el array del controlador permitido
    return isAllow;
  }
}

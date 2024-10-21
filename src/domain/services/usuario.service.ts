import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UsuarioRepository } from '../../repositories';
import { Usuario } from '../models';
import { HashService } from './hash.service';



export class UserNotFoundError extends Error {}
export class AuthenticateError extends Error {}


@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(
    private usuarioRepository: UsuarioRepository,
    private hashService: HashService
  ) {}

  cadastrar(name: string, username: string, email: string, password: string, role: string) {

    const usuario = new Usuario(name, username, email, password, role)
    usuario.password = this.hashService.hash(usuario.password)
    let observable = this.usuarioRepository.save(usuario)
    return observable
  }

  findOne(id: string) {
    let observable = this.usuarioRepository.find(id)
    return observable
  }

  findByEmail(email: string) {
    let observable = this.usuarioRepository.findMany({ email })
    return observable
  }

  findByUsername(username: any) {
    let observable = this.usuarioRepository.findMany({ username })
    return observable
  }

  showMany(result: Array<Usuario>) {
    for (const user of result) {
      console.log(user._id)
    }
  }
  
  showOne(result: Usuario) {
    console.log({result: result._id})
  }

  findByLogin(login: string) {
    return this.usuarioRepository.findMany({
      $or: [
        { email: login },
        { username: login }
      ]
    })
  }


}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  login(login: string, password: string) {

    return this.usuarioService.findByLogin(login).pipe(
      map(
        (result) => {
          let first = result[0]
          if (!first) {
            throw new UserNotFoundError
          }
  
          let usuario = Usuario.fromResult(first)
          if (!usuario.verifyPassword(password)) {
            throw new AuthenticateError
          }
  
          localStorage.setItem('currentUser', JSON.stringify(usuario))
          return true
        }
      )
    )

  }
}
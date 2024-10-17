import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlexiService } from './flexi.service';
import { Usuario } from '../domain/models';
import { UsuarioRepository } from '../repositories';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GaloBranco';

  constructor(private usuarioRepository: UsuarioRepository) {}

  ngOnInit() {}

  cadastrar() {
    let usuario = new Usuario(
      'asdasd',
      'antonio',
      'antonio@email.com',
      '123456',
      'consumidor'
    )

    let observable = this.usuarioRepository.save(usuario)

    observable.subscribe((result) => {
      let { id, message } = result
      console.log({ id, message })
    })
  }
}

//  flexi = flexi.setCollection('Exemplo')

//     const response = flexi.create({ola: 'mundo'})

//     console.log({response: response})   
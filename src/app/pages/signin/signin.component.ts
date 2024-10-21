import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  AuthenticateError,
  AuthService,
  UserNotFoundError
} from '../../../domain/services/usuario.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  loginForm: FormGroup

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {}

  check() {
    console.log(this.loginForm)
  }

  doLogin() {
    if (!this.loginForm.valid) {
      alert("Formulario inválido!");
      return
    }

    let loginObservable$ = this.auth.login(
      this.loginForm.controls['login'].value,
      this.loginForm.controls['password'].value
    )
    
    loginObservable$.subscribe({
      next: (_) => {
        alert("Usuario logado com sucesso!")
      },
      error: (error) => {
        if (error instanceof UserNotFoundError) {
          alert('Nenhum usuario encontrado!')
        } else if (error instanceof AuthenticateError) {
          alert('Senha ou email incorreto')
        } else {
          console.log('Erro desconhecido:', error);
        }
      }
    })
  }

}

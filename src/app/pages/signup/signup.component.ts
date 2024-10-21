import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../domain/services/usuario.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  onSumbit() {
    if (!this.signupForm.valid) {
      alert('Preencher todos os campos!');
      return
    }

    let observableCadastro$ = this.usuarioService.cadastrar(
      this.signupForm.controls['name'].value,
      this.signupForm.controls['username'].value,
      this.signupForm.controls['email'].value,
      this.signupForm.controls['password'].value,
      this.signupForm.controls['role'].value
    )

    observableCadastro$.subscribe((result) => {
      alert("Usuario cadastrado com sucesso!")
      console.log({result: result})
      this.signupForm.reset();
    })
  }

}

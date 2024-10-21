import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LojaRepository } from '../../../repositories';
import { Loja } from '../../../domain/models';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { LojaService } from '../../../domain/services/loja.service';
import { Observable } from 'rxjs';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, AsyncPipe],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent {

  lojaForm: FormGroup;
  reloadObservable$: Observable<Array<Loja>>

  constructor(private fb: FormBuilder, private lojaService: LojaService) {

    this.reloadObservable$ = this.lojaService.listar();
    this.lojaForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categories: this.fb.array([]),
      address: ['', Validators.required],
      contactInfo: ['', Validators.required],
      rating: [0]
    });

  }

  get categories(): FormArray {
    return this.lojaForm.get('categories') as FormArray;
  }

  addCategory() {
    const categoryControl = this.fb.control('', Validators.required);
    this.categories.push(categoryControl);
  }

  removeCategory(index: number) {
    this.categories.removeAt(index);
  }

  reloadLojas() {
    this.reloadObservable$ = this.lojaService.listar();
  }

  onSubmit() {
    if (!this.lojaForm.valid) {
      alert('Preencher todos os campos!');
      return;
    }

    let observableCadastro$ = this.lojaService.cadastrar(
      this.lojaForm.controls['name'].value,
      this.lojaForm.controls['description'].value,
      this.lojaForm.controls['categories'].value,
      this.lojaForm.controls['address'].value,
      this.lojaForm.controls['contactInfo'].value,
    );

    observableCadastro$.subscribe((result) => {
      alert("Loja cadastrada com sucesso!");
      console.log({result: result});

      this.lojaForm.reset();
      this.reloadObservable$ = this.lojaService.listar();
    });
  };

}

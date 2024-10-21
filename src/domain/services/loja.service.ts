import { EventEmitter, Injectable, Output } from '@angular/core';
import { Endereco, Loja } from '../models';
import { LojaRepository } from '../../repositories';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor(private repo: LojaRepository) { }

  cadastrar(
    name: string,
    description: string,
    category: Array<string>,
    address: Endereco,
    contactInfo: string,

  ) {

    let observableCadastro$ = this.repo.save({
      name: name,
      description: description,
      category: category,
      address: address,
      contactInfo: contactInfo,
      rating: 0
    });

    return observableCadastro$

  }

  listar(): Observable<Array<Loja>> {
    return this.repo.findMany({})
  }
}

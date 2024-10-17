import { Injectable } from "@angular/core"
import { DatabaseUrl, FlexiService } from "../app/flexi.service"
import { Avaliacoes } from "../domain/models/avaliacoes"
import { Categorias } from "../domain/models/categorias"
import { Enderecos } from "../domain/models/enderecos"
import { Favoritos } from "../domain/models/favoritos"
import { Loja } from "../domain/models/lojas"
import { Profissional } from "../domain/models/profissionais"
import { Usuario } from "../domain/models/usuarios"
import { settings } from "../env"


class ApiCreateResponse {
    id
    message
    constructor(id: string, message: string) {
        this.id = id
        this.message = message
    }
}

export class Repository {
    flexi: FlexiService

    constructor(flexi: FlexiService) {

        this.flexi = flexi

    }

    static async handleError(response: any) {
        const details = JSON.stringify(await response.json())
        throw new Error(`Request error: ${details}`)
    }

    save(payload: any) {
        let body = { payload: payload }
        const response = this.flexi.create(body)
        return response
    }

    find(id: string) {
        const response = this.flexi.find(id)
        return response
    }

    findMany(filters: any) {
        let body = { payload: filters }
        const response = this.flexi.findMany(filters)
        return response
    }

    delete(id: string) {
        const response = this.flexi.delete(id)
        return response
    }

    update(id: string, payload: any) {
        const response = this.flexi.update(id, payload)
        return response
    }

}



class BaseRepository {
    repo: Repository

    constructor(repo: Repository) {
        this.repo = repo
    }

    save(payload: any) {
        return this.repo.save(payload)
    }

    find(id: string) {
        return this.repo.find(id)
    }

    findMany(filters: any) {
        return this.repo.findMany(filters)
    }

    delete(id: string) {
        return this.repo.delete(id)
    }

    update(id: string, payload: any) {
        return this.repo.update(id, payload)
    }
}

@Injectable({providedIn: 'root'})
export class CategoriasRepository extends BaseRepository {
    constructor (flexi: FlexiService) {
        let flexiCategorias = flexi.setCollection(Categorias)
        let repo = new Repository(flexiCategorias)
        super(repo)
    }
}

@Injectable({providedIn: 'root'})
export class UsuarioRepository extends BaseRepository {
    constructor(flexi: FlexiService) {
      const flexiUsuarios = flexi.setCollection('usuarios');
      const repo = new Repository(flexiUsuarios); 
      super(repo);
    }
}

@Injectable({providedIn: 'root'})
export class AvaliacoesRepository extends BaseRepository {
    constructor(flexi: FlexiService) {
      const flexiAvaliacoes = flexi.setCollection('avaliacoes');
      const repo = new Repository(flexiAvaliacoes); 
      super(repo);
    }
}

@Injectable({providedIn: 'root'})
export class EnderecosRepository extends BaseRepository {
  constructor(flexi: FlexiService) {
    const flexiEnderecos = flexi.setCollection('enderecos');
    const repo = new Repository(flexiEnderecos); 
    super(repo);
  }
}

@Injectable({providedIn: 'root'})
export class FavoritosRepository extends BaseRepository {
  constructor(flexi: FlexiService) {
    const flexiFavoritos = flexi.setCollection('favoritos');
    const repo = new Repository(flexiFavoritos); 
    super(repo);
  }
}

@Injectable({providedIn: 'root'})
export class LojaRepository extends BaseRepository {
  constructor(flexi: FlexiService) {
    const flexiLoja = flexi.setCollection('lojas');
    const repo = new Repository(flexiLoja); 
    super(repo);
  }
}

@Injectable({providedIn: 'root'})
export class ProfissionalRepository extends BaseRepository {
  constructor(flexi: FlexiService) {
    const flexiProfissionais = flexi.setCollection('profissionais');
    const repo = new Repository(flexiProfissionais); 
    super(repo);
  }
}
import { HashService } from "../services/hash.service"


export type userType = {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string
}


export class Usuario {
    _id: string | null
    name: string
    username: string
    email: string
    password: string
    role: string

    constructor(name: string, username: string, email: string, password: string, role: string) {
        this._id = null;
        this.name = name;
        this.username = username
        this.email = email;
        this.password = password;
        this.role = role;  // admin, cliente, lojista, profissional
    }

    static fromResult(result: Usuario) {
        const user = new Usuario(result.name, result.username, result.email, result.password, result.role)
        
        if (!result._id) {
            throw new Error
        }

        user.setId(result._id)
        return user
    }

    static fromResults(results: Array<Usuario>) {
        return results.map((s: Usuario) => Usuario.fromResult(s))
    }

    getId(): string {
        if (this._id == null) {
            throw Error
        }
        return this._id
    }

    setId(id: string): void {
        this._id = id
    }

    verifyPassword(password: string) {
        const hashService = new HashService()
        return hashService.verify(password, this.password)
    }

    changePassword(newPassword: string) {
        this.password = newPassword;
    }
}
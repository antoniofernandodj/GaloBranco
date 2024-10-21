import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';


@Injectable({ providedIn: 'root' })
export class HashService {

    constructor() {}

    hash(password: string) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    verify(password: string, hash: string) {
        return bcrypt.compareSync(password, hash)
    }

}
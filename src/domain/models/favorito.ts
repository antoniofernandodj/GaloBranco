export class Favoritos {
    _id: string | null
    userId: string
    storeId: string | null
    professionalId: string | null

    constructor(id: string, userId: string, storeId: string, professionalId: string) {
        this._id = id;
        this.userId = userId;
        this.storeId = storeId || null;
        this.professionalId = professionalId || null;
    }

    // Métodos para manipular favoritos
}
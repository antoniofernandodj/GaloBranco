export class Favoritos {
    id: string
    userId: string
    storeId: string | null
    professionalId: string | null

    constructor(id: string, userId: string, storeId: string, professionalId: string) {
        this.id = id;
        this.userId = userId;
        this.storeId = storeId || null;
        this.professionalId = professionalId || null;
    }

    // Métodos para manipular favoritos
}
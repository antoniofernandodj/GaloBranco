export class Avaliacoes {
    id: string
    userId: string
    storeId: string | null
    professionalId: string | null
    rating: string
    comment: string
    createdAt: Date

    constructor(id: string, userId: string, storeId: string, professionalId: string, rating: string, comment: string, createdAt: Date) {
        this.id = id;
        this.userId = userId;
        this.storeId = storeId || null;  // Pode ser null se for um profissional
        this.professionalId = professionalId || null;  // Pode ser null se for uma loja
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt || new Date();
    }

    // Métodos para manipular avaliações
}
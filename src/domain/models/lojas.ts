export class Loja {
    id: string
    name: string
    description: string
    category: string
    address: string
    contactInfo: string
    userId: string
    rating: number

    constructor(id: string, name: string, description: string, category: string, address: string, contactInfo: string, userId: string, rating: number = 0) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.address = address;
        this.contactInfo = contactInfo;
        this.userId = userId;  // O ID do usuário (proprietário)
        this.rating = rating;  // Nota média inicial
    }

    // Métodos para atualizar a loja, como adicionar uma nova avaliação
    updateRating(newRating: number) {
        this.rating = (this.rating + newRating) / 2;
    }
}
export class Profissional {
    id: string
    name: string
    serviceType: string
    description: string
    contactInfo: string
    userId: string
    rating: number

    constructor(id: string, name: string, serviceType: string, description: string, contactInfo: string, userId: string, rating: number = 0) {
        this.id = id;
        this.name = name;
        this.serviceType = serviceType;
        this.description = description;
        this.contactInfo = contactInfo;
        this.userId = userId;  // O ID do usuário (proprietário)
        this.rating = rating;  // Nota média inicial
    }

    // Métodos para atualizar o profissional, como adicionar uma nova avaliação
    updateRating(newRating: number) {
        this.rating = (this.rating + newRating) / 2;
    }
}
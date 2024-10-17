export class Enderecos {
    id: string
    userId: string | null
    storeId: string | null
    professionalId: string | null
    street: string
    city: string
    postalCode: string
    coordinates: string

    constructor(id: string, userId: string, storeId: string, professionalId: string, street: string, city: string, postalCode: string, coordinates: string) {
        this.id = id;
        this.userId = userId || null;
        this.storeId = storeId || null;
        this.professionalId = professionalId || null;
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.coordinates = coordinates;  // Ex.: { lat: 0, lng: 0 }
    }

    // Métodos para manipular endereços
}
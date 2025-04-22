export interface UserPayload {
    id: number,
    name: string,
    role: "CUSTOMER" | "EVENT_ORGANIZER"
}

export interface UserRegister {
    name: string,
    email: string,
    password: string,
    role : 'CUSTOMER' | 'EVENT_ORGANIZER',
    refferalCode? : string
}

export interface EventInput {
    title: string,
    description: string,
    price: number,
    start_date: Date,
    end_date: Date,
    available_seats: number,
    location: string,
    category: 'MUSIC' | 'SPORTS' | 'BUSINESS' | 'TECHNOLOGY' | 'EDUCATION',
    imageURL: string,
    userId: number
}

export interface EventQuery {
    search?: string,
    description?: string,
    location?: string,
    category?: string,
    imageURL?: string,
    page?: number,
    limit?: number
}

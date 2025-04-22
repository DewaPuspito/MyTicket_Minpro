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
    price: number,
    start_date: Date,
    end_date: Date,
    available_seats: number,
    location: string,
    category: string,
    userId: number
}

export interface EventQuery {
    search?: string,
    location?: string,
    category?: string,
    page?: number,
    limit?: number
}

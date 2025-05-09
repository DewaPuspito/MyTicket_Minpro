export interface UserPayload {
    id: number,
    name: string,
    email: string,
    role: "CUSTOMER" | "EVENT_ORGANIZER" | null
}

export interface EventPayload {
    id: number,
    title: string,
    userId: number
}

export interface TicketPayload {
    id: number,
    qty: number,
    userId: number,
    eventId: number,
}

export interface UserRegister {
    name: string,
    email: string,
    password: string,
    role : 'CUSTOMER' | 'EVENT_ORGANIZER',
    refferalCode? : string
}

export interface UserProfile {
    name?: string,
    email?: string,
    password?: string,
    profile_pic?: string,
    refferalCodeOwned?: string,
    codes?: string[]
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

export interface GenerateTicket {
    qty: number,
    total_price?: number,
    userId: number,
    eventId: number
}

export interface VoucherInput {
    title: string;
    code: string;
    discount: number;
    expiry_date: Date;
    userId: number;
    eventId: number;
}

export interface VoucherQuery {
    search?: string;
    title?: string;
    code?: string;
    discount?: number;
    expiry_date?: Date;
    page?: number,
    limit?: number
}

export interface TransactionInput {
    fixedPrice: number;
    status: 'PENDING' | 'PAID' | 'EXPIRED' | 'REJECTED' | 'CANCELLED';
    paymentProof: string;
    userId: number;
    eventId: number;
    ticketId: number;
    vouchers: {
        code: string;
      }[];
      coupons: {
        code: string
      }[];
}
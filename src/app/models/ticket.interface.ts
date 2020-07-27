import { ProductoInterface } from './producto.interface';

export interface TicketInterface {
    noTicket: string;
    productos: ProductoInterface[];
    subtotal: number;
    time: Date;
}

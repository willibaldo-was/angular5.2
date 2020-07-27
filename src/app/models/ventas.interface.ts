import { ProductoInterface } from './producto.interface';

export interface VentasInterface{
    id: string;
    fecha: Date;
    cliente: string;
    typeDocument: string;
    importe: number;
    producto:  ProductoInterface;
    hide: boolean;
}
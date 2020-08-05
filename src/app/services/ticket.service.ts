import { Injectable } from '@angular/core';
import { TicketInterface } from '../models/ticket.interface';
import { ProductoInterface } from '../models/producto.interface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type CollectionPredicate<T> = string| AngularFirestoreCollection; 

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketCollection: AngularFirestoreCollection<TicketInterface>;
  private tickets: Observable<TicketInterface[]>;
  private ticketDoc: AngularFirestoreDocument<TicketInterface>;

  constructor(public db:AngularFirestore) { 
    this.ticketCollection = db.collection<TicketInterface>('ticket');
    this.tickets = this.ticketCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data() as TicketInterface;
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    ));
  }//  constructor
  
  getTickets(){
    return this.tickets;
  }

  getTicket(id: string):Observable<TicketInterface>{
      //return this.db.doc<TicketInterface>(`ticket/$({id})`).valueChanges();
      return this.ticketCollection.doc<TicketInterface>(id).valueChanges();
  }
  addTicket(ticket:TicketInterface){
    this.ticketCollection.add(ticket);
  }
  deleteTicket(ticket: TicketInterface){
    this.ticketDoc = this.db.doc(`ticket/$(ticket.id)`);
    this.ticketDoc.delete();
  }
  getTicketDescription(id: string){
    this.ticketDoc = this.db.doc(`ticket/$(id)`);
    return this.ticketDoc.valueChanges;
  }
  /*
  getTicketDescription(id: string){
    return {
      // ... (retorna una copia)
      ...this.tickets.find(ticket => {
      return ticket.id === id
    })
    }
  }
  /*
  createTicket(newId: string, newLine:ProductoInterface[],newSubtotal:number,newTime:string){
    this.tickets.push({
      id: newId,
      productos: newLine,
      subtotal: newSubtotal,
      time: newTime});
  }//Create ticket*/
  createTicket(ticket:TicketInterface){
    return this.ticketCollection.add(ticket)
  }
}

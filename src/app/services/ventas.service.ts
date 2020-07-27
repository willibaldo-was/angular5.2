import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { VentasInterface } from '../models/ventas.interface';
import { ProductoInterface } from '../models/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private ventasCollection: AngularFirestoreCollection <VentasInterface>;
  private ventas: Observable<VentasInterface[]>;
  private productos: Observable<ProductoInterface[]>;
  private productoDoc: Observable<ProductoInterface>;
  
  
  constructor(db: AngularFirestore) { 
    this.productos = db.collection<ProductoInterface>('productos').valueChanges();
    this.ventasCollection = db.collection<VentasInterface>('ventas');
    this.ventas = this.ventasCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id,...data}; 
        });
      }
    ));
  }
  getProductos(){ return this.productos; }
  getVentas(){    return this.ventas;   }
  getVenta(id: string){
    return this.ventasCollection.doc<VentasInterface>(id).valueChanges();
  }
  updateVenta(venta:VentasInterface,id:string){
    return this.ventasCollection.doc(id).update(venta);
  }
  addVenta(venta:VentasInterface){
    return this.ventasCollection.add(venta);
  }
  removeVenta(id:string){
    return this.ventasCollection.doc(id).delete();
  }
} 

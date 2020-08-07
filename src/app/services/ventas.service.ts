import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { VentasInterface } from '../models/ventas.interface';
import { ProductoInterface } from '../models/producto.interface';

type CollectionPredicate<T> = string | AngularFirestoreCollection;
type DocumentPredicate<T> = string | AngularFirestoreDocument;

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  
  constructor(private db: AngularFirestore) { 
    
  }
private col<T>(ref:CollectionPredicate<T>,queryFn?): AngularFirestoreCollection{
  return typeof ref === "string"? this.db.collection(ref,queryFn):ref;
}  
add<T>(ref: CollectionPredicate<T>,data){
  return this.col(ref).add({
    ...data
  })
}  
col$<T>(ref:CollectionPredicate<T>,queryFn?):Observable<any[]>{
  return this.col(ref,queryFn).snapshotChanges().pipe(
    map(docs => {
      return docs.map(d => {
        const data = d.payload.doc.data();
        const id = d.payload.doc.id;
        return {id,...data}
      })
    })
  )
}
private doc<T>(ref:DocumentPredicate<T>):AngularFirestoreDocument{
  return typeof ref === "string"? this.db.doc(ref) : ref;
}
private update<T>(ref:DocumentPredicate<T>,data){
  return this.doc(ref).update({
    ...data
  })
}
private delete<T>(ref:DocumentPredicate<T>){
  return this.doc(ref).delete();
}
}//class 

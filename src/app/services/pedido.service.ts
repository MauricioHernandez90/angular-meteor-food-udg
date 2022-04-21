import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private firestore: AngularFirestore) { }
  agregrarPedido(pedido: any): Promise<any>{
    return this.firestore.collection('pedidos').add(pedido);
   }
   getPedidos(): Observable<any>{
     return this.firestore.collection('pedidos', ref => ref.orderBy ('fechaCreacion', 'asc')).snapshotChanges();
   }
   eliminarPedido(id: string){
    return this.firestore.collection('pedidos').doc(id).delete();
   }
   getPedido(id: string): Observable<any>{
     return this.firestore.collection('pedidos').doc(id).snapshotChanges();
   }
   actualizarPedido(id: string, data:any): Promise<any>{
     return this.firestore.collection('pedidos').doc(id).update(data);
   }
}

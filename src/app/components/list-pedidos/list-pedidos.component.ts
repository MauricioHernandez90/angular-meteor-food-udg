import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.css']
})
export class ListPedidosComponent implements OnInit {

  pedidos: any[] = [];
  
  constructor(private _pedidoService: PedidoService,
              private toastr: ToastrService) {  
    
  }

  ngOnInit(): void {
    this.getPedidos()
  }
  getPedidos(){
    this._pedidoService.getPedidos().subscribe(data => {
      this.pedidos = [];
     data.forEach((element: any) =>{
     this.pedidos.push({
       id: element.payload.doc.id,
        ...element.payload.doc.data()
     })
    });
    console.log(this.pedidos);
  });

}
eliminarPedido(id: string){
  this._pedidoService.eliminarPedido(id).then(() =>{
    console.log('Pedido eliminado con Exito');
    this.toastr.error('El pedido fue eliminado con exito', 'Pedido Eliminado')
  }).catch(error => {
    console.log(error);
  })
}
}

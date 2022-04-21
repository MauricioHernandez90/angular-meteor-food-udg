import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePedidoComponent } from './components/create-pedido/create-pedido.component';
import { ListPedidosComponent } from './components/list-pedidos/list-pedidos.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-pedidos', pathMatch: 'full'},
  { path: 'list-pedidos', component: ListPedidosComponent},
  { path: 'create-pedido', component: CreatePedidoComponent},
  { path: 'editPedido/:id', component: CreatePedidoComponent},
  
  { path: '**', redirectTo: 'list-pedidos', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

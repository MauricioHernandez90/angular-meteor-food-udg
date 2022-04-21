import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-pedido',
  templateUrl: './create-pedido.component.html',
  styleUrls: ['./create-pedido.component.css']
})
export class CreatePedidoComponent implements OnInit {
  createPedido: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Pedido';

  constructor(private fb: FormBuilder, 
              private _pedidoService: PedidoService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createPedido = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      noPedido : ['', Validators.required],
      domicilio : ['', Validators.required],
      pago: ['', Validators.required]
   
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
   }

  ngOnInit(): void {
    this.esEditar()
  }

  agregarEditarPedido(){

    this.submitted = true;
    if(this.createPedido.invalid){
      return;
    }

    if(this.id === null){
      this.agregarPedido();
    }else {  
      this.editarPedido(this.id);
    }

  }

  agregarPedido(){
    const pedido: any = {
      nombre: this.createPedido.value.nombre,
      telefono: this.createPedido.value.telefono,
      noPedido: this.createPedido.value.noPedido,
      domicilio: this.createPedido.value.domicilio,
      pago: this.createPedido.value.pago,

      fechaCreacion: new Date(),
      fechaActualizacion: new Date ()
    }
    this.loading = true;
    this._pedidoService.agregrarPedido(pedido).then(() =>{
        this.toastr.success('El pedido fue registrado con exito', 'Pedido registrado');
        this.loading = false;
        this.router.navigate(['/list-pedidos'])
        
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarPedido(id: string){
    const pedido: any = {
      nombre: this.createPedido.value.nombre,
      telefono: this.createPedido.value.telefono,
      noPedido: this.createPedido.value.noPedido,
      domicilio: this.createPedido.value.domicilio,
      pago: this.createPedido.value.pago,
      fechaActualizacion: new Date ()
    }

    this.loading = true;
    this._pedidoService.actualizarPedido(id, pedido).then(()=>{
      this.loading = false;
      this.toastr.info('El pedido ha sido modificado con exito','Pedido modificado')
    })
    this.router.navigate(['/list-pedidos']);
  }
    esEditar(){
      
      if(this.id !== null){
        this.titulo = 'Editar Pedido'
        this.loading = true;
        this._pedidoService.getPedido(this.id).subscribe(data => {
          this.loading = false;
          console.log(data.payload.data()['nombre']);

          this.createPedido.setValue({
          nombre: data.payload.data()['nombre'],
          telefono: data.payload.data()['telefono'],
          noPedido: data.payload.data()['noPedido'],
          domicilio: data.payload.data()['domicilio'],
          pago: data.payload.data()['pago'],
        })
          


        })
      }
    }
}

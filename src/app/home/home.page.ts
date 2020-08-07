import { Component, OnInit } from '@angular/core';
import { VentasInterface } from '../models/ventas.interface';
import { VentasService } from '../services/ventas.service';
import { ProductoService } from '../services/producto.service';
import { ProductoInterface } from '../models/producto.interface';
import { TicketService } from '../services/ticket.service';
import { TicketInterface } from '../models/ticket.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  ventas: VentasInterface[];
  tickets: TicketInterface[];
  productosInterface: ProductoInterface[] = [];
  productos: ProductoInterface[] = [];
  constructor(
    private ventasService:VentasService,
    private productoService: ProductoService,
    private ticketService: TicketService
    ) {}
  ngOnInit(){
    this.ticketService.getTickets().subscribe( res =>{
      this.tickets = res;
    });
  }//onInit
  banderaPlu : number=0;
  numberGroups = [    [7,8,9,'Del','Clear'],    [4,5,6,'(+)','(-)'],
                      [1,2,3,'Qty','Prueba'],      [0,',','PLU','Z']
  ];
  productArray: ProductoInterface[]; ticket: ProductoInterface[]; selectedProduct: ProductoInterface;
  valueTablero : string="Escribe Codigo PLU";  x: string="" ; qty: number; i: number; subtotal: number=0;
  newTicket: TicketInterface;
  onClickButtons(symbol){
    switch(symbol){
      case 0: this.x += "0"; this.valueTablero = this.x; this.banderaPluFuntion(); break;
      case 1: this.x += "1"; this.valueTablero = this.x; this.banderaPluFuntion(); break;
      case 2: this.x += "2"; this.valueTablero = this.x; this.banderaPluFuntion(); break;
      case 3: this.x += "3"; this.valueTablero = this.x; this.banderaPluFuntion(); break;
      case 4: this.x += "4"; this.valueTablero = this.x; this.banderaPluFuntion(); break;
      case 5: this.x += "5"; this.valueTablero = this.x; this.banderaPluFuntion(); break;
      case 6: this.x += "6"; this.valueTablero = this.x; this.banderaPluFuntion(); break;
      case 7: this.x += "7"; this.valueTablero = this.x; this.banderaPluFuntion(); break;
      case 8: this.x += "8"; this.valueTablero = this.x; this.banderaPluFuntion(); break;
      case 9: this.x += "9"; this.valueTablero = this.x; this.banderaPluFuntion(); break;
      case 'PLU':
        this.onEventButtonPlu(); this.banderaPlu = 2; 
        break;
      case "(+)": this.qtyPlu(1); break;
      case "(-)": this.qtyLess(); break;
      case "Del": this.deleteDirecto(); break;
      case "Qty": 
        var num = parseInt(this.valueTablero);
        this.qtyDirecto(num); 
        break;
      case "Clear":
        this.valueTablero="";
        this.subtotal=0;
        this.ticket = [];
        this.productoService.deleteAll();
        this.productoService.subtotal = 0;
        break;
      case "Z":
        this.ventasService.add("ventas",{
          cliente: "Venta Mostrador",
          fecha: "5 de agosto de 2020",
          importe: 350
        }).then(response => console.log(response))
          .catch(err => console.log(err))
        break;
      case "Prueba":
        this.ventasService.col$("ventas").subscribe(listDoc => console.log(listDoc));
    }//switch
  }
  generarTicket(){
    if (this.subtotal === 0){   
      alert("No se puede crear ticket en blanco");
    }else{    // guardar en memoria
        //this.productoService.generarTicket(); 
        //agregar a servicio Ticket
        var date = new Date();
        var noTicket = this.tickets.length+1;
        this.newTicket = {
         noTicket: noTicket.toString(),
         productos: this.productoService.getTicket(),
         subtotal: this.subtotal,
         time: date
        };
        this.ticketService.addTicket(this.newTicket);
        this.newTicket = undefined;
        this.productoService = new ProductoService;
        this.ticket = [];
        this.productoService.ticket = [];
        this.productoService.subtotal = 0;
        this.subtotal=0;
    }//else
  }
  /*
0 no ha presiondao numero
1 ha presiondado numero
2 ya agrego un producto
3 ha presiondado numero y qty
4 ha presiondad numero + qty + numero para PLU*/
banderaPluFuntion(){  
    if(this.banderaPlu == 2)      { this.banderaPlu = 1; } 
      else if (this.banderaPlu == 0){ this.banderaPlu = 1; } 
      else if (this.banderaPlu == 3){ this.banderaPlu = 4; }
}

onEventButtonPlu(){
    // Si el codigo plu esta en los id del arreglo productos
    var descripcion = this.productoService.indexOfPlu(this.x);
    if( descripcion != "no existe"){
        //escribe la descripcion del codigo que se ingreso
        this.valueTablero = descripcion.toString();
        //agregar producto al arreglo de ticket
        this.productoService.addProductTicket();
        this.subtotal = this.productoService.subtotal;
        //se obtiene datos del servicios para publicar en html
        this.ticket = this.productoService.getTicket();
        this.banderaPlu=2;
    }else{
      alert("No existe PLU"); this.valueTablero = "Escribe Codigo PLU";
    }
    this.x = "";
}//onEventButtonPlu()

openForEdit(item: ProductoInterface){
    this.selectedProduct = item;    
}

qtyDirecto(num: number){
  // Obtiene indice del elemento seleccionado en el arreglo ticket
  const newItem = this.selectedProduct;
  if(newItem != undefined){
      var indexItem = this.ticket.findIndex(x => x == newItem);
      //quita el importe actual
      this.productoService.subtotal = this.productoService.subtotal-(newItem.qty*newItem.price);
      // agrega el producto al ticket
      this.productoService.plu(indexItem,num);
      // actualiza subtotal del servicio
      this.subtotal = this.productoService.subtotal;
    }else {//else undefined
      alert("Selecciona un producto"); 
      this.valueTablero = "Selecciona un producto"
  }//if undefined
}
  qtyPlu(num: number){
    // Obtiene indice del elemento seleccionado en el arreglo ticket
    const newItem = this.selectedProduct;
    var indexItem = this.ticket.findIndex(x => x == newItem);
       if(newItem != undefined){
            if(newItem.qty === 0)
              this.delete(indexItem);
                else if (newItem.qty >= 1){
                  this.productoService.plu(indexItem,num);
                  this.subtotal = this.productoService.subtotal;
                }
        }
        else {//else undefined
            alert("Selecciona un producto"); 
            this.valueTablero = "Selecciona un producto"
        }//if undefined
  }
  deleteDirecto(){
    const newItem = this.selectedProduct;
    if(newItem != undefined){
        var indexItemTicket = this.productoService.ticket.findIndex(x => x == newItem);
        var indexItem = this.productoService.productos.findIndex(x => x == newItem);
        //actuliza el subtotal
            this.productoService.subtotal = this.productoService.subtotal - (newItem.qty*newItem.price);
            // tambien se debe actualizar el subtotal porque son diferentes
            this.subtotal = this.productoService.subtotal;
    //elimina producto del arreglo ticket
        this.productoService.ticket.splice(indexItemTicket,1);
          // por alguna extraÃƒÂ±a razon, el ticket y producto se modifican 
          // por lo que debo reinicar los valores del producto
        this.actualizaQty(indexItem);
    }else{//else undefined
      alert("Selecciona un producto"); 
      this.valueTablero = "Selecciona un producto"
    }//if else undefined
    this.selectedProduct = undefined;
  }
  delete(index: number){
    const newItem = this.selectedProduct;
    var indexItem = this.productoService.productos.findIndex(x => x == newItem);
      // elimina producto del arreglo ticket
      this.productoService.ticket.splice(index,1);
      // por alguna extraÃƒÂ±a razon, el ticket y producto se modifican 
      // por lo que debo reinicar los valores del producto
      this.actualizaQty(indexItem);
  }
  qtyLess(){
      this.qtyPlu(-1);
  }
  actualizaQty(indexItem: number){
    this.productoService.productos[indexItem].qty=1;
    this.productoService.productos[indexItem].logo='Ã¢Å“â€œ';
  }
  productoSeleccionado(id: String){   
    this.productos = this.productoService.cleanProduct();  
    this.productoService.idActual = id;
    this.x = id.toString();
    this.valueTablero = id.toString();
    this.onEventButtonPlu();
  }
  showIds(){  this.productos = this.productoService.getIdProducts();  }  
}

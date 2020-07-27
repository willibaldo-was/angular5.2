import { Component, OnInit } from '@angular/core';
import { TicketInterface } from '../../models/ticket.interface';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  tickets: TicketInterface[];
  constructor(public ticketService: TicketService,
              private router: Router) {   }

  ngOnInit() {
    // debido  a que  no es solo un arreglo si tambien observable
    // se debe ejecutar el metodo subscribe
    this.ticketService.getTickets().subscribe(res =>{
      this.tickets = res;
      
    });;
    
  }
  onSelect(ticket:TicketInterface,id){
    this.router.navigate(['/ticket/ticket-detail'],id);
  }

}

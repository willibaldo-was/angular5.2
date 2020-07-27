import { Component, OnInit, Input } from '@angular/core';
import { TicketInterface } from 'src/app/models/ticket.interface';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticket-datail',
  templateUrl: './ticket-datail.page.html',
  styleUrls: ['./ticket-datail.page.scss'],
})
export class TicketDatailPage implements OnInit {

  ticket: TicketInterface;
  recipiedId: string;
  constructor(private activatedRoute:ActivatedRoute,
              private ticketService:TicketService) { }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap =>  {
      //if(!paraMap)
      this.recipiedId = paraMap.get('ticketId');  
    });
    //this.ticket = this.ticketService.getTicket(this.recipiedId);
    this.ticketService.getTicket(this.recipiedId).subscribe(res =>{ 
      this.ticket = res;
    });
  }
}

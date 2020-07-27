import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketDatailPageRoutingModule } from './ticket-datail-routing.module';

import { TicketDatailPage } from './ticket-datail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketDatailPageRoutingModule
  ],
  declarations: [TicketDatailPage]
})
export class TicketDatailPageModule {}

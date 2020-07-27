import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketDatailPage } from './ticket-datail.page';

const routes: Routes = [
  {
    path: '',
    component: TicketDatailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketDatailPageRoutingModule {}

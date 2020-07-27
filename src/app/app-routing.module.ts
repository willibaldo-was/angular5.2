import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home',loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'venta-detail',
    loadChildren: () => import('./pages/punto-venta/punto-venta.module').then( m => m.PuntoVentaPageModule)
  },
  {
    path: 'ticket',
    children:[
      {
        path:"",
        loadChildren: () => import('./ticket/ticket/ticket.module').then( m => m.TicketPageModule)
      },
      {
        path:":ticketId",
        loadChildren: () => import('./ticket/ticket-datail/ticket-datail.module').then( m => m.TicketDatailPageModule) 
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

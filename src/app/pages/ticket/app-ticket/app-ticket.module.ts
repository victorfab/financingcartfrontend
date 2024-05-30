import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketComponent } from '../ticket/ticket.component';
import { ModalTicketComponent } from '../modal-ticket/modal-ticket.component';
import { AppPipesModule } from 'src/app/pipes/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    TicketComponent,
    ModalTicketComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppPipesModule
  ]
})
export class AppTicketModule { }

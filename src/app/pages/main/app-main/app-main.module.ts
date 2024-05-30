import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
import { TitleComponent } from '../title/title.component';
import { CardComponent } from '../card/card.component';
import { NavComponent } from '../nav/nav.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductsComponent,
    TitleComponent,
    CardComponent,
    NavComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AppMainModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DifferComponent } from './pages/differ/differ/differ.component';
import { DifferedComponent } from './pages/differed/differed/differed.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SimulatorComponent } from './pages/simulator/simulator/simulator.component';
import { TicketComponent } from './pages/ticket/ticket/ticket.component';


import {ModalTestComponent} from "./pages/shared/modal-test/modal-test.component";
import {TestSuperTokenComponent} from "./pages/test-super-token/test-super-token.component";

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: '/products/differ' },
  //{ path: 'products', component: ProductsComponent },
  { path: '', component: DifferComponent },
  { path: 'products/differed/:id', component: DifferedComponent },
  { path: 'products/simulator', component: SimulatorComponent },
  //{ path: 'products/confirm', component: ConfirmComponent },
  { path: 'products/ticket', component: TicketComponent },
  { path: 'testCallBack', component: TestSuperTokenComponent },
  { path: 'testSuperToken', component: TestSuperTokenComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../../shared/app-shared/app-shared.module';
import { RouterModule } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { SummaryCardComponent } from '../summary-card/summary-card.component';
import { SummaryTermComponent } from '../summary-term/summary-term.component';
import { SummarySwitchComponent } from '../summary-switch/summary-switch.component';
import { ModalTermsComponent } from '../modal-terms/modal-terms.component';
import { StoreModule } from '@ngrx/store';
import { paymentsReducers } from 'src/app/ngrx/reducers/payments.reducer';
import { FlameRadioButtonModule } from '@ngx-mxflame/atoms/radio-button';
import { FlameSlideButtonModule } from '@ngx-mxflame/atoms/slide-button';

@NgModule({
  declarations: [
    ConfirmComponent,
    SummaryCardComponent,
    SummaryTermComponent,
    SummarySwitchComponent,
    ModalTermsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppSharedModule,
    FlameRadioButtonModule,
    FlameSlideButtonModule,
    StoreModule.forFeature('payments', paymentsReducers)
  ]
})
export class AppConfirmModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifferComponent } from '../differ/differ.component';
import { TapComponent } from '../tap/tap.component';
import { AppSharedModule } from '../../shared/app-shared/app-shared.module';
import { RouterModule } from '@angular/router';
import { AppPipesModule } from 'src/app/pipes/app-pipes/app-pipes.module';
import { StoreModule } from '@ngrx/store';
import { paymentsReducers } from 'src/app/ngrx/reducers/payments.reducer';
import { FlameButtonModule } from '@ngx-mxflame/atoms/button';
import {FlameIconModule} from "@ngx-mxflame/atoms/icon";

@NgModule({
  declarations: [
    DifferComponent,
    TapComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        AppSharedModule,
        AppPipesModule,
        FlameButtonModule,
        StoreModule.forFeature('payments', paymentsReducers),
        FlameIconModule
    ]
})
export class AppDifferModule { }

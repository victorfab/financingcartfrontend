import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifferedComponent } from '../differed/differed.component';
import { AppSharedModule } from '../../shared/app-shared/app-shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DifferedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppSharedModule
  ]
})
export class AppDifferedModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfirmModule } from './pages/confirm/app-confirm/app-confirm.module';
import { AppDifferModule } from './pages/differ/app-differ/app-differ.module';
import { AppDifferedModule } from './pages/differed/app-differed/app-differed.module';
import { AppMainModule } from './pages/main/app-main/app-main.module';
import { AppSharedModule } from './pages/shared/app-shared/app-shared.module';
import { AppSimulatorModule } from './pages/simulator/app-simulator/app-simulator.module';
import { AppPipesModule } from './pipes/app-pipes/app-pipes.module';
import { StoreModule } from '@ngrx/store';
import { AppTicketModule } from './pages/ticket/app-ticket/app-ticket.module';
import { FlameTheme, FlameThemeService, FlameThemeModule } from '@ngx-mxflame/atoms/theme';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GoogleTagManagerModule } from "angular-google-tag-manager";
import { ModalTestComponent } from './pages/shared/modal-test/modal-test.component';
import {FlameBottomSheetModule} from "@ngx-mxflame/atoms/bottom-sheet";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlameButtonModule} from "@ngx-mxflame/atoms/button";
import {FlameIconModule} from "@ngx-mxflame/atoms/icon";
import { ModalNotDiferedComponent } from './pages/shared/modal-not-difered/modal-not-difered.component';
import { ModalMaintenanceComponent } from './pages/shared/modal-maintenance/modal-maintenance.component';
import {FlameLoaderModule, FlameLoaderService} from "@ngx-mxflame/atoms/loader-overlay";
import { TestSuperTokenComponent } from './pages/test-super-token/test-super-token.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ModalTestComponent,
    ModalNotDiferedComponent,
    ModalMaintenanceComponent,
    TestSuperTokenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppPipesModule,
    AppSharedModule,
    AppMainModule,
    AppDifferModule,
    AppDifferedModule,
    AppSimulatorModule,
    AppConfirmModule,
    AppTicketModule,
    StoreModule.forRoot({}),
    FlameThemeModule.forRoot({
      themes: [FlameTheme],
      default: FlameTheme
    }),
    FlameBottomSheetModule,
    FlameButtonModule,
    FlameIconModule,
    FlameLoaderModule,
    GoogleTagManagerModule.forRoot({
      id: "GTM-THS5D8VD"
    })
  ],
  providers: [FlameThemeService, FlameLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

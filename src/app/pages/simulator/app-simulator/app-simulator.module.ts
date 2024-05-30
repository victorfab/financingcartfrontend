import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../../shared/app-shared/app-shared.module';
import { RouterModule } from '@angular/router';
import { SimulatorComponent } from '../simulator/simulator.component';
import { SimulatorSlideshowComponent } from '../simulator-slideshow/simulator-slideshow.component';
import { SimulatorCartComponent } from '../simulator-cart/simulator-cart.component';
import { SimulatorResultComponent } from '../simulator-result/simulator-result.component';
import { AppPipesModule } from 'src/app/pipes/app-pipes/app-pipes.module';
import { FlameButtonModule } from '@ngx-mxflame/atoms/button';
import { SimulatorSingleComponent } from '../simulator-single/simulator-single.component';
import { SimulatorModalComponent } from '../simulator-modal/simulator-modal.component';
import { FlameRadioButtonModule } from '@ngx-mxflame/atoms/radio-button';
import { FlameSlideButtonModule } from '@ngx-mxflame/atoms/slide-button';
import { SummaryTermComponent } from '../summary-term/summary-term.component';
import { SummarySwitchComponent } from '../summary-switch/summary-switch.component';
import { ModalTermsComponent } from '../modal-terms/modal-terms.component';

@NgModule({
  declarations: [
    SimulatorComponent,
    SimulatorSlideshowComponent,
    SimulatorCartComponent,
    SimulatorResultComponent,
    SimulatorSingleComponent,
    SimulatorModalComponent,
    SummaryTermComponent,
    SummarySwitchComponent,
    ModalTermsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppSharedModule,
    AppPipesModule,
    FlameButtonModule,
    FlameRadioButtonModule,
    FlameSlideButtonModule,
  ]
})
export class AppSimulatorModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SummaryDifferComponent } from "../summary-differ/summary-differ.component";
import { TitleComponent } from "../title/title.component";
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { FlameButtonModule } from "@ngx-mxflame/atoms/button";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlameButtonModule
    ],
    declarations : [
        TitleComponent,
        SummaryDifferComponent,
        ModalErrorComponent,
    ],
    exports: [
        TitleComponent,
        SummaryDifferComponent,
        ModalErrorComponent,
    ]
})
export class AppSharedModule { }

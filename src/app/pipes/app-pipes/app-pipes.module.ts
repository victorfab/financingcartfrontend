import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DatePaymentPipe } from "../date.payment.pipe";
import { AmountPaymentPipe } from '../amount.payment.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DatePaymentPipe,
        AmountPaymentPipe
    ],
    exports: [
        DatePaymentPipe,
        AmountPaymentPipe
    ]
})

export class AppPipesModule {}
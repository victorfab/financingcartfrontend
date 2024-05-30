import * as fromRoot from './app.state';
import { ConfirmState } from './confirm.state';
import { CounterState } from './counter.payment.state';
import { PaymentsState } from './payments.state';
import { ProcessPaymentGroupState } from './process.payment.group.state';
import { ProcessPaymentConfirmState, ProcessPaymentState } from './process.payment.state';

export interface AppState extends fromRoot.AppState {
    paymentsModule : PaymentsModuleState
}

export interface PaymentsModuleState {
    payments : PaymentsState;
    processPayment : ProcessPaymentState;
    processPaymentConfirm :  ProcessPaymentConfirmState,
    processPaymentGroup : ProcessPaymentGroupState;
    processConfirm : ConfirmState;
    processCounter : CounterState;
}
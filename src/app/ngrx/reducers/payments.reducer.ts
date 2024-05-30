import { createReducer, on } from "@ngrx/store";
import { setConfirmPayment, setCounterPayment, setDifferedPayment, setFlagPayment, setPaymentGeneralCounter, setPaymentToDiffer, setProcessPayment, setProcessPaymentConfirm, setProcessPaymentGroup } from "../actions/payment.action";
import { initialConfirmState } from "../state/confirm.state";
import { initialCounterState } from "../state/counter.payment.state";
import { initialPaymentsState } from "../state/payments.state";
import { initialProcessPaymentGroupState } from "../state/process.payment.group.state";
import { initialProcessPaymentState } from "../state/process.payment.state";

const paymentsReducer = createReducer(
    initialPaymentsState,
    on(setPaymentToDiffer, (state, { toDiffer }) => { 
        return { ...state, toDiffer };
    }),
    on(setDifferedPayment, (state, { differed }) => { 
        return { ...state, differed };
    }),
    on(setFlagPayment, (state, { flag }) => {
        return { ...state, flag }
    })
);

const processPaymentReducer = createReducer(
    initialProcessPaymentState,
    on(setProcessPayment, (state, { paymentCart }) => {
        return { ...state, paymentCart };
    })
);

const processPaymentConfirmReducer = createReducer(
    initialProcessPaymentState,
    on(setProcessPaymentConfirm, (state, { paymentCartConfirm }) => {
        return { ...state, paymentCartConfirm };
    })
);

const processPaymentGroupReducer = createReducer(
    initialProcessPaymentGroupState,
    on(setProcessPaymentGroup, (state, { paymentGroup }) => {
        return { ...state, paymentGroup };
    })
);

const processConfirmReducer = createReducer(
    initialConfirmState,
    on(setConfirmPayment, (state, { paymentConfirm }) => {
        return { ...state, paymentConfirm };
    })
);

const processCounterReducer = createReducer(
    initialCounterState,
    on(setCounterPayment, (state, { paymentDisplay, paymentCounter, paymentBtn, paymentMonth, paymentGeneralCounter }) => {
        return { ...state, paymentDisplay, paymentCounter, paymentBtn, paymentMonth, paymentGeneralCounter }
    }),
    on(setPaymentGeneralCounter, (state, { paymentGeneralCounter }) => {
        return { ...state, paymentGeneralCounter }
    })
);

export const paymentsReducers = {
    payments : paymentsReducer,
    processPayment : processPaymentReducer,
    processPaymentConfirm : processPaymentConfirmReducer,
    processPaymentGroup : processPaymentGroupReducer,
    processConfirm : processConfirmReducer,
    processCounter : processCounterReducer
}
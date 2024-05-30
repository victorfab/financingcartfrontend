import { createAction, props } from "@ngrx/store";

export const getPaymentToDiffer = createAction(
    'GET_PAYMENT_TO_DIFFER'
);

export const setPaymentToDiffer = createAction(
    'SET_PAYMENT_TO_DIFFER',
    props<{ toDiffer : Array<any> }>()
);

export const setDifferedPayment = createAction(
    'SET_DIFFERED_PAYMENT',
    props<{ differed : Array<any> }>()
);

export const setFlagPayment = createAction(
    'SET_FLAG_PAYMENT',
    props<{ flag : boolean }>()
);

export const getProcessPayment = createAction(
    'GET_PROCESS_PAYMENT'
);

export const setProcessPayment = createAction(
    'SET_PROCESS_PAYMENT',
    props<{ paymentCart : Array<any> }>()
);

export const getProcessPaymentConfirm = createAction(
    'GET_PROCESS_PAYMENT_CONFIRM'
);

export const setProcessPaymentConfirm = createAction(
    'SET_PROCESS_PAYMENT_CONFIRM',
    props<{ paymentCartConfirm : Array<any> }>()
);

export const setProcessPaymentGroup = createAction(
    'SET_PROCESS_PAYMENT_GROUP',
    props<{ paymentGroup : Array<any> }>()
);

export const setConfirmPayment = createAction(
    'SET_CONFIRM_PAYMENT',
    props<{ paymentConfirm : object }>()
);

export const setCounterPayment = createAction(
    'SET_COUNTER_PAYMENT',
    props<{ paymentDisplay: object, paymentCounter : object, 
            paymentBtn : boolean, paymentMonth : string,
            paymentGeneralCounter : number }>()
);

export const setPaymentGeneralCounter = createAction(
    'SET_PAYMENT_GENERAL_COUNTER',
    props<{ paymentGeneralCounter : number }>()
);
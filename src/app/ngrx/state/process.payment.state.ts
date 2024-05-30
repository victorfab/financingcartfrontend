export interface ProcessPaymentState {
    paymentCart : Array<any>;
}

export const initialProcessPaymentState : ProcessPaymentState = {
    paymentCart : []
}

export interface ProcessPaymentConfirmState {
    paymentCartConfirm : Array<any>;
}

export const initialProcessPaymentConfirmState : ProcessPaymentConfirmState = {
    paymentCartConfirm : []
}
export interface ConfirmState {
    paymentConfirm : object
}

export const initialConfirmState : ConfirmState = {
    paymentConfirm : {
        differedPayments : [],
        numPayments : 0,
        month : '0',
        paymentTotalMonth : 0.0,
        paymentTotalRate : 0.0,
        paymentAnualRate : 0.0,
        paymentMonthRate : 0.0,
        paymentTotalAmount : 0.0,
        invoice : 0,
        datetime : ""
    }
}
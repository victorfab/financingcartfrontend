export interface CounterState {
    paymentDisplay : object,
    paymentCounter : object,
    paymentBtn : boolean,
    paymentMonth : string,
    paymentGeneralCounter : number
}

export const initialCounterState : CounterState = {
    paymentDisplay : {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
    },
    paymentCounter : {
        twentyFourMsi : 0,
        twentyFourMci : 0,
        eighteenMsi : 0,
        eighteenMci : 0,
        twelveMsi : 0,
        twelveMci : 0,
        nineMsi : 0,
        nineMci : 0,
        sixMsi : 0,
        sixMci : 0,
        threeMsi : 0,
        threeMci : 0
    },
    paymentBtn : false,
    paymentMonth : '',
    paymentGeneralCounter : 0
}
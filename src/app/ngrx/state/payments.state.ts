export interface PaymentsState {
    flag : boolean;
    toDiffer : Array<any>;
    differed : Array<any>;
}

export const initialPaymentsState : PaymentsState = {
    flag : true,
    toDiffer : [],
    differed : []
}
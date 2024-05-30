import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PaymentsModuleState } from "../state/payments.module.state";

const paymentsModuleFeatureState = createFeatureSelector<PaymentsModuleState>('payments');

export const getPaymentsToDiffer = createSelector(
    paymentsModuleFeatureState,
    (state : PaymentsModuleState) => state.payments.toDiffer
);

export const getDifferedPayments = createSelector(
    paymentsModuleFeatureState,
    (state : PaymentsModuleState) => state.payments.differed
);

export const getFlagPayments = createSelector(
    paymentsModuleFeatureState,
    (state : PaymentsModuleState) => state.payments.flag
);

export const getProcessPayment = createSelector(
    paymentsModuleFeatureState,
    (state : PaymentsModuleState) => state.processPayment.paymentCart
);

export const getProcessPaymentConfirm = createSelector(
    paymentsModuleFeatureState,
    (state : PaymentsModuleState) => state.processPaymentConfirm.paymentCartConfirm
);

export const getProcessPaymentGroup = createSelector(
    paymentsModuleFeatureState,
    (state : PaymentsModuleState) => state.processPaymentGroup.paymentGroup
);

export const getProcessConfirm = createSelector(
    paymentsModuleFeatureState,
    (state : PaymentsModuleState) => state.processConfirm.paymentConfirm
);

export const getProcessCounter = createSelector(
    paymentsModuleFeatureState,
    (state : PaymentsModuleState) => state.processCounter
);
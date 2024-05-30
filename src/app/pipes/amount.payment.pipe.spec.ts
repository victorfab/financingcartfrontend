import { AmountPaymentPipe } from './amount.payment.pipe';

describe('AmountPaymentPipe', () => {
  it('create an instance', () => {
    const pipe = new AmountPaymentPipe();
    expect(pipe).toBeTruthy();
  });
});

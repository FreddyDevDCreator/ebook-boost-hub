
export const FLUTTERWAVE_CONFIG = {
  publicKey: 'FLWPUBK_TEST-8fd128bcb46353c3129ff772b4ad440f-X',
  amount: 25000,
  currency: 'NGN',
  payment_options: 'card,mobilemoney,ussd',
};

if (!FLUTTERWAVE_CONFIG.publicKey) {
  throw new Error('Flutterwave public key is not configured');
}

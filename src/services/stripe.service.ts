// stripe.service.ts
import {injectable} from '@loopback/core';
import Stripe from 'stripe';

@injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    // Configurar la instancia de Stripe con tu clave secreta

    this.stripe = new Stripe('sk_test_51OFLroAXO4zQCg9A5sSiYHkc7RhCOFx7DM3SI9zxJQnSkB1uowhj07P1pZg1S78Ha3gFgbFAbm8t04jzq4T5PyJe00felldDFZ');
  }

  async createPaymentIntent(amount: number, currency: string, customerId?: string): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId, // Puedes pasar un identificador opcional del cliente aquí
    });

    return paymentIntent;
  }
}

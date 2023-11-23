// stripe.service.ts
import {injectable} from '@loopback/core';
import Stripe from 'stripe';
import {configuracionSeguridad} from '../config/seguridad.config';

@injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    // Configurar la instancia de Stripe con tu clave secreta
    this.stripe = new Stripe(configuracionSeguridad.passwordStripe);
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

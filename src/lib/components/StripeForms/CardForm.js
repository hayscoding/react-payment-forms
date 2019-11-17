import React, { Component } from 'react'
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PaymentRequestButtonElement,
  IbanElement,
  IdealBankElement,
  StripeProvider,
  Elements,
  injectStripe,
  InjectedCheckoutForm
} from 'react-stripe-elements';
import handlers from './utils/handlers.js'
import createOptions from './utils/createOptions.js'

class _CardForm extends React.Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload) => console.log('[token]', payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      	<h1>Buy Now</h1>
        <label>
          Card details
          <CardElement
            onBlur={handlers.handleBlur}
            onChange={handlers.handleChange}
            onFocus={handlers.handleFocus}
            onReady={handlers.handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button>Pay</button>
      </form>
    );
  }
}

const CardForm = injectStripe(_CardForm);

export default CardForm;
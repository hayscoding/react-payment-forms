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

class _SplitForm extends React.Component {
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
        <label>
          Card number
          <CardNumberElement
            onBlur={handlers.handleBlur}
            onChange={handlers.handleChange}
            onFocus={handlers.handleFocus}
            onReady={handlers.handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            onBlur={handlers.handleBlur}
            onChange={handlers.handleChange}
            onFocus={handlers.handleFocus}
            onReady={handlers.handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
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
const SplitForm = injectStripe(_SplitForm);

export default SplitForm;
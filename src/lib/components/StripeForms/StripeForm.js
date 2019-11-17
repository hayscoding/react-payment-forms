import React, { Component } from 'react'
import {
  StripeProvider,
} from 'react-stripe-elements';
import Checkout from './Checkout.js'

import createOptions from './utils/createOptions.js'
import handlers from './utils/handlers.js'

import styles from '../styles/StripeForms.css'

export default class StripeForm extends Component {
  constructor() {
    super();
    this.state = { stripeLoaded: false };
  }

  componentDidMount() {
    this.addScript();
    this.setStripe();
  }

  setStripe() {
    if (window.Stripe) {
      this.setState({stripeLoaded: true});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({stripeLoaded: true});
      });
    }
  }

  addScript() {
    const script = document.createElement("script");
    script.setAttribute("id", "stripe-js")

    script.src = "https://js.stripe.com/v3/";
    script.async = true;

    document.body.appendChild(script);
  }

  showStripeForm() {
    // console.log('STRIPE: ', window.Stripe)

    if(this.state.stripeLoaded)
      return(
        <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
            <Checkout />
        </StripeProvider>
      )
  }

  render() {
    return (
      <div className={styles.StripeForm}>
        {
          this.showStripeForm()
        }
      </div>
    )
  }
}
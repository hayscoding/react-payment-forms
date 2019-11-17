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
import CardForm from './CardForm.js'
import SplitForm from './SplitForm.js'
import IdealBankForm from './IdealBankForm.js'
import IbanForm from './IbanForm.js'
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
      <div>
        {
          this.showStripeForm()
        }
      </div>
    )
  }
}

class _PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);

    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1000,
      },
    });

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      complete('success');
    });

    paymentRequest.canMakePayment().then((result) => {
      this.setState({canMakePayment: !!result});
    });

    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        className="PaymentRequestButton"
        onBlur={handlers.handleBlur}
        onClick={handlers.handleClick}
        onFocus={handlers.handleFocus}
        onReady={handlers.handleReady}
        paymentRequest={this.state.paymentRequest}
        style={{
          paymentRequestButton: {
            theme: 'dark',
            height: '64px',
            type: 'donate',
          },
        }}
      />
    ) : null;
  }
}
const PaymentRequestForm = injectStripe(_PaymentRequestForm);

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({elementFontSize: '14px'});
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({elementFontSize: '18px'});
      }
    });
  }

  render() {
    const {elementFontSize} = this.state;
    return (
      <div className="Checkout">
        <h1>Available Elements</h1>
        <Elements>
          <CardForm fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <SplitForm fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <PaymentRequestForm />
        </Elements>
        <Elements>
          <IbanForm fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <IdealBankForm fontSize={elementFontSize} />
        </Elements> 
      </div>
    );
  }
}

/*
        
        */
import React, { Component } from 'react'
import { Elements } from 'react-stripe-elements';

import CardForm from './CardForm.js'
import SplitForm from './SplitForm.js'
import IdealBankForm from './IdealBankForm.js'
import IbanForm from './IbanForm.js'
import PaymentRequestForm from './PaymentRequestForm.js'

import styles from '../styles/StripeForms.css'

export default class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
    };

    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({elementFontSize: '14px'});
      } else if (window.innerWidth >= 450 && this.state.elementFontSize !== '18px') {
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
      </div>
    );
  }
}
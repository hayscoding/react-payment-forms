import React from "react";
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements';

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = (change) => {
  console.log('[change]', change);
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _CardForm extends React.Component {
  handleSubmit = (ev) => {
    ev.preventDefault()

    if (this.props.stripe) {
      this.props.stripe.createToken()
        .then((payload) => {
          console.log('Recieved stripe token: ', payload)

          if(this.wasSuccessful(payload)){
            this.props.cb(true);
            this.sendToken(payload.token)
          }
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  getUserEmail() {
      const netlifyIdentity = window.netlifyIdentity

      if(netlifyIdentity)
        return(netlifyIdentity.currentUser().email)
      else
          console.log('called checkCurrentUser() before netlifyIdentity has been set.')
  }

  sendToken(token) {
    console.log('sending /charge post req with token...')
    
    // const url = "https://haysstanfordpay-test.herokuapp.com/chargeExt" //test url
    const url = "https://haysstanfordpay.herokuapp.com/chargeExt"  //live url
    // const url = "http://localhost:3000/chargeExt"  //local url

    const userId = this.getUserEmail()
    const data = token.email+','+token.id+','+userId

    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(data);
  }

  wasSuccessful(payload) {
    if(payload.token != undefined)
      return true
    else
      return false
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4 style={{marginBottom: 0, textShadow: 'none', paddingBottom: '20px'}}>Join the Course!</h4>
        <label style={{textShadow: 'none'}}>
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label><br />
        <button 
            id={"buyButton"}
            style={{fontWeight: 'bold', fontSize: '20px', background: '#c10000'}}>
          Enroll Now $14.00
        </button>
      </form>
    )
  }
}

const CardForm = injectStripe(_CardForm);

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
        <Elements>
          <CardForm fontSize={elementFontSize} cb={this.props.cb} />
        </Elements>
      </div>
    );
  }
}

class StripeForm extends React.Component {
  render() {
    const testKey = "pk_test_U3AMAHsJAc6EUy5oXOll9vrr"
    const liveKey = ""

    return (
      <div style={{
        background: 'white', 
        borderRadius: 50, 
        marginTop: 100, 
        padding: 30,
        width: 600,
        margin: 'auto auto',
        marginTop: '21px',
        marginBottom: '20px',
      }}>
        <StripeProvider apiKey={testKey}>
          <Checkout cb={this.props.cb} />
        </StripeProvider>
      </div>
    );
  }
};

export default StripeForm;
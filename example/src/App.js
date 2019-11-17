import React, { Component } from 'react'

import ExampleComponent, { StripeForm } from 'react-payment-forms'

export default class App extends Component {
  render () {
    return (
      <div>
      	<StripeForm />
        <ExampleComponent text='Modern React component module' />
      </div>
    )
  }
}
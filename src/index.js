import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export { default as StripeForm } from './lib/components/StripeForm/StripeForm.js' 

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {
      text
    } = this.props

    return (
      <div className={styles.test}>
        Example Component: {text}
      </div>
    )
  }
}

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currencies: [],
  //     expenses: [],
  //   };
  // }

  render() {
    const { getEmail } = this.props;
    return (
      <header className="wallet-header">
        <h1>Trybe</h1>
        <div className="email-currency-component">
          <h3 data-testid="email-field">{ `Email: ${getEmail}` }</h3>
          <div>
            <h3 data-testid="total-field">Despesa total: R$ 0.00</h3>
            <h3 data-testid="header-currency-field">BRL</h3>
          </div>
        </div>
      </header>
    );
  }
}

Wallet.propTypes = {
  getEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { getEmail, getExpenses } = this.props;
    const totalExpenses = getExpenses.reduce((accumulator, current) => (
      accumulator + (current.value * current.exchangeRates[current.currency].ask)
    ), 0);

    return (
      <header className="wallet-header">
        <h1>TrybeWallet</h1>
        <div className="email-currency-component">
          <h3 data-testid="email-field">{ `Email: ${getEmail}` }</h3>
          <div className="currency-component">
            <h3 data-testid="total-field">{`Despesa total: ${totalExpenses}`}</h3>
            <h3 data-testid="header-currency-field">BRL</h3>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  getEmail: PropTypes.isRequired,
  getExpenses: PropTypes.shape({
    reduce: PropTypes.func,
  }),
};

Header.defaultProps = {
  getExpenses: null,
};

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  getCurrency: state.wallet.currencies,
  getExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);

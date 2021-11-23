/* eslint-disable max-lines-per-function */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setExpense, getAPICurrencies } from '../actions/index';
import categories from '../helpers/categories';
import paymentMethods from '../helpers/paymentMethods';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formValue = this.formValue.bind(this);
    this.formCurrency = this.formCurrency.bind(this);
    this.formMethod = this.formMethod.bind(this);
    this.formTag = this.formTag.bind(this);
    this.formDescription = this.formDescription.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderMain = this.renderMain.bind(this);
  }

  componentDidMount() {
    const { fetchedCurrencies } = this.props;
    fetchedCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      userExpensesDispatch,
      fetchedCurrencies,
      getCurrency,
    } = this.props;
    fetchedCurrencies();
    userExpensesDispatch({
      ...this.state,
      exchangeRates: getCurrency,
    });
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  formValue() {
    const { value } = this.state;
    return (
      <input
        type="number"
        data-testid="value-input"
        name="value"
        placeholder="Valor"
        onChange={ this.handleChange }
        value={ value }
      />
    );
  }

  formCurrency() {
    const { currency } = this.state;
    const { getCurrency } = this.props;

    return (
      <select
        type="text"
        data-testid="currency-input"
        name="currency"
        onChange={ this.handleChange }
        value={ currency }
      >
        {
          Object.keys(getCurrency)
            .filter((key) => key !== 'USDT')
            .map((coin) => (
              <option key={ coin } data-testid={ coin }>{coin}</option>))
        }
      </select>
    );
  }

  formMethod() {
    const { method } = this.state;
    return (
      <select
        type="text"
        data-testid="method-input"
        name="method"
        onChange={ this.handleChange }
        value={ method }
      >
        {/* <option
          value=""
          disabled
          hidden
        >
          Selecione o Método de Pagamento
        </option> */}
        {
          paymentMethods.map((paymentMethod) => (
            <option key={ paymentMethod } value={ paymentMethod }>
              { paymentMethod }
            </option>))
        }
      </select>
    );
  }

  formTag() {
    const { tag } = this.state;
    return (
      <select
        type="text"
        data-testid="tag-input"
        name="tag"
        onChange={ this.handleChange }
        value={ tag }
      >
        {
          categories.map((category) => (
            <option key={ category } value={ category }>
              { category }
            </option>))
        }
      </select>
    );
  }

  formDescription() {
    const { description } = this.state;
    return (
      <input
        type="text"
        data-testid="description-input"
        name="description"
        placeholder="Descrição"
        onChange={ this.handleChange }
        value={ description }
      />
    );
  }

  renderHeader() {
    const { getEmail, getExpenses } = this.props;
    const totalExpenses = getExpenses.reduce((accumulator, current) => (
      accumulator + (current.value * current.exchangeRates[current.currency].ask)
    ), 0);

    return (
      <header className="wallet-header">
        <h1>Trybe</h1>
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

  renderMain() {
    return (
      <main>
        <form id="expense-form" onSubmit={ this.handleSubmit }>
          { this.formValue() }
          { this.formCurrency() }
          { this.formMethod() }
          { this.formTag() }
          { this.formDescription() }
          <button type="submit">Adicionar Despesa</button>
        </form>
      </main>
    );
  }

  render() {
    return (
      <div>
        { this.renderHeader() }
        { this.renderMain() }
      </div>
    );
  }
}

Wallet.propTypes = {
  fetchedCurrencies: PropTypes.func.isRequired,
  getCurrency: PropTypes.isRequired,
  getEmail: PropTypes.isRequired,
  getExpenses: PropTypes.shape({
    reduce: PropTypes.func,
  }).isRequired,
  userExpensesDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  getCurrency: state.wallet.currencies,
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchedCurrencies: () => dispatch(getAPICurrencies()),
  userExpensesDispatch: (myState) => dispatch(setExpense(myState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

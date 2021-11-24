import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setExpense, getAPICurrencies } from '../actions/index';
import categories from '../helpers/categories';
import paymentMethods from '../helpers/paymentMethods';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formValue = this.formValue.bind(this);
    this.formCurrency = this.formCurrency.bind(this);
    this.formMethod = this.formMethod.bind(this);
    this.formTag = this.formTag.bind(this);
    this.formDescription = this.formDescription.bind(this);
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
      currency: '',
      method: '',
      tag: '',
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
      <label htmlFor="moeda">
        <div className="moeda">Moeda</div>
        <select
          id="moeda"
          type="text"
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
        >
          <option value="" disabled hidden>Moeda</option>
          {
            Object.keys(getCurrency)
              .filter((key) => key !== 'USDT')
              .map((coin) => (
                <option
                  value={ coin }
                  key={ coin }
                  data-testid={ coin }
                >
                  {coin}
                </option>))
          }
        </select>
      </label>
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
        <option value="" disabled hidden>
          Selecione o Método de Pagamento
        </option>
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

  render() {
    return (
      <form id="expense-form" onSubmit={ this.handleSubmit }>
        { this.formValue() }
        { this.formCurrency() }
        { this.formMethod() }
        { this.formTag() }
        { this.formDescription() }
        <button type="submit">Adicionar Despesa</button>
      </form>
    );
  }
}

Form.propTypes = {
  fetchedCurrencies: PropTypes.func.isRequired,
  getCurrency: PropTypes.isRequired,
  userExpensesDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getCurrency: state.wallet.currencies,
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchedCurrencies: () => dispatch(getAPICurrencies()),
  userExpensesDispatch: (myState) => dispatch(setExpense(myState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

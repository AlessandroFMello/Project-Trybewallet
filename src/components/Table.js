import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  constructor() {
    super();

    this.renderTable = this.renderTable.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderBody = this.renderBody.bind(this);
  }

  renderHeader() {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }

  renderBody() {
    const { expenses } = this.props;
    return (
      <tbody>
        {
          expenses.map(({
            id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates,
          }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name.split('/Real Brasileiro').join('')}</td>
              <td>{Math.round((exchangeRates[currency].ask) * 100) / 100}</td>
              <td>{Math.round((exchangeRates[currency].ask * value) * 100) / 100}</td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    );
  }

  renderTable() {
    return (
      <table>
        { this.renderHeader() }
        { this.renderBody() }
      </table>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="expenses-div">
        { expenses.length > 0 ? this.renderTable() : null }
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Table);

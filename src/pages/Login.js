import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.activateSUbmitButton = this.activateSUbmitButton.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkIfAllFulfilled = this.checkIfAllFulfilled.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.activateSUbmitButton); // Cuidar assincronicidade
  }

  onSubmitClick(event) {
    event.preventDefault();
    const { history, userEmailDispatch } = this.props;
    userEmailDispatch(this.state);
    history.push('/carteira');
  }

  activateSUbmitButton() {
    // Verificar senha
    // Verificar email
    // Verificar se está tudo preenchido
    if (this.checkEmail() && this.checkPassword() && this.checkIfAllFulfilled()) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  checkEmail() {
    const { email } = this.state;
    // Dica do Denis Johnatan de utilizar verificação por regex
    const emailFormatRegex = /\S+@\S+\.\S+/;
    const verifyIfIsValid = emailFormatRegex.test(email);
    if (verifyIfIsValid) {
      return true;
    }
    return false;
  }

  checkPassword() {
    const { password } = this.state;
    const minValue = 6;
    const checkMinPasswordSize = password.length >= minValue;
    return checkMinPasswordSize;
  }

  checkIfAllFulfilled() {
    const { email, password } = this.state;

    if (email && password) {
      return true;
    } return false;
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form className="login-form" onSubmit={ this.onSubmitClick }>
        <input
          className="login-form-input"
          data-testid="email-input"
          name="email"
          onChange={ this.onInputChange }
          placeholder="Email"
          type="email"
          value={ email }
        />
        <input
          className="login-form-input"
          data-testid="password-input"
          minLength="6"
          name="password"
          onChange={ this.onInputChange }
          placeholder="Senha"
          type="password"
          value={ password }
        />
        <button
          className="login-form-button"
          disabled={ isDisabled }
          type="submit"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  userEmailDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEmailDispatch: ({ email }) => dispatch(setUser({ email })),
});

export default connect(null, mapDispatchToProps)(Login);

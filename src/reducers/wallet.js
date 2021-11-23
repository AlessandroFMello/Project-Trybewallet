// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_EXPENSE, SET_CURRENCY } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload,
        },
      ],
    };
  case SET_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;

// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_USER } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default user;

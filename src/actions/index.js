import fetchAPI from '../helpers/fetchAPI';

// Coloque aqui suas actions
export const SET_USER = 'SET_USER';
export const SET_EXPENSE = 'SET_EXPENSE';
export const SET_CURRENCY = 'SET_CURRENCY';

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setExpense = (payload) => ({
  type: SET_EXPENSE,
  payload,
});

export const setCurrency = (payload) => ({
  type: SET_CURRENCY,
  payload,
});

export function getAPICurrencies() {
  return async (dispatch) => {
    try {
      const fetchedCurrencies = await fetchAPI();

      dispatch(setCurrency(fetchedCurrencies));
    } catch (error) {
      console.error(error);
    }
  };
}

const fetchAPI = async () => {
  const API_URL = 'https://economia.awesomeapi.com.br/json/all';
  const data = await fetch(API_URL);
  const response = await data.json();
  return response;
};
export default fetchAPI;

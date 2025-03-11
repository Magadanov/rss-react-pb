export const apiService = {
  url: 'https://restcountries.com/v3.1/all',
  getCountryData: async function () {
    return await fetch(this.url);
  },
};

export default class Dollar {
  static getMoney() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
      .then(function (response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function (response) {
        if (response) {
          document.getElementById('result').textContent = `Error fetching conversion rates. Please try again later.`;
        }
      });
  }
}

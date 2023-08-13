import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Dollar from './money';

//Business Logic

/**
 *
 * @param {number} amount; 
 * @param {string} fromCurrency;
 * @param {string} toCurrency; 
 * @param {object} data;
 *
 * @returns {number};
 */

let jsonData;

function convertCurrency(amount, fromCurrency, toCurrency, data) {
  if (!data.conversion_rates[fromCurrency] || !data.conversion_rates[toCurrency]) {
    throw new Error('Invalid currency code provided.');
  }
  const amountInBaseCurrency = amount / data.conversion_rates[fromCurrency];
  const convertedAmount = amountInBaseCurrency * data.conversion_rates[toCurrency];
  return convertedAmount;
}

function initialize() {
  Dollar.getMoney()
    .then(data => {
      jsonData = data;
      document.getElementById('loading').style.display = 'none';
      populateDropdowns();
    });
}

function populateDropdowns() {
  const fromCurrencyDropdown = document.getElementById('fromCurrency');
  const toCurrencyDropdown = document.getElementById('toCurrency');

  for (const currency in jsonData.conversion_rates) {
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;

    fromCurrencyDropdown.appendChild(option.cloneNode(true));
    toCurrencyDropdown.appendChild(option);
  }
}

//UI Logic 

window.handleConversion = handleConversion;

function handleConversion(e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  try {
    const result = convertCurrency(amount, fromCurrency, toCurrency, jsonData);
    document.getElementById('result').textContent = `Converted amount: ${result.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    document.getElementById('result').textContent = 'Error converting currency. Please check your input.';
  }
}

window.addEventListener("load", function () {
  initialize();
  document.querySelector('form').addEventListener("submit", handleConversion);
});





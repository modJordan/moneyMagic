import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Dollar from './money';

//Business Logic

function getMoney(amount) {
  Dollar.getMoney(amount)
    .then(function (response) {
      if (response.result === success) {
        printNewMoney(response);
      } else {
        printError(response);
      }
    });
}


//UI Logic 


function printNewMoney(response) {
  const newMoney = document.querySelector("#result");
  response.conversion_rates.forEach(response => {
    newMoney.innerHTML = `${response.conversion_rates[0]}`;
  });


}

function printError(error) {
  document.getElementById("result").innerText = `There was an error accessing the currency value: ${error}.`;
}

function handleForm(event) {
  event.preventDefault();
  const input = document.getElementById("input").value;
  document.getElementById("input").value = null;
  getMoney(input);
  //printBike(response);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleForm);
});





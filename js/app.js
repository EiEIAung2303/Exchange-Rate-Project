const amountE1 = document.getElementById('amount');
//two select boxes
const currentEl_one = document.getElementById('c_one');
const currentEl_two = document.getElementById('c_two');
//Swamp Button
const swapEl = document.getElementById('swap');
//change values for currencies
const transfer_fromEl = document.getElementById('transfer_from');
const transfer_toEl = document.getElementById('transfer_to');

function calculateRate() {
    //to get data from select boxes eg USD, JPY
    let currency_one = currentEl_one.value;
    let currency_two = currentEl_two.value;
    //to get amount from input box
    let amount = amountE1.value;
    //API call
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then(data => {
        //get rate
        let rate = data.rates[currency_two];
        //trasfer
        let result_from = `${currency_one} - ${amount}`;
        let result_to = `${currency_two} - ${(rate * amount).toFixed(3)}`;

        //replace '-' to ''
        let newFirstString = result_from.replace(/-/, '');
        let newSecondString = result_to.replace(/-/, '');

        //to display document
       transfer_fromEl.innerHTML = newFirstString;
       transfer_toEl.innerHTML = newSecondString;
    })
}

calculateRate();
//event is change
currentEl_one.addEventListener('change', calculateRate);
currentEl_two.addEventListener('change', calculateRate);
amountE1.addEventListener('input', calculateRate);

//Swap Currency 
swapEl.addEventListener('click', () => {
    let tmp = currentEl_one.value;
    currentEl_one.value = currentEl_two.value;
    currentEl_two.value = tmp;
    calculateRate();
})






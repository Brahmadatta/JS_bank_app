"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Brahma Datta",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movementsval = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const formatTheDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(((date2 - date1) / 1000) * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed < 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  //sort the data
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    console.log(acc);
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatTheDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    new Intl.NumberFormat(acc.locale, {
      style: "currency",
      currency: "USD",
    }).format(mov);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//calculating balance
//using reduce method which adds the values to single value

// const balance = movementsval.reduce(function (acc, curr, i, arr) {
//   return acc + curr;
// }, 0);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);
  //Display balance
  calDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};

//Logout Timer functionality
const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);

    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    //In each call, print the remaining time to UI
    labelTimer.textContent = `${min} : ${sec}`;

    //when 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Login to get started";
      containerApp.style.opacity = 0;
    }

    //decrease 1s
    time--;
  };
  //set time to 5 minutes
  let time = 120;
  //call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//or using arrow
const calDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  //const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  //labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};
//labelBalance.textContent = balance +'€';

//console.log(containerMovements.innerHTML);

//displaying the current maximum value
const max = movementsval.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movementsval[0]);
console.log(`maximum value is ${max}`);

//Display the calculated summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

let currentAccount, timer;

//Event Handler

// //Fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//day/month.year
//Experminenting API

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    containerApp.style.opacity = 100;

    //create current date and time

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric", //'2-digit'
      year: "numeric",
      //weekday: 'long',
    };

    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //TO hide the focus use blue
    inputLoginPin.blur();

    //if there is already timer clear it
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    //Update UI
    updateUI(currentAccount);
  }
});

//Transfer feature
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recevierAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  //clear the fields
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    recevierAcc &&
    currentAccount.balance > amount &&
    recevierAcc?.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    recevierAcc.movements.push(amount);

    //Add the transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    recevierAcc.movementsDates.push(new Date().toISOString());

    //Update UI
    updateUI(currentAccount);

    //reset the timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});
//console.log(accounts);

//Request loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      //push the amount into the array
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //Update UI
      updateUI(currentAccount);

      //reset the timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});

//close the account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username == currentAccount.username
    );

    //indexOf(23)
    //Delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }

  //clear the fields
  inputCloseUsername.value = inputClosePin.value = "";
  console.log(accounts);
});

//sort the data on click of button
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// //Find method
// //gets the first index of the condition if its true

// const firstWithdrawal = movementsval.find(mov => mov < 0);
// console.log(movementsval);
// console.log(firstWithdrawal);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// for (const [i, acc] of accounts.entries()) {
//   if (acc.owner === 'Jessica Davis') {
//     console.log(acc);
//   }
// }

//Some Method
console.log(movementsval);

//EQUALITY
console.log(movementsval.includes(-130));

//CONDITION
console.log(movementsval.some((mov) => mov === -130));

const anyDeposits = movementsval.some((mov) => mov > 1500);
console.log(anyDeposits);

//EVERY
//if every element passes the condition then only it returns true

console.log(movementsval.every((mov) => mov > 0));

console.log(account1.movements.every((mov) => mov > 0));

//separate callback
const deposit = (mov) => mov > 0;
console.log(movementsval.some(deposit));
console.log(movementsval.every(deposit));
console.log(movementsval.filter(deposit));

//FLAT method
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //1st level flat

const arrDeep = [[1, [2, 3]], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); //2nd level flat

const accountMovements = accounts.map((acc) => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const addAllMovements = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(addAllMovements);

//using the chaining from above
const overAllBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overAllBalance);

//flatmap (flat + map)
const overAllBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overAllBalance2);

//SORT method
//Strings
const names = ["Datta", "Brahma", "Rahul", "Zaid", "Pranay"];
console.log(names.sort()); //it mutates the original array

//Numbers
console.log(movementsval);
console.log(movementsval.sort()); //not as expected

//return < 0 , A, B (keep values)
//return > 0 , B ,A (switch values)

//Ascending
// movementsval.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
//OR

movementsval.sort((a, b) => a - b);
console.log(movementsval);

//Descending
// movementsval.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

movementsval.sort((a, b) => b - a);
console.log(movementsval);

//Fill method
const arr3 = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//empty arrays + fill method
const x = new Array(7);
console.log(x);

x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr3.fill(23, 2, 6); // add 23 from 2nd to till 6th position
console.log(arr3);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelector(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll(".movements__value")];
  console.log(movementsUI2);
});

// const bankDepositSum = accounts.map(acc => acc.movements);
// console.log(...bankDepositSum);
// const fullarray = bankDepositSum.flat();

//or

const bankDepositSum1 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositSum1);

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

const numDeposits1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

//Prefixed  ++ operator
let a = 10;
console.log(++a); //if we use a++ the value will be still 10 only hence ++a
console.log(a);

//Getting all deposits and withdrawals
const { deposits, withdrawals } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sum, cur) => {
      //cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);
      sum[cur > 0 ? "deposits" : "withdrawals"] += cur;
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

//4.
//this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const exceptions = ["a", "an", "the", "but", "or", "on", "in", "with"];

  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");
  //.reduce((acc, word) => acc + ' ' + word, '');
  return capitalize(titleCase);
  console.log(titleCase);
};

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is the another title with an EXAMPLE"));

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

//1.
const recommendedFood = 0.75 * 28;
dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

//2.
const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(sarahDog);
console.log(
  `Sarah's dog is eating too ${
    sarahDog.curFood > sarahDog.recFood ? "much" : "little"
  }`
);

//3.
const ownersEatTooMuch = dogs
  .filter((dog, i) => dog.curFood > dog.recFood)
  .map((dog) => dog.owners)
  .flat();
console.log(ownersEatTooMuch);

//3.
const ownersEatTooLittle = dogs
  .filter((dog, i) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners);
//.flat();
console.log(ownersEatTooLittle);

//4. "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!
console.log(`${ownersEatTooMuch.join(" and ")} dogs eat too much!`);

console.log(`${ownersEatTooLittle.join(" and ")} dogs eat too little!`);

//5.
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

//6.

const dogEatingOkay = (dog) =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(dogEatingOkay));

//7.
console.log(dogs.filter(dogEatingOkay));

//8.Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
//   array's objects �
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);

//Conversion
console.log(Number(23));
console.log(Number(+"23"));

//parsing
console.log(Number.parseInt(" 2.5rem "));
console.log(Number.parseFloat("2.5rem"));

//check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20"));
console.log(Number.isNaN(2 / 0));

//check if value is Number
console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(+"20"));
console.log(Number.isFinite(2 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(2 / 0));

//Math rounding
console.log(Math.sqrt(169));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(1, 23, 45, 2, 3));
console.log(Math.max(1, 2, "23", 22, 20));
console.log(Math.max(1, 2, "23px", 3, 8));

console.log(Math.min(1, 22, 3, 55, 6, 0, -4));
console.log(Math.PI * Number.parseFloat("10px") ** 2);

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

//Rounding integers
console.log(Math.trunc(23.3));
console.log(Math.round(23.9));

//ceil
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor(23.9));
console.log(Math.floor("23.9"));

//negative numbers
console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.9));

//Rounding decimals
console.log((2.7).toFixed(0));
console.log((2.3).toFixed(0));
console.log((2.345).toFixed(2));
console.log((2.367).toFixed(1));
console.log(Math.trunc(23.8));

console.log(+(2.345).toFixed(2));

//remainder
console.log(5 % 2);

console.log(5 / 2); // 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3);

const isEven = (num) => num % 2 === 0;
console.log(isEven(20));
console.log(isEven(21));

//operations
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);

console.log(10000n + 10000n);
const huge = 683787387398498924898928n;
const num = 23;
//console.log(huge * num); //script.js:635 Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions

console.log(huge * BigInt(num));

//Create a Date
// const date = new Date();
// console.log(date);
// console.log(new Date('Dec 17 2023 16:55:44'));

// console.log(new Date('Dec 17 , 2023'));

// console.log(new Date(account21.movementsDates[0]));
// console.log(new Date(2024, 9, 4, 3, 2, 10));

//working with dates
const future = new Date(2045, 10, 24, 30);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDay());
console.log(future.getDate());

console.log(future.toISOString());
future.setFullYear(2040);
console.log(future);

//calculate days passed
const futureDate = new Date(2037, 3, 14, 15, 24);
console.log(futureDate);

const constDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = constDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);

//NumberFormat

const num1 = 3788787.43;

const options = {
  style: "unit", // or percentage //
  unit: "celsius", //or mile-per-hour
};
console.log("US: ", new Intl.NumberFormat("en-Us", options).format(num1));
console.log("Germany ", new Intl.NumberFormat("de-DE").format(num1));
console.log("India ", new Intl.NumberFormat("hi-IN").format(num1));
console.log("Browser ", new Intl.NumberFormat(navigator.language).format(num1));

//timeout
// setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   'olives',
//   'spinach',
//   'test'
// );
// console.log('waiting...');

const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log("waiting...");
//cancel timer
if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);

//set interval
// setInterval(function () {
//   console.log(new Date());
// }, 1000);

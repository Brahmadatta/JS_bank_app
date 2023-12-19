'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const checkDogs = function (dogsJuila, dogsKate) {
  //1.
  const dogsJuliaCorrected = dogsJuila.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  console.log(dogsJuliaCorrected);

  //2.
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  //3.
  dogs.forEach(function (dog, i) {
    const dogAge =
      dog >= 3
        ? `Dog number ${i + 1} is an adult, and is ${dog} years old`
        : `Dog number ${i + 1} is still a puppy 🐶`;
    console.log(dogAge);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

const eurToUsd = 1.1;

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
const movement = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementsUSD = movement.map(mov => mov * eurToUsd);

console.log(movement);

console.log(movementsUSD);

const movementsDesc = movement.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1} : You deposited ${mov}`;
  } else {
    return `Movement ${i + 1} : You withdrew ${Math.abs(mov)}`;
  }
});

console.log(movementsDesc);

const user = 'Steven Thomas Williams';
const username = user
  .toLowerCase()
  .split(' ')
  //   .map(function (name) {
  //     return name[0];
  //   })
  .map(name => name[0])
  .join('');
console.log(username);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

//Filter

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);

const withdrawll = movements.filter(mov => mov < 0);
console.log(withdrawll);

//Reduce method
//Accumulator -> adds all the values into a single value
//acc -> Accumulator
const balance = movements.reduce(function (acc, curr, i, arr) {
  console.log(`Iteration ${i} : ${acc} `);
  return acc + curr;
}, 0); //starting with value 0
console.log(balance);

//or using arrow function

const balance3 = movements.reduce((acc, curr, i, arr) => acc + curr, 0);
console.log('balance ' + balance3);

//using for of loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age > 2 ? 16 + age * 4 : 2 * age));
  console.log(humanAges);
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);

  //   const avg = adults.reduce((acc, age) => acc + age, 0) / adults.length; //or

  const avg = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return avg;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

const eurToUsds = 1.1;
const res = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsds)
  .reduce((acc, mov) => acc + mov, 0);
console.log(res);

const calcAverageHumanAge1 = ages =>
  ages
    .map(age => (age > 2 ? 16 + age * 4 : 2 * age))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
const avg3 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg4 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg3, avg4);

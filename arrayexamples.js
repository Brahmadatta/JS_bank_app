'use strict'

// let aar = ['a', 'b', 'c', 'd', 'e'];

// //SLICE
// //aar.slice(2);
// console.log(aar.slice(2));
// console.log(aar.slice(-2)); //['d','e']
// console.log(aar.slice(1, -2)); //[b,c]
// console.log(aar.slice(1, -3)); //b[]
// console.log(aar.slice(-1));
// console.log(aar.slice(1, 3));

// console.log('------SPLICE--------');

// //SPLICE
// //It mutates the array by extracting the data
// //console.log(aar.splice(2)); //removes ['c','d','e']
// console.log(aar); //['a','b']
// aar.splice(-1);
// console.log(aar);
// aar.splice(1, 3); //3 is num of elements
// console.log(aar);

// //REVERSE //mutates the original array
// aar = ['a', 'b', 'c', 'd', 'e'];
// const aar2 = ['j', 'i', 'h', 'e', 'f'];
// console.log(aar2.reverse()); //['f', 'e', 'h', 'i', 'j']
// console.log(aar2); //['f', 'e', 'h', 'i', 'j']

// //CONCAT //adds two arrays
// const letters = aar.concat(aar2)
// console.log(letters); //OR
// console.log([...aar,...aar2]);

// //JOIN
// console.log(letters.join(' - '));

// console.log('---------At------------');
// //Using At in arrays
// const arr = [23,11,64]
// console.log(arr[0]);

// //getting last element in array
// console.log(arr.slice(-1)[0]);
// console.log(arr[arr.length - 1]);
// console.log(arr.at(-1));

// console.log('datta'.at(0));
// console.log('datta'.at(-1));

// // console.log(aar);
// // for(const [i,n] of aar.entries()){
// //   console.log(`${i} : ${n}`);
// // }

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for(const movement of movements){
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} : You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} : You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---------FOR EACH-----------');

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1} : You Deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1} : You withdrew ${Math.abs(mov)}`);
  }
});

//Maps

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (currency, index, array) {
  console.log(`${index} : ${currency}`);
});

//Sets
const currenciesUnique = new Set(['USD', 'GBP', 'RUPEE', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (currency, index, array) {
  console.log(`${index} : ${currency}`);
});

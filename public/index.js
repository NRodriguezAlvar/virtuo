'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 200,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

// Step 1 - Euro-Kilometers
function getPrice(id2) {
  var test = (cars).find(element => element.id==id2);
  return [test.pricePerDay,test.pricePerKm]
}

function dayDiff(d1, d2)
{
  d1 = d1.getTime() / 86400000;
  d2 = d2.getTime() / 86400000;
  return new Number(d2 - d1).toFixed(0);
}

rentals.forEach(element => {
  let returnDate = new Date(element.returnDate);
  let pickup  = new Date(element.pickupDate)
  let duree = parseInt(dayDiff(pickup,returnDate)) + 1;
  
 element.price = duree * getPrice(element.carId)[0] + element.distance * getPrice(element.carId)[1];
});

//Step 2 - Drive more, pay less
rentals.forEach(element => {
  let returnDate = new Date(element.returnDate);
  let pickup  = new Date(element.pickupDate);
  let duree = parseInt(dayDiff(pickup,returnDate)) + 1;
  if(duree > 1 && duree <= 4)
    element.price = element.price * 0.9
  else if(duree > 4 && duree <= 10)
    element.price =  element.price * 0.7
  else if(duree > 10)
    element.price = element.price * 0.5

});

//Step 3 - Give me all your money
rentals.forEach(element => {
  let returnDate = new Date(element.returnDate);
  let pickup  = new Date(element.pickupDate);
  let duree = parseInt(dayDiff(pickup,returnDate)) + 1;
  let commission = 0.3 * element.price;
  element.insurance = commission / 2;
  element.treasury = duree;
  element.virtuo = commission - parseFloat(element.insurance) - element.treasury;
});

//Step 4 - The famous deductible
rentals.forEach(element => {
  let returnDate = new Date(element.returnDate);
  let pickup  = new Date(element.pickupDate);
  let duree = parseInt(dayDiff(pickup,returnDate)) + 1;
  if(element.options.deductibleReduction) 
  {
    element.price += duree*4;
    element.virtuo += duree*4;
  }
});

//Step 5 - Pay the actors
function getInfo(id2) {
  let test = (rentals).find(element => element.id==id2);
  return [test.price,test.insurance,test.treasury,test.virtuo]
}



actors.forEach(element => {
  element.payment.forEach(elementBis => {
    if(elementBis.who === 'driver')
      elementBis.amount = getInfo(element.rentalId)[0]
    else if(elementBis.who === 'partner')
      elementBis.amount = getInfo(element.rentalId)[1] * 2
    else if(elementBis.who === 'insurance')
      elementBis.amount = getInfo(element.rentalId)[1]
    else if(elementBis.who === 'treasury')
      elementBis.amount = getInfo(element.rentalId)[2]
    else if (elementBis.who === 'virtuo')
      elementBis.amount = getInfo(element.rentalId)[3]
  })
});

console.log(cars);
console.log(rentals);
console.log(actors);

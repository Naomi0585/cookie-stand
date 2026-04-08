'use strict';

console.log("JS connected");

// Store Hours

const hours = [
    '6am','7am','8am','9am','10am','11am',
    '12pm','1pm','2pm','3pm','4pm','5pm',
    '6pm','7pm'
];

  const tableElement = document.getElementById('sales-table');
  
  const state = {
    allCookieStands: [], 
  };

  // Constructor 

  function CookieStand(locationName, minCustomerPerHour, maxCustomersPerHour, avgCookiesPerSale) {
    this.locationName = locationName;
    this.minCustomerPerHour = minCustomerPerHour;
    this.maxCustomersPerHour = maxCustomersPerHour; 
    this.avgCookiesPerSale = avgCookiesPerSale;
    this.customersEachHour = [];
    this.cookiesEachHour = [];
    this.totalDailyCookies = 0; 


  }

  function random(min,max) {
    return Math.floor(Math.random() * (max - min +1)) + min;

  }

  CookieStand.prototype.calcCustomersEachHour = function() {
  this.customersEachHour = [];
  for (let i = 0; i < hours.length; i++) {
    this.customersEachHour.push(
      random(this.minCustomerPerHour, this.maxCustomersPerHour)
    );
  }
};

CookieStand.prototype.calcCookiesEachHour = function() {
  this.calcCustomersEachHour();
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;

  for (let i = 0; i < hours.length; i++) {
    const oneHour = Math.ceil(
      this.customersEachHour[i] * this.avgCookiesPerSale
    );
    this.cookiesEachHour.push(oneHour);
    this.totalDailyCookies += oneHour;
  }
};

CookieStand.prototype.render = function() {
  this.calcCookiesEachHour();

  const tableRow = document.createElement('tr');

  // location name
  tableRow.appendChild(makeCell('td', this.locationName));

  // hourly cookies
  for (let i = 0; i < hours.length; i++) {
    tableRow.appendChild(makeCell('td', this.cookiesEachHour[i]));
  }

  tableRow.appendChild(makeCell('th', this.totalDailyCookies));

  tableElement.appendChild(tableRow);
};

// Helper

function makeCell(tag, text) {
  let cell = document.createElement(tag);
  cell.textContent = text;
  return cell;
}

function makeHeaderRow() {
  const tableRow = document.createElement('tr');

  tableRow.appendChild(makeCell('th', 'Locations'));

  for (let i = 0; i < hours.length; i++) {
    tableRow.appendChild(makeCell('th', hours[i]));
  }

  tableRow.appendChild(makeCell('th', 'Location Totals'));

  tableElement.appendChild(tableRow);
}

// Footer 

function makeFooterRow() {

  
  let oldFooter = document.getElementById('footer');
  if (oldFooter) oldFooter.remove();

  const tableRow = document.createElement('tr');
  tableRow.id = 'footer';

  tableRow.appendChild(makeCell('th', 'Totals'));

  let grandTotal = 0;

  for (let i = 0; i < hours.length; i++) {
    let hourlyTotal = 0;

    for (let j = 0; j < state.allCookieStands.length; j++) {
      hourlyTotal += state.allCookieStands[j].cookiesEachHour[i];
    }

    grandTotal += hourlyTotal;
    tableRow.appendChild(makeCell('th', hourlyTotal));
  }

  tableRow.appendChild(makeCell('th', grandTotal));

  tableElement.appendChild(tableRow);
}

function renderTable() {
  makeHeaderRow();

  for (let i = 0; i < state.allCookieStands.length; i++) {
    state.allCookieStands[i].render();
  }

  makeFooterRow();
}

const form = document.getElementById('store-form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  let location = event.target.name.value;
  let min = parseInt(event.target.min.value);
  let max = parseInt(event.target.max.value);
  let avg = parseFloat(event.target.avg.value);

  let newStore = new CookieStand(location, min, max, avg);

  state.allCookieStands.push(newStore);

  newStore.render();
  makeFooterRow();

  event.target.reset();
}


let seattle = new CookieStand('Seattle', 23, 65, 6.3);
let tokyo = new CookieStand('Tokyo', 3, 24, 1.2);
let dubai = new CookieStand('Dubai', 11, 38, 3.7);
let paris = new CookieStand('Paris', 20, 38, 2.3);
let lima = new CookieStand('Lima', 2, 16, 4.6);

state.allCookieStands.push(seattle, tokyo, dubai, paris, lima);

renderTable();
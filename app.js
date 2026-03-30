console.log("JS connected");
'use strict';

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

  function CookieStand(locationName, minCustomerPerHour, maxCustomersPerHour, avgCookiesPerSale) {
    this.locationName = locationName;
    this.minCustomerPerHour = minCustomerPerHour;
    this.maxCustomersPerHour = maxCustomersPerHour; 
    this.avgCookiesPerSale = avgCookiesPerSale;
    this.customersEachHour = [];
    this.cookiesEachHour = [];
    this.totalDailyCookies = 0; 

  }

  CookieStand.prototype.calcCustomersEachHour = function() {
    this.customersEachHour = [];
    for (let i = 0; i < hours.length; i++) {
        this.customersEachHour.push(random(this.minCustomerPerHour, this.maxCustomersPerHour));

    }
  };

  CookieStand.prototype.calcCookiesEachHour = function() {
    this.calcCustomersEachHour();

    this.cookiesEachHour = [];
    this.totalDailyCookies = 0;

    for (let i = 0; i < hours.length; i++){
        const oneHour = Math.ceil(
         this.customersEachHour[i] * this.avgCookiesPerSale   
        );
    this.cookiesEachHour.push(oneHour);
    this.totalDailyCookies += oneHour;
   
    }
  }; 

  CookieStand.prototype.render = function() {
    this.calcCookiesEacHour();
    const tableRow = document.createElement('tr');
    let td = document.createElement('td');
    td.textContent = this.locationName;
    tableRow.appendChild(td);
     for (let i = 0; i < hours.length; i++) {
        let tableDataElement = document.createElement('td');
        tableDataElement.textContent = this.cookiesEachHour[i];
        tableRow.appendChild(tableDataElement);
     }
     const tableHeader = document.createElement('th');
     tableHeader.textContent = this.totalDailyCookies;
     tableRow.appendChild(tableHeader);
     tableElement.appendChild(tableRow);
    };

    let seattle = new CookieStand('Seattle', 23,65,6.3);
    let tokyo = new CookieStand('Tokyo', 3, 24, 1.2);
    let dubai = new CookieStand('Dubai', 11, 38, 3.7);
    let paris = new CookieStand('Paris', 20, 38, 2.3);
    let lima = new CookieStand('Lima', 2, 16, 4.6);
    state.allCookieStands.push(seattle, tokyo, dubai, paris, lima);

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    function makeHeaderRow() { 

        const tableRow = document.createElement('tr');
        let tableHeader = document.createElement('th');
        tableHeader.textContent = 'Locations';
        tableRow.appendChild(tableHeader); 
        for (let i = 0; i < hours.length; i++) {
            tableHeader = document.createElement('th');
            tableHeader.textContent = hours[i];
            tableRow.appendChild(tableHeader);
        }
        tableHeader = document.createElement('th');
        tableHeader.textContent = 'Location Totals';
        tableRow.appendChild(tableHeader);
        tableElement.appendChild(tableRow);
    }
function makeFooterRow() { 
    const tableRow = document.createElement('tr');
    let th = document.createElement('th');
   th.textContent = 'Hourly Totals for All Locations';
   tableRow.appendChild(th);

   let grandTotal = 0;

   for (let i = 0; i < hours.length; i++) {
    let hourlyTotal = 0; 

    for (let j = 0; j < state.allCookieStands.length; j++) {
        hourlyTotal += state.allCookieStands[j].calcCookiesEachHour[i];

    }
    grandTotal += hourlyTotal;

    let thHour = document.createElement('th');
    thHour.textContent = hourlyTotal;
    tableRow.appendChild(thHour);
   }
   let thTotal = document.createElement('th');
   thTotal.textContent = grandTotal;
   tableRow.appendChild(thTotal);

   tableElement.appendChild(tableRow);
    }

    function renderTable() {
        makeHeaderRow();
        for (let i = 0; i < state.allCookieStands.length; i++) {
            state.allCookieStands[i].render();
        }

        makeFooterRow();
    }

    renderTable();



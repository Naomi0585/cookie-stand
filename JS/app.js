console.log("JS connected");

'use strict';

// Store Hours
const hours = [
    '6am','7am','8am','9am','10am','11am',
    '12pm','1pm','2pm','3pm','4pm','5pm',
    '6pm','7pm'
];

// Seattle Store Object
const seattle = {
    name: 'Seattle',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookies: 6.3,
    cookiesPerHour: [],
    totalCookies: 0
};

seattle.randomCustomers = function() {
    return Math.floor(Math.random() *
    (this.maxCustomers - this.minCustomers + 1)
    + this.minCustomers);
};

seattle.calculateCookies = function() {

    for(let i = 0; i < hours.length; i++){

        let customers = this.randomCustomers();
let cookies = Math.floor(customers * this.avgCookies);

        this.cookiesPerHour.push(cookies);
his.totalCookies += cookies;
    }
},


seattle.render = function() {

    let container = document.getElementById('sales-data');

    let article = document.createElement('article');

    let h2 = document.createElement('h2');
    h2.textContent = this.name;
    article.appendChild(h2);

    let ul = document.createElement('ul');

    for(let i = 0; i < hours.length; i++){

        let li = document.createElement('li');

        li.textContent = `${hours[i]}: ${this.cookiesPerHour[i]} cookies`;

        ul.appendChild(li);
    }

    let total = document.createElement('li');
total.textContent = `Total: ${this.total} cookies`;

    ul.appendChild(total);

    article.appendChild(ul);

    container.appendChild(article);

};

//Tokyo Store Object
const tokyo = {
    name: 'Tokyo',
    minCustomers: 3,
    maxCustomers: 24,
    avgCookies: 1.2,
    cookiesPerHour: [],
    total: 0,

    randomCustomers: seattle.randomCustomers,
    calculateCookies: seattle.calculateCookies,
    render: seattle.render

};

//Dubai Store Object
const dubai = {
    name: 'Dubai',
    minCustomers: 11,
    maxCustomers: 38,
    avgCookies: 3.7,
    cookiesPerHour: [],
    total: 0,

    randomCustomers: seattle.randomCustomers,
    calculateCookies: seattle.calculateCookies,
    render: seattle.render

};

//Paris Store Object 
const paris = {
    name: 'Paris',
    minCustomers: 20,
    maxCustomers: 38,
    avgCookies: 2.3,
    cookiesPerHour: [],
    total: 0,

    randomCustomers: seattle.randomCustomers,
    calculateCookies: seattle.calculateCookies,
    render: seattle.render

};

//Lima Store Object 
const lima = {
    name: 'Lima',
    minCustomers: 2,
    maxCustomers: 16,
    avgCookies: 4.6,
    cookiesPerHour: [],
    total: 0,

      randomCustomers: seattle.randomCustomers,
    calculateCookies: seattle.calculateCookies,
    render: seattle.render
};

seattle.calculateCookies();
seattle.render();

tokyo.calculateCookies();
tokyo.render();

dubai.calculateCookies();
dubai.render();

paris.calculateCookies();
paris.render();

lima.calculateCookies();
lima.render();


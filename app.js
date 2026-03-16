console.log("JS connected");
'use strict';

// Store Hours
const hours = [
    '6am','7am','8am','9am','10am','11am',
    '12pm','1pm','2pm','3pm','4pm','5pm',
    '6pm','7pm'
];

const container = document.getElementById('sales-data');

function randomCustomers(minCustomers,maxCustomers){
    return Math.floor(Math.random()*(maxCustomers-minCustomers+1)+minCustomers);
}


// Seattle Store Object
const seattle = {
    name: 'Seattle',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookies: 6.3,
    Sales: [],
    totalCookies: 0,

    calculateCookies:function(){
        for(let i=0;i<hours.length;i++){
            let customers=randomCustomers(this.minCustomers,this.maxCustomers);
            let cookies=Math.floor(customers*this.avgCookies);
            this.Sales.push(cookies);
            this.totalCookies+=cookies;
        }
    },

    render:function(){

        let article=document.createElement('article');
        let h2=document.createElement('h2');

        h2.textContent=this.name;

        article.appendChild(h2);

        let ul=document.createElement('ul');

        for(let i=0;i<hours.length;i++){

            let li=document.createElement('li');
            li.textContent=`${hours[i]}: ${this.Sales[i]} cookies`;
            
            ul.appendChild(li);

        }

        let totalCookies=document.createElement('li');
        totalCookies.textContent=`Total: ${this.totalCookies} cookies`;

        ul.appendChild(totalCookies);

        article.appendChild(ul);

        container.appendChild(article);
    }
};

const tokyo={name:'Tokyo',minCustomers:3,maxCustomers:24,avgCookies:1.2,Sales:[],totalCookies:0,calculateCookies:seattle.calculateCookies,render:seattle.render};
const dubai={name:'Dubai',minCustomers:11,maxCustomers:38,avgCookies:3.7,Sales:[],totalCookies:0,calculateCookies:seattle.calculateCookies,render:seattle.render};
const paris={name:'Paris',minCustomers:20,maxCustomers:38,avgCookies:2.3,Sales:[],totalCookies:0,calculateCookies:seattle.calculateCookies,render:seattle.render};
const lima={name:'Lima',minCustomers:2,maxCustomers:16,avgCookies:4.6,Sales:[],totalCookies:0,calculateCookies:seattle.calculateCookies,render:seattle.render};


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



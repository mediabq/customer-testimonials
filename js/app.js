//get elements
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const customerWrap = document.querySelector('.customer-wrap');
let counter = 1;

let customers = [];

ui = new UI();

//Get the customers from the JSON file
function getClients() {
  return new Promise((resolve, reject) => {
    fetch('testimonials.json')
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

//Pass the clients to the UI builder
getClients().then(data => {
  customers = Object.values(data);
  customers.push(customers[0]);
  customers.unshift(customers[customers.length - 2]);
  ui.buildUI(customers);
  makeNavigation(customers);
});

size = customerWrap.clientWidth;
customerWrap.style.transform = 'translateX(' + -size * counter + 'px)';

//Button Listners

function makeNavigation(customers) {
  arrowRight.addEventListener('click', () => {
    if (counter >= customers.length - 1) {
      return;
    } else {
      customerWrap.style.transition = 'transform 0.4s ease-in-out';
      counter++;
      customerWrap.style.transform = 'translateX(' + -size * counter + 'px)';
    }
  });

  arrowLeft.addEventListener('click', () => {
    if (counter <= 0) {
      return;
    } else {
      customerWrap.style.transition = 'transform 0.4s ease-in-out';
      counter--;
      customerWrap.style.transform = 'translateX(' + -size * counter + 'px)';
    }
  });

  customerWrap.addEventListener('transitionend', () => {
    const allCustomers = document.querySelectorAll('.customer');
    allCustomers[0].id = 'last-clone';
    allCustomers[allCustomers.length - 1].id = 'first-clone';

    if (allCustomers[counter].id === 'last-clone') {
      customerWrap.style.transition = 'none';
      counter = allCustomers.length - 2;
      customerWrap.style.transform = 'translateX(' + -size * counter + 'px)';
    }

    if (allCustomers[counter].id === 'first-clone') {
      customerWrap.style.transition = 'none';
      counter = allCustomers.length - counter;
      customerWrap.style.transform = 'translateX(' + -size * counter + 'px)';
    }
  });
}

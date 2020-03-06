class UI {
  buildUI(customers) {
    for (const customer of customers) {
      const customerDiv = document.createElement('div');
      customerDiv.className = 'customer';

      customerDiv.innerHTML = `
        <div class="customer-img">
            <img src="./img/${customer.image}.jpg" alt="Client" id="client-img" />
        </div>
        <h3>${customer.name}</h3>
        <div class="quote">${customer.message}</div>
        <div class="quotesign"><i class="fas fa-quote-right"></i></div>
      `;

      const customerWrap = document.querySelector('.customer-wrap');

      customerWrap.appendChild(customerDiv);
    }
  }
}

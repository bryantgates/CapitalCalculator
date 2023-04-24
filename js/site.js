function getInputs() {
  let loan = document.getElementById("loan").value;
  let term = document.getElementById("term").value;
  let rate = document.getElementById("rate").value;

  let loanAmount = parseFloat(loan);
  let termAmount = parseFloat(term);
  let rateAmount = parseFloat(rate);

  let inputs = {
    loanAmount: loanAmount,
    termAmount: termAmount,
    rateAmount: rateAmount,
  };

  calculateInputs(inputs);
}

function calculateInputs(inputs) {
  let paymentArray = [];
  let totalArray = [];

  let loanAmount = inputs.loanAmount;
  let termAmount = inputs.termAmount;
  let rateAmount = inputs.rateAmount;

  //month 1 is loan amount w/out interest. month two - what went to principle
  let totalMonthlyPayment =
    (loanAmount * (rateAmount / 1200)) /
    (1 - (1 + rateAmount / 1200) ** -termAmount);
  let remainingBalance = loanAmount;
  let totalInterest = 0;
  let totalPrincipal = 0;
  let totalCost = 0;

  for (let i = 1; i <= termAmount; i++) {
    let interestPayment = remainingBalance * (rateAmount / 1200);
    let principalPayment = totalMonthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
    totalInterest += interestPayment;
    totalPrincipal += principalPayment;
    totalCost = totalInterest + totalPrincipal;

    let paymentValues = {
      month: i,
      payment: "$" + totalMonthlyPayment.toFixed(2),
      principal: "$" + principalPayment.toFixed(2),
      interest: "$" + interestPayment.toFixed(2),
      totalInterest: "$" + totalInterest.toFixed(2),
      balance: "$" + remainingBalance.toFixed(2),
    };
    let totalValues = {
      payment: "$" + totalMonthlyPayment.toFixed(2),
      totalPrincipal: "$" + totalPrincipal.toFixed(2),
      totalInterest: "$" + totalInterest.toFixed(2),
      totalCost: "$" + totalCost.toFixed(2),
    };
    paymentArray.push(paymentValues);
    totalArray.push(totalValues);
  }
  displayPaymentsTable(paymentArray);
  displayTotals(totalArray);
}

function displayPaymentsTable(paymentArray) {
  const eventTable = document.getElementById("paymentTable");
  const template = document.getElementById("tableRowTemplate");

  paymentTable.innerHTML = "";

  for (let i = 0; i < paymentArray.length; i++) {
    let array = paymentArray[i];

    let tableRow = document.importNode(template.content, true);

    tableRow.querySelector('[data-id="month"]').textContent = array.month;
    tableRow.querySelector('[data-id="payment"]').textContent = array.payment;
    tableRow.querySelector('[data-id="principal"]').textContent =
      array.principal;
    tableRow.querySelector('[data-id="interest"]').textContent = array.interest;
    tableRow.querySelector('[data-id="totalInterest"]').textContent =
      array.totalInterest;
    tableRow.querySelector('[data-id="balance"]').textContent = array.balance;

    tableRow.querySelector("tr").setAttribute("data-array", array.id);

    paymentTable.appendChild(tableRow);
  }
}

function displayTotals(totalArray) {
  let array = totalArray[totalArray.length - 1];

  document.getElementById("monthlyPayment").textContent = array.payment;
  document.getElementById("totalPrincipal").textContent = array.totalPrincipal;
  document.getElementById("totalInterest").textContent = array.totalInterest;
  document.getElementById("totalCost").textContent = array.totalCost;
}
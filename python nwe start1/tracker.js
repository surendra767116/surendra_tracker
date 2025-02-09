// Variables to hold the data
let totalIncome = 0;
let totalExpense =0;
let balance = totalIncome - totalExpense;

// Update the card values
function updateCards() {
  document.getElementById("totalIncome").innerText = totalIncome;
  document.getElementById("totalExpense").innerText = totalExpense;
  document.getElementById("balance").innerText = balance;
}

// Function to add transaction
document.getElementById("addButton").addEventListener("click", function () {
  const date = document.getElementById("transactionDate").value;
  const amount = parseFloat(document.getElementById("transactionAmount").value);
  const type = document.getElementById("transactionType").value;

  if (date && amount && type !== "Transaction Type") {
    // Add the transaction to the table
    const table = document.querySelector(".transaction-table");
    const row = table.insertRow(-1);

    row.innerHTML = `
      <td>${amount}</td>
      <td>${type}</td>
      <td>${date}</td>
      <td><button class="btn btn-md delete-button">
          <img src="https://img.freepik.com/premium-vector/delete-trash-can-icon-user-interface-websites-mobile-applications_1287271-115287.jpg?ga=GA1.1.97171927.1738402026&semt=ais_hybrid" alt="" width="35px">
        </button></td>
    `;

    // Adjust the total income, expense, and balance based on the transaction type
    if (type === "income") {
      totalIncome += amount;
    } else if (type === "expense") {
      totalExpense += amount;
    }

    // Update balance and the cards
    balance = totalIncome - totalExpense;
    updateCards();

    // Clear inputs after adding the transaction
    document.getElementById("transactionDate").value = '';
    document.getElementById("transactionAmount").value = '';
    document.getElementById("transactionType").value = 'Transaction Type';
  } else {
    alert("Please fill all fields correctly.");
  }
});

// Function to delete a transaction
document.querySelector(".transaction-table").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-button")) {
    const row = e.target.closest("tr");
    const amount = parseFloat(row.cells[0].innerText);
    const type = row.cells[1].innerText;

    // Adjust totals based on deleted transaction
    if (type === "income") {
      totalIncome -= amount;
    } else if (type === "expense") {
      totalExpense -= amount;
    }

    // Update balance and the cards
    balance = totalIncome - totalExpense;
    updateCards();

    // Remove the row
    row.remove();
  }
});

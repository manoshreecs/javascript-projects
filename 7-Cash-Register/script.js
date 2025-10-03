
let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
const denom = [
  ["ONE HUNDRED", 100],
  ["TWENTY", 20],
  ["TEN", 10],
  ["FIVE", 5],
  ["ONE", 1],
  ["QUARTER", 0.25],
  ["DIME", 0.1],
  ["NICKEL", 0.05],
  ["PENNY", 0.01]
];
function checkCashRegister() {
  const cash = parseFloat(document.getElementById("cash").value);
  const changeDue = parseFloat((cash - price).toFixed(2));
  const changeDiv = document.getElementById("change-due");
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    changeDiv.textContent = "";
    return;
  }
  if (changeDue === 0) {
    changeDiv.textContent = "No change due - customer paid with exact cash";
    return;
  }
  let change = [];
  let totalCid = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));
  if (changeDue > totalCid) {
    changeDiv.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }
  let remaining = changeDue;
  for (let [name, value] of denom) {
    let amountInDrawer = cid.find(d => d[0] === name)[1];
    if (remaining >= value && amountInDrawer > 0) {
      let amountToReturn = Math.min(Math.floor(remaining / value) * value, amountInDrawer);
      remaining = parseFloat((remaining - amountToReturn).toFixed(2));
      if (amountToReturn > 0) change.push(`${name}: $${amountToReturn}`);
    }
  }
  if (remaining > 0) {
    changeDiv.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (totalCid === changeDue) {
    changeDiv.textContent = "Status: CLOSED " + change.join(" ");
  } else {
    changeDiv.textContent = "Status: OPEN " + change.join(" ");
  }
}
document.getElementById("purchase-btn").addEventListener("click", checkCashRegister);

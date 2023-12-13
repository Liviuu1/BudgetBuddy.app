// "use strict";
// const accounts: Account[] = [account1, account2];

// /////////////////////////////////////////////////
// // Elements
// const labelWelcome: HTMLElement = document.querySelector(".welcome");
// const labelDate: HTMLElement = document.querySelector(".date");
// const labelBalance: HTMLElement = document.querySelector(".balance__value");
// const labelSumIn: HTMLElement = document.querySelector(".summary__value--in");
// const labelSumOut: HTMLElement = document.querySelector(".summary__value--out");
// const labelSumInterest: HTMLElement = document.querySelector(
//   ".summary__value--interest"
// );
// const labelTimer: HTMLElement = document.querySelector(".timer");

// const containerApp: HTMLElement = document.querySelector(".app");
// const containerMovements: HTMLElement = document.querySelector(".movements");

// const btnLogin: HTMLElement = document.querySelector(".login__btn");
// const btnTransfer: HTMLElement = document.querySelector(".form__btn--transfer");
// const btnLoan: HTMLElement = document.querySelector(".form__btn--loan");
// const btnClose: HTMLElement = document.querySelector(".form__btn--close");
// const btnSort: HTMLElement = document.querySelector(".btn--sort");

// const inputLoginUsername: HTMLInputElement = document.querySelector(
//   ".login__input--user"
// );
// const inputLoginPin: HTMLInputElement =
//   document.querySelector(".login__input--pin");
// const inputTransferTo: HTMLInputElement =
//   document.querySelector(".form__input--to");
// const inputTransferAmount: HTMLInputElement = document.querySelector(
//   ".form__input--amount"
// );
// const inputLoanAmount: HTMLInputElement = document.querySelector(
//   ".form__input--loan-amount"
// );
// const inputCloseUsername: HTMLInputElement =
//   document.querySelector(".form__input--user");
// const inputClosePin: HTMLInputElement =
//   document.querySelector(".form__input--pin");

// /////////////////////////////////////////////////
// // Functions

// const formatMovementDate = function (date: Date, locale: string): string {
//   const calcDaysPassed = (date1: Date, date2: Date): number =>
//     Math.round(
//       Math.abs((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))
//     );

//   const daysPassed: number = calcDaysPassed(new Date(), date);
//   console.log(daysPassed);

//   if (daysPassed === 0) return `Today`;
//   if (daysPassed === 1) return `Yesterday`;
//   if (daysPassed <= 7) return `${daysPassed} days ago`;

//   return new Intl.DateTimeFormat(locale).format(date);
// };

// const formatCurr = function (
//   value: number,
//   locale: string,
//   currency: string
// ): string {
//   return new Intl.NumberFormat(locale, {
//     style: "currency",
//     currency: currency,
//   }).format(value);
// };

// const displayMovements = function (acc: Account, sort: boolean = false): void {
//   containerMovements.innerHTML = "";

//   const movs: number[] = sort
//     ? acc.movements.slice().sort((a, b) => a - b)
//     : acc.movements;

//   movs.forEach(function (mov, i) {
//     const type: string = mov > 0 ? "deposit" : "withdrawal";
//     const date: Date = new Date(acc.movementsDates[i]);
//     const displayDate: string = formatMovementDate(date, acc.locale);
//     const formattedMov: string = formatCurr(mov, acc.locale, acc.currency);
//     const html: string = `
//       <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//         <div class="movements__date">${displayDate}</div>
//         <div class="movements__value">${formattedMov}</div>
//       </div>
//     `;

//     containerMovements.insertAdjacentHTML("afterbegin", html);
//   });
// };

// const calcDisplayBalance = function (acc: Account): void {
//   acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
//   const formattedBalance: string = formatCurr(
//     acc.balance,
//     acc.locale,
//     acc.currency
//   );
//   labelBalance.textContent = `${formattedBalance}`;
// };

// const calcDisplaySummary = function (acc: Account): void {
//   const incomes: number = acc.movements
//     .filter((mov) => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);

//   const formattedIncome: string = formatCurr(incomes, acc.locale, acc.currency);
//   labelSumIn.textContent = `${formattedIncome}`;

//   const out: number = acc.movements
//     .filter((mov) => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);

//   const formattedOut: string = formatCurr(
//     Math.abs(out),
//     acc.locale,
//     acc.currency
//   );
//   labelSumOut.textContent = `${formattedOut}`;

//   const interest: number = acc.movements
//     .filter((mov) => mov > 0)
//     .map((deposit) => (deposit * acc.interestRate) / 100)
//     .filter((int, i, arr) => {
//       return int >= 1;
//     })
//     .reduce((acc, int) => acc + int, 0);
//   const formattedInterest: string = formatCurr(
//     interest,
//     acc.locale,
//     acc.currency
//   );
//   labelSumInterest.textContent = `${formattedInterest}`;
// };

// const createUsernames = function (accs: Account[]): void {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };
// createUsernames(accounts);

// const updateUI = function (acc: Account): void {
//   displayMovements(acc);
//   calcDisplayBalance(acc);
//   calcDisplaySummary(acc);
// };

// ///////////////////////////////////////
// // Event handlers

// const startLogOutTimer = function (): number {
//   const tick = function (): void {
//     const min: string = String(Math.trunc(time / 60)).padStart(2, "0");
//     const sec: string = String(time % 60).padStart(2, "0");

//     labelTimer.textContent = `${min}:${sec}`;

//     if (time === 0) {
//       clearInterval(timer);
//       labelWelcome.textContent = `Log in to get started`;
//       containerApp.style.opacity = "0";
//     }

//     time--;
//   };

//   let time: number = 120;
//   tick();

//   const timer: number = setInterval(tick, 1000);
//   return timer;
// };
// let currentAccount: Account, timer: number;

// btnLogin.addEventListener("click", function (e: Event): void {
//   e.preventDefault();

//   currentAccount = accounts.find(
//     (acc) => acc.username === inputLoginUsername.value
//   );
//   console.log(currentAccount);

//   if (currentAccount?.pin === +inputLoginPin.value) {
//     labelWelcome.textContent = `Welcome back, ${
//       currentAccount.owner.split(" ")[0]
//     }`;
//     containerApp.style.opacity = "100";

//     const now: Date = new Date();
//     const options = {
//       hour: "numeric",
//       minute: "numeric",
//       day: "numeric",
//       month: "numeric",
//       year: "numeric",
//     };
//     labelDate.textContent = new Intl.DateTimeFormat(
//       currentAccount.locale,
//       options
//     ).format(now);

//     inputLoginUsername.value = inputLoginPin.value = "";
//     inputLoginPin.blur();
//     if (timer) clearInterval(timer);
//     timer = startLogOutTimer();

//     updateUI(currentAccount);
//   }
// });

// btnTransfer.addEventListener("click", function (e: Event): void {
//   e.preventDefault();
//   const amount: number = +inputTransferAmount.value;
//   const receiverAcc: Account = accounts.find(
//     (acc) => acc.username === inputTransferTo.value
//   );
//   inputTransferAmount.value = inputTransferTo.value = "";

//   if (
//     amount > 0 &&
//     receiverAcc &&
//     currentAccount.balance >= amount &&
//     receiverAcc?.username !== currentAccount.username
//   ) {
//     currentAccount.movements.push(-amount);
//     receiverAcc.movements.push(amount);

//     currentAccount.movementsDates.push(new Date().toISOString());
//     receiverAcc.movementsDates.push(new Date().toISOString());

//     updateUI(currentAccount);

//     clearInterval(timer);
//     timer = startLogOutTimer();
//   }
// });

// btnLoan.addEventListener("click", function (e: Event): void {
//   e.preventDefault();

//   const amount: number = Math.floor(inputLoanAmount.value);

//   if (
//     amount > 0 &&
//     currentAccount.movements.some((mov) => mov >= amount * 0.1)
//   ) {
//     setTimeout(function () {
//       currentAccount.movements.push(amount);
//       currentAccount.movementsDates.push(new Date().toISOString());

//       updateUI(currentAccount);
//     }, 2500);
//   }
//   inputLoanAmount.value = "";

//   clearInterval(timer);
//   timer = startLogOutTimer();
// });

// btnClose.addEventListener("click", function (e: Event): void {
//   e.preventDefault();

//   if (
//     inputCloseUsername.value === currentAccount.username &&
//     +inputClosePin.value === currentAccount.pin
//   ) {
//     const index: number = accounts.findIndex(
//       (acc) => acc.username === currentAccount.username
//     );
//     console.log(index);

//     accounts.splice(index, 1);

//     containerApp.style.opacity = "0";
//   }

//   inputCloseUsername.value = inputClosePin.value = "";
// });

// let sorted: boolean = false;
// btnSort.addEventListener("click", function (e: Event): void {
//   e.preventDefault();
//   displayMovements(currentAccount, !sorted);
//   sorted = !sorted;
// });

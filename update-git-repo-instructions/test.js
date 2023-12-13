// const [accounts, setAccounts] = useState([
//   {
//     owner: "Jonas Schmedtmann",
//     movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
//     interestRate: 1.2, // %
//     pin: 1111,
//     movementsDates: [
//       "2019-11-18T21:31:17.178Z",
//       "2019-12-23T07:42:02.383Z",
//       "2020-01-28T09:15:04.904Z",
//       "2020-04-01T10:17:24.185Z",
//       "2020-05-08T14:11:59.604Z",
//       "2020-05-27T17:01:17.194Z",
//       "2023-10-04T18:49:59.371Z",
//       "2023-10-05T12:01:20.894Z",
//     ],
//     currency: "EUR",
//     locale: "pt-PT",
//   },
//   {
//     owner: "Jessica Davis",
//     movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//     interestRate: 1.5,
//     pin: 2222,
//     movementsDates: [
//       "2019-11-01T13:15:33.035Z",
//       "2019-11-30T09:48:16.867Z",
//       "2019-12-25T06:04:23.907Z",
//       "2020-01-25T14:18:46.235Z",
//       "2020-02-05T16:33:06.386Z",
//       "2020-04-10T14:43:26.374Z",
//       "2023-10-04T18:49:59.371Z",
//       "2023-10-05T12:01:20.894Z",
//     ],
//     currency: "USD",
//     locale: "en-US",
//   },
// ]);

// const [currentAccount, setCurrentAccount] = useState(null);
// const [timer, setTimer] = useState(null);

// // useEffect to handle side effects
// useEffect(() => {
//   if (currentAccount) {
//     updateUI(currentAccount);
//     setTimer(startLogOutTimer());
//   }
// }, [currentAccount]);

// // Your functions go here...

// const formatMovementDate = function (date, locale) {
//   const calcDaysPassed = (date1, date2) =>
//     Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

//   const daysPassed = calcDaysPassed(new Date(), date);
//   console.log(daysPassed);

//   if (daysPassed === 0) return `Today`;
//   if (daysPassed === 1) return `Yesterday`;
//   if (daysPassed <= 7) return `${daysPassed} days ago`;

//   // const day = `${date.getDate()}`.padStart(2, 0);
//   // const month = `${date.getMonth() + 1}`.padStart(2, 0);
//   // const year = date.getFullYear();

//   return new Intl.DateTimeFormat(locale).format(date);

//   // return `${day}/${month}/${year}`;
// };

// const formatCurr = function (value, locale, currency) {
//   return new Intl.NumberFormat(locale, {
//     style: "currency",
//     currency: currency,
//   }).format(value);
// };

// const displayMovements = function (acc, sort = false) {
//   containerMovements.innerHTML = "";

//   const movs = sort
//     ? acc.movements.slice().sort((a, b) => a - b)
//     : acc.movements;

//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? "deposit" : "withdrawal";
//     const date = new Date(acc.movementsDates[i]);
//     const displayDate = formatMovementDate(date, acc.locale);
//     const formattedMov = formatCurr(mov, acc.locale, acc.currency);
//     const html = `
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

// const calcDisplayBalance = function (acc) {
//   acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
//   const formattedBalance = formatCurr(acc.balance, acc.locale, acc.currency);
//   labelBalance.textContent = `${formattedBalance}`;
// };
// const calcDisplaySummary = function (acc) {
//   const incomes = acc.movements
//     .filter((mov) => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);

//   const formattedIncome = formatCurr(incomes, acc.locale, acc.currency);
//   labelSumIn.textContent = `${formattedIncome}`;

//   const out = acc.movements
//     .filter((mov) => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);

//   const formattedOut = formatCurr(Math.abs(out), acc.locale, acc.currency);
//   labelSumOut.textContent = `${formattedOut}`;

//   const interest = acc.movements
//     .filter((mov) => mov > 0)
//     .map((deposit) => (deposit * acc.interestRate) / 100)
//     .filter((int, i, arr) => {
//       // console.log(arr);
//       return int >= 1;
//     })
//     .reduce((acc, int) => acc + int, 0);
//   const formattedInterest = formatCurr(interest, acc.locale, acc.currency);
//   labelSumInterest.textContent = `${formattedInterest}`;
// };

// const createUsernames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };

// const startLogOutTimer = function () {
//   const tick = function () {
//     const min = String(Math.trunc(time / 60)).padStart(2, 0);
//     const sec = String(time % 60).padStart(2, 0);

//     labelTimer.textContent = `${min}:${sec}`;

//     // when the time is at 0 stop timer log out user
//     if (time === 0) {
//       clearInterval(timer);
//       labelWelcome.textContent = `Log in to get started`;
//       containerApp.style.opacity = 0;
//     }

//     time--;
//   };
//   // Set time to 5 minutes
//   let time = 120;
//   // Call the timer every second
//   tick();

//   const timer = setInterval(tick, 1000);
//   return timer;
// };

// const updateUI = function (acc) {
//   // Display movements
//   displayMovements(acc);

//   // Display balance
//   calcDisplayBalance(acc);

//   // Display summary
//   calcDisplaySummary(acc);
// };

// // Event handlers
// const handleLogin = (e) => {
//   e.preventDefault();
//   const foundAccount = accounts.find(
//     (acc) => acc.username === inputLoginUsername.value
//   );

//   if (foundAccount?.pin === +inputLoginPin.value) {
//     setCurrentAccount(foundAccount);
//   }
// };

// const handleTransfer = (e) => {
//   e.preventDefault();

//   const amount = +inputTransferAmount.value;
//   const receiverUsername = inputTransferTo.value;

//   if (amount > 0 && receiverUsername) {
//     const receiverAccount = accounts.find(
//       (acc) => acc.username === receiverUsername
//     );

//     if (
//       receiverAccount &&
//       currentAccount.balance >= amount &&
//       receiverAccount.username !== currentAccount.username
//     ) {
//       // Perform the transfer
//       currentAccount.movements.push(-amount);
//       receiverAccount.movements.push(amount);
//       currentAccount.movementsDates.push(new Date().toISOString());
//       receiverAccount.movementsDates.push(new Date().toISOString());

//       // Update UI
//       updateUI(currentAccount);

//       // Reset input fields
//       inputTransferAmount.value = inputTransferTo.value = "";

//       // Restart the logout timer
//       clearInterval(timer);
//       setTimer(startLogOutTimer());
//     } else {
//       // Handle invalid transfer (e.g., insufficient balance, invalid recipient)
//       console.log("Invalid transfer");
//     }
//   }
// };

// const handleLoan = (e) => {
//   e.preventDefault();

//   const amount = Math.floor(inputLoanAmount.value);

//   if (
//     amount > 0 &&
//     currentAccount.movements.some((mov) => mov >= amount * 0.1)
//   ) {
//     setTimeout(() => {
//       // Add movement
//       currentAccount.movements.push(amount);
//       currentAccount.movementsDates.push(new Date().toISOString());

//       // Update UI
//       updateUI(currentAccount);

//       // Restart the logout timer
//       clearInterval(timer);
//       setTimer(startLogOutTimer());
//     }, 2500);
//   }

//   // Reset the input field
//   inputLoanAmount.value = "";
// };

// const handleClose = (e) => {
//   e.preventDefault();

//   if (
//     inputCloseUsername.value === currentAccount.username &&
//     +inputClosePin.value === currentAccount.pin
//   ) {
//     const updatedAccounts = accounts.filter(
//       (acc) => acc.username !== currentAccount.username
//     );

//     // Hide UI
//     containerApp.style.opacity = 0;

//     // Update state to remove the closed account
//     setAccounts(updatedAccounts);

//     // Reset input fields
//     inputCloseUsername.value = inputClosePin.value = "";

//     // Stop the logout timer
//     clearInterval(timer);
//   } else {
//     // Handle invalid close account attempt
//     console.log("Invalid close account attempt");
//   }
// };

// const handleSort = (e) => {
//   e.preventDefault();

//   const sortedMovements = currentAccount.movements
//     .slice()
//     .sort((a, b) => a - b);

//   // Update the movements array in the current account with the sorted array
//   currentAccount.movements = sortedMovements;

//   // Update the movements dates array accordingly
//   currentAccount.movementsDates = currentAccount.movements.map(() =>
//     new Date().toISOString()
//   );

//   // Update the UI
//   updateUI(currentAccount);
// };

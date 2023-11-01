import React from 'react';

const Balance = ({ balance, locale, currency }) => {
  const formattedBalance = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(balance);

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">05/03/2037</span>
        </p>
      </div>
      <p className="balance__value">{formattedBalance}</p>
    </div>
  );
};

export default Balance;
import React from "react";

function HeroSection() {
  return (
    <>
      <section className="section" id="section--1">
        <div className="section__title">
          <h2 className="section__description">Features</h2>
          <h3 className="section__header">
            Everything you need in a modern bank and more.
          </h3>
        </div>

        <div className="features">
          <img
            src="images/digital.jpg"
            data-src="images/digital.jpg"
            alt="Computer"
            className="features__img lazy"
          />
          <div className="features__feature">
            <div className="features__icon">
              <svg>
                <use xlinkHref="images/icons.svg#icon-monitor"></use>
              </svg>
            </div>
            <h5 className="features__header">100% digital bank</h5>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              alias sint quos? Accusantium a fugiat porro reiciendis saepe
              quibusdam debitis ducimus.
            </p>
          </div>

          <div className="features__feature">
            <div className="features__icon">
              <svg>
                <use xlinkHref="images/icons.svg#icon-trending-up"></use>
              </svg>
            </div>
            <h5 className="features__header">Watch your money grow</h5>

            <p>
              Nesciunt quos autem dolorum voluptates cum dolores dicta fuga
              inventore ab? Nulla incidunt eius numquam sequi iste pariatur
              quibusdam!
            </p>
          </div>
          <img
            src="images/grow.jpg"
            data-src="images/grow.jpg"
            alt="Plant"
            className="features__img"
          />

          <img
            src="images/card.png"
            data-src="images/card.png"
            alt="Credit card"
            className="features__img"
          />
          <div className="features__feature">
            <div className="features__icon">
              <svg>
                <use xlinkHref="images/icons.svg#icon-credit-card"></use>
              </svg>
            </div>
            <h5 className="features__header">Free debit card included</h5>
            <p>
              Quasi, fugit in cumque cupiditate reprehenderit debitis animi enim
              eveniet consequatur odit quam quos possimus assumenda dicta fuga
              inventore ab.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="section--2">
        <div className="section__title">
          <h2 className="section__description">Operations</h2>
          <h3 className="section__header">
            Everything as simple as possible, but no simpler.
          </h3>
        </div>

        <div className="operations">
          <div className="operations__tab-container">
            <button
              className="btn operations__tab operations__tab--1"
              data-tab="1"
            >
              <span>01</span>Instant Transfers
            </button>
            <button
              className="btn operations__tab operations__tab--2"
              data-tab="2"
            >
              <span>02</span>Instant Loans
            </button>
            <button
              className="btn operations__tab operations__tab--3"
              data-tab="3"
            >
              <span>03</span>Instant Closing
            </button>
          </div>
          <div className="operations__content operations__content--1 operations__content--active">
            <div></div>
            <h5 className="operations__header">Tranfser money to anyone</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="operations__content operations__content--2">
            <div className="operations__icon operations__icon--2">
              <svg>
                <use xlinkHref="images/icons.svg#icon-home"></use>
              </svg>
            </div>
            <h5 className="operations__header">
              Buy a home or make your dreams come true, with instant loans.
            </h5>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
          <div className="operations__content operations__content--3">
            <div className="operations__icon operations__icon--3">
              <svg>
                <use xlinkHref="images/icons.svg#icon-user-x"></use>
              </svg>
            </div>
            <h5 className="operations__header">
              No longer need your account? No problem! Close it instantly.
            </h5>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <img src="images/icon.png" alt="Logo" className="footer__logo" />
        <p className="footer__copyright">
          &copy;
          <a
            className="footer__link twitter-link"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Liviuu1/BudgetBuddy.app"
          >
            &nbsp; SSD Project Mocan Vlad, Liviu Oprea
          </a>
        </p>
      </footer>
    </>
  );
}
export default HeroSection;

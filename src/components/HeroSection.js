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
              Say goodbye to the limitations of physical branches, as our app
              seamlessly integrates into your daily routine, allowing you to
              manage your finances with unprecedented ease.
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
              Whether you're depositing your savings or withdrawing for planned
              expenses, our app ensures that every transaction is not only swift
              and secure but also contributes to the flourishing of your
              financial portfolio.
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
              Our digital platform ensures that your free debit card is not just
              a physical piece of plastic but a gateway to a world of financial
              possibilities.
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
            <h5 className="operations__header">
              {" "}
              Instant Transfers, Loans, and Closings
            </h5>
            <p>
              Experience financial agility like never before with our
              cutting-edge banking app. Enjoy the convenience of Instant
              Transfers, ensuring swift and seamless movement of funds within
              seconds. Explore Instant Loans, providing you with rapid access to
              funds to meet your urgent financial needs. And when it's time to
              wrap things up, revel in the efficiency of Instant Closing,
              streamlining and concluding your financial transactions instantly.
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
        <img
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          src="images/icon.png"
          alt="Logo"
          className="footer__logo"
        />
        <p className="footer__copyright">
          &copy;
          <a
            className="footer__link"
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

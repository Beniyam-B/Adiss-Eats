import { Link } from 'react-router-dom';

function Legal() {
  return (
    <div className="legal">
      <h2>Privacy Policy</h2>
      <p className="legal__updated">Last updated: September 2026</p>

      <div className="info-box legal__section">
        <h3>Information We Collect</h3>
        <p>
          When you create an account or place an order, we collect your name, phone
          number, and delivery address. We do not collect payment card details directly —
          those are handled with your rider at delivery.
        </p>
      </div>

      <div className="info-box legal__section">
        <h3>How We Use Your Information</h3>
        <p>
          Your details are used solely to process orders, contact you about delivery, and
          keep your order history available when you sign back in. We do not sell or share
          your information with third parties for marketing.
        </p>
      </div>

      <div className="info-box legal__section">
        <h3>Data Storage</h3>
        <p>
          Your cart and login session are currently stored locally in your browser. As
          this app grows, order history will move to a secure backend database.
        </p>
      </div>

      <div className="info-box legal__section">
        <h3>Your Rights</h3>
        <p>
          You can request that we delete your account and associated data at any time by
          contacting us using the details below.
        </p>
      </div>

      <h2 className="legal__terms-heading">Terms of Service</h2>

      <div className="info-box legal__section">
        <h3>Acceptance of Terms</h3>
        <p>
          By placing an order through Addis Eats, you agree to these terms. If you don't
          agree, please don't use the service.
        </p>
      </div>

      <div className="info-box legal__section">
        <h3>Orders & Payment</h3>
        <p>
          Prices are listed in Ethiopian Birr (ETB) and include VAT where applicable.
          Orders are confirmed once payment is arranged at delivery, unless otherwise
          stated.
        </p>
      </div>

      <div className="info-box legal__section">
        <h3>Delivery</h3>
        <p>
          Delivery times are estimates, not guarantees, and may vary with traffic,
          weather, or order volume across Addis Ababa.
        </p>
      </div>

      <div className="info-box legal__section">
        <h3>Account Responsibilities</h3>
        <p>
          You're responsible for providing an accurate delivery address and phone number.
          We're not responsible for delays caused by incorrect details.
        </p>
      </div>

      <div className="info-box legal__section">
        <h3>Changes to These Terms</h3>
        <p>
          We may update these terms as the service grows. Continued use after a change
          means you accept the update.
        </p>
      </div>

      <p className="legal__contact">Questions? Reach us at +251 911 234 567.</p>

      <Link to="/" className="link-button">Back to Home</Link>
    </div>
  );
}

export default Legal;
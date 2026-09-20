import { Link } from 'react-router-dom';
import './Footer.css';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__col">
          <h3 className="footer__brand">Addis Eats</h3>
          <p>Bringing Ethiopia's highland flavors to your door, one plate at a time.</p>
          <p className="footer__note">
            <i className="fa-solid fa-mug-hot"></i> Fresh Jebena coffee roasted daily
          </p>
        </div>
        <div className="footer__col">
          <h4>Opening Hours</h4>
          <p>Monday – Saturday: 10:00 AM – 10:00 PM</p>
          <p>Sunday: 12:00 PM – 9:00 PM</p>
          <p className="footer__note">Fresh injera baked every morning</p>
        </div>
        <div className="footer__col">
          <h4>What We Serve</h4>
          <p>Fasting & Vegan (Tsom)</p>
          <p>Traditional Stews & Wat</p>
          <p>Tibs & Grills</p>
          <p>House Tej & Coffee</p>
        </div>
        <div className="footer__col">
          <h4>Addis Ababa</h4>
          <p><i className="fa-solid fa-location-dot"></i> Bole, Addis Ababa & delivery citywide</p>
          <p><i className="fa-solid fa-phone"></i> +251 911 234 567</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2026 Addis Eats. Authentic Ethiopian & Eritrean Cuisine.</p>
        <div className="footer__links">
          <Link to="/menu" className="footer__link">About Us</Link>
          <Link to="/legal" className="footer__link">Privacy Policy</Link>
          <Link to="/legal" className="footer__link">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
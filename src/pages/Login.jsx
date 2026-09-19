import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PHONE_REGEX = /^(?:\+251|0)?[79]\d{8}$/;

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!PHONE_REGEX.test(phone)) {
      setPhoneError('Enter a valid Ethiopian phone number (e.g. 0912345678).');
      return;
    }
    setPhoneError('');
    login({ name, phone });
    navigate('/');
  };

  return (
    <div className="auth">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <label className="auth__label">
          Name
          <input className="auth__input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="auth__label">
          Phone Number
          <input className="auth__input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0912345678" />
        </label>
        {phoneError && <p className="auth__error">{phoneError}</p>}
        <button type="submit" className="auth__submit">Continue</button>
      </form>
      <p className="auth__switch">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
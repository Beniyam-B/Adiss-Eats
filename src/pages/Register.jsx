import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PHONE_REGEX = /^(?:\+251|0)?[79]\d{8}$/;

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!PHONE_REGEX.test(phone)) {
      newErrors.phone = 'Enter a valid Ethiopian phone number (e.g. 0912345678).';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      login({ name, email, phone });
      navigate('/');
    }
  };

  return (
    <div className="auth">
      <h2>Create Account</h2>
      <p className="auth__intro">Join Addis Eats to save your delivery details and order history.</p>
      <div className="info-box">
        <p>By creating an account, you can save your delivery details and view your order history at any time.</p>
      </div>
      <form onSubmit={handleSubmit} className="auth__form">
        <label className="auth__label">
          Full Name
          <input className="auth__input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="auth__label">
          Email
          <input className="auth__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="auth__label">
          Phone Number
          <input className="auth__input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0912345678" />
        </label>
        {errors.phone && <p className="auth__error">{errors.phone}</p>}
        <label className="auth__label">
          Password
          <input className="auth__input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {errors.password && <p className="auth__error">{errors.password}</p>}
        <label className="auth__label">
          Confirm Password
          <input className="auth__input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        {errors.confirmPassword && <p className="auth__error">{errors.confirmPassword}</p>}
        <button type="submit" className="auth__submit">Register</button>
      </form>
      <p className="auth__switch">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}

export default Register;
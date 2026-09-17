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
    <div className="auth-page">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Phone Number
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0912345678" />
        </label>
        {errors.phone && <p className="field-error">{errors.phone}</p>}
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {errors.password && <p className="field-error">{errors.password}</p>}
        <label>
          Confirm Password
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
        <button type="submit">Register</button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}

export default Register;
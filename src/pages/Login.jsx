import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/useAuthStore';
import { loginSchema } from '../schemas/formSchemas';
import Field from '../componenets/Field';

function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: { name: '', phone: '' },
  });

  const onSubmit = (data) => {
    login({ name: data.name, phone: data.phone });
    navigate('/');
  };

  return (
    <div className="auth">
      <h2>Sign In</h2>
      <p className="auth__intro">Welcome back — sign in to track your orders and check out faster.</p>
      <div className="info-box">
        <form onSubmit={handleSubmit(onSubmit)} className="auth__form" noValidate>
          <Field label="Name" {...register('name')} error={errors.name?.message} />
          <Field
            label="Phone Number"
            type="tel"
            placeholder="0912345678"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <button type="submit" className="auth__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Continue'}
          </button>
        </form>
      </div>
      <p className="auth__switch">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
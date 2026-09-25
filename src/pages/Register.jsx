import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/useAuthStore';
import { registerSchema } from '../schemas/formSchemas';
import Field from '../componenets/Field';

function Register() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data) => {
    login({ name: data.name, email: data.email, phone: data.phone });
    navigate('/');
  };

  return (
    <div className="auth">
      <h2>Create Account</h2>
      <p className="auth__intro">Join Addis Eats to save your delivery details and order history.</p>
      <div className="info-box">
        <form onSubmit={handleSubmit(onSubmit)} className="auth__form" noValidate>
          <Field label="Full Name" {...register('name')} error={errors.name?.message} />
          <Field label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Field
            label="Phone Number"
            type="tel"
            placeholder="0912345678"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <Field label="Password" type="password" {...register('password')} error={errors.password?.message} />
          <Field
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <button type="submit" className="auth__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </button>
        </form>
      </div>
      <p className="auth__switch">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}

export default Register;
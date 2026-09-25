import { forwardRef } from 'react';

const Field = forwardRef(function Field(
  { label, name, type = 'text', error, as = 'input', ...rest },
  ref
) {
  const errorId = `${name}-error`;
  const Component = as;

  return (
    <label className="field" htmlFor={name}>
      {label}
      <Component
        ref={ref}
        id={name}
        name={name}
        type={as === 'input' ? type : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="field__input"
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="field__error">
          {error}
        </p>
      )}
    </label>
  );
});

export default Field;
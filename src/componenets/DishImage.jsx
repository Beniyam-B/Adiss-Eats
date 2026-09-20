import { useState } from 'react';

function DishImage({ src, alt, className, onClick }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`${className} dish-image--fallback`} onClick={onClick}>
        <i className="fa-solid fa-utensils"></i>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={() => setFailed(true)}
    />
  );
}

export default DishImage;
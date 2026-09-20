import { useCart } from '../context/CartContext';

function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="toast">
      <i className="fa-solid fa-circle-check"></i> {toast.message}
    </div>
  );
}

export default Toast;
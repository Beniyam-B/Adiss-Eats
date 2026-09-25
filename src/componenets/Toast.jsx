import { useCartStore } from '../store/useCartStore';

function Toast() {
  const toast = useCartStore((state) => state.toast);

  if (!toast) return null;

  return (
    <div className="toast">
      <i className="fa-solid fa-circle-check"></i> {toast.message}
    </div>
  );
}

export default Toast;
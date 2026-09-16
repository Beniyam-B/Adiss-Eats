import { createPortal } from 'react-dom';

function Modal({ onClose, children }) {
return createPortal(
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {children}
        </div>
    </div>,
    document.getElementById('modal-root')
);
}

export default Modal;
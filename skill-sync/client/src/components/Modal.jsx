import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={onClose} // Close modal when clicking on overlay
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") // Render modal in a separate DOM element
  );
};

export default Modal;

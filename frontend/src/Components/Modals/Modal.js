// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, title, content, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{content}</div>
        <div className="modal-footer">{actions}</div>
      </div>
    </div>
  );
};

export default Modal;

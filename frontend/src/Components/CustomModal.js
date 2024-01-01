import React from 'react';

const CustomModal = ({ isOpen, closeModal, handleFileChange, handleUpload }) => {
  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Choose Your Cover Photo</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleUpload}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;

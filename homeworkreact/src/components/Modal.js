import React from "react";
const Modal = ({ closeModal, title  }) => {
    return (
            <div className="modal-background">
                <div className="modal-wrapper">
                    <div className="close-modal-button-container">
                        <button className="close-modal-button" onClick={closeModal}> X </button>
                    </div>
                    <div className="modal-info">
                    <strong>title</strong>
                    <p>{title}</p>
                    <p>id</p>
                    </div>   
                </div>
            </div>
    );
}

export default Modal;
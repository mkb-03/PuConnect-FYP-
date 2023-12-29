
import React, { useState, useEffect } from 'react';

const Alert = ({ message, type, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            // onClose(); // Callback to perform any necessary actions after the alert is closed
        }, 2000); // Adjust the duration as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        show && (
            <div className={`alert alert-${type} alert-dismissible fade show`} style={{ borderRadius: 0, fontWeight: 500 }} role="alert">
                {message}
            </div>
        )
    );
};

export default Alert;

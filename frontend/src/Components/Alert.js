// Alert.js

import React, { useState, useEffect } from 'react';

const Alert = ({ message, type, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onClose(); // Callback to perform any necessary actions after the alert is closed
        }, 2000); // Adjust the duration as needed

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        show && (
            <div className={`alert alert-${type} alert-dismissible fade show`} style={{ borderRadius: 0 }} role="alert">
                {message}
            </div>
        )
    );
};

export default Alert;

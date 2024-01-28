import React, { useState, useEffect } from 'react';
import UploadImageComponent from './UploadImageComponent';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BackgroundBanner = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [bannerData, setBannerData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const serverBaseUrl = 'http://localhost:3000';

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await axios.get(`${serverBaseUrl}/bg-banner/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setBannerData(response.data);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchBannerData();
    }, [token]);

    const handleImageUpload = async (formData, endpoint) => {
        try {
            setLoading(true);

            const response = await axios.post(`${serverBaseUrl}/${endpoint}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccessMessage(`${endpoint} uploaded successfully`);
            console.log(response.data);

            // Set the banner data directly from the response data
            setBannerData(response.data);

            // const updatedResponse = await axios.get(`${serverBaseUrl}/bg-banner/get`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });

            // setBannerData(updatedResponse.data);

        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                setErrorMessage(`Error uploading ${endpoint}. Please try again.`);
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveBanner = async () => {
        try {
            setLoading(true);

            await axios.delete(`${serverBaseUrl}/bg-banner/remove`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccessMessage('Background Banner removed successfully');
            setBannerData(null);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                setErrorMessage('Error removing Background Banner. Please try again.');
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDefaultBannerClick = () => {
        setShowModal(true);
    };

    return (
        <div>
            <img
                src={
                    bannerData && bannerData.isDefault
                        ? '../images/defaultBanner.jpg'
                        : bannerData
                        ? `data:image/png;base64,${bannerData.bg_image}`
                        : ''
                }
                alt="Background Banner"
                style={{ minWidth: '100%', marginBottom: '20px', cursor: 'pointer' }}
                onClick={handleDefaultBannerClick}
            />

            {/* Bootstrap Modal */}
            {showModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Upload Background Banner</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <UploadImageComponent
                                    type="Banner"
                                    onUpload={(formData) => handleImageUpload(formData, 'bg-banner/add')}
                                    loading={loading}
                                    successMessage={successMessage}
                                    errorMessage={errorMessage}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Save
                                </button>
                                {bannerData && (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={handleRemoveBanner}
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BackgroundBanner;

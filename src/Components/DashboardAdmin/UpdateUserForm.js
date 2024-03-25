    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    const UpdateUserForm = ({ row, onClose }) => {
        const [formData, setFormData] = useState({
            firstname: row.firstname,
            lastname: row.lastname,
            email: row.email,
            password: row.password,
            uid: row.uid
        });
        const [isLoading, setIsLoading] = useState(false);

        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleOnClick = async (event) => {
            event.preventDefault(); 

            try {
                setIsLoading(true);

                const response = await axios.put(
                    "https://events-api-iuta.onrender.com/user/update-user-info",
                    {
                        uid: row.uid,
                        firstname: formData.firstname,
                        lastname: formData.lastname,
                        email: formData.email,
                        password: formData.password
                    },
                    {
                        headers: {  
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );

                console.log(response.data);
            } catch (error) {
                console.error("Error updating user:", error);
            } finally {
                onClose(false); 
                setIsLoading(false);
                setFormData({});
            }
        };

        const handleCancelClick = () => {
            onClose(false); 
            setFormData({});
        };

        return (
            <div className="form-container">
                <h1>Update User Form</h1>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="firstname">Firstname</label>
                        <input required name="firstname" id="firstname" type="text" value={formData.firstname} onChange={handleInputChange} />
                        <label htmlFor="lastname">Lastname</label>
                        <input required name="lastname" id="lastname" type="text" value={formData.lastname} onChange={handleInputChange} />
                        <label htmlFor="email">Email</label>
                        <input required name="email" id="email" type="email" value={formData.email} onChange={handleInputChange} />
                        <label htmlFor="password">Password</label>
                        <input required name="password" id="password" type="password" value={formData.password} onChange={handleInputChange} />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="form-submit-btn" onClick={handleOnClick} disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="button" className="form-submit-btn form-cancel-btn" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    export default UpdateUserForm;

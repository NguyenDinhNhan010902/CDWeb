import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import BASE_URL from '../../database/Config';
import $ from 'jquery';
import { MDBBtn, MDBCheckbox, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow } from "mdb-react-ui-kit";
import Login from "./Login"; // Import Login component

function Register({ show, handleClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showLogin, setShowLogin] = useState(false); // State to control Login modal
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        // Reset any previous error message
        setError('');

        // Validation checks
        if (!username) {
            setError('Username không được trống');
            return;
        }
        if (!password) {
            setError('Mật khẩu không đc trống');
            return;
        }
        if (password.length <8) {
            setError('Mật khẩu tối thiểu 8 ký tự');
            return;
        }

        if (!email  || !/\S+@\S+\.\S+/.test(email)) {
            setError('Valid email is required');
            return;
        }

        $.ajax({
            url: `${BASE_URL}/register`,
            type: 'POST',
            dataType: 'json',
            data: {
                username,
                password,
                email
            },
            xhrFields: {
                withCredentials: true // Ensure cookies are sent with requests
            },
            success: function (response) {
                if (response.success) {
                    setSuccessMessage(response.message); // Set success message from server
                    sessionStorage.setItem('token', response.token); // Store token in session storage
                    handleClose(); // Close modal after successful registration
                } else {
                    setError(response.message); // Set error message from server
                }
            },
            error: function (error) {
                console.error('There was an error registering!', error);
                setError('mail đã tồn tại'); // Set generic error message for network errors
            }
        });
    };

    const openLogin = () => {
        setShowLogin(true); // Show Login modal
        handleClose(); // Close Register modal
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="containerRegister">
                        <div className="formRegister">
                            <MDBContainer fluid className="p-3 my-5 h-custom">
                                <MDBRow className="signin">
                                    <MDBCol col='4' md='6' className="signinw">
                                        <div className="d-flex flex-row align-items-center justify-content-center">
                                            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                            <MDBBtn floating size='md' tag='a' className='me-2'>
                                                <MDBIcon fab icon='facebook-f' />
                                            </MDBBtn>
                                            <MDBBtn floating size='md' tag='a' className='me-2'>
                                                <MDBIcon fab icon='twitter' />
                                            </MDBBtn>
                                            <MDBBtn floating size='md' tag='a' className='me-2'>
                                                <MDBIcon fab icon='linkedin-in' />
                                            </MDBBtn>
                                        </div>
                                        <div className="divider d-flex align-items-center my-4">
                                            <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                        </div>
                                        <form onSubmit={handleRegister}>
                                            <MDBInput style={{ border: '1px solid black' }} wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg"
                                                      value={username} onChange={(e) => setUsername(e.target.value)} />
                                            <MDBInput style={{ border: '1px solid black' }} wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                                                      value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <MDBInput style={{ border: '1px solid black' }} wrapperClass='mb-4' label='Email' id='formControlLg' type='email' size="lg"
                                                      value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <div className="d-flex justify-content-between mb-4">
                                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                                <a href="!#">Forgot password?</a>
                                            </div>
                                            {error && <div className="alert alert-danger">{error}</div>}
                                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                            <div className='text-center text-md-start mt-4 pt-2'>
                                                <MDBBtn style={{ width: '120px', height: '40px' }} type="submit">Register</MDBBtn>
                                                <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account?
                                                    <a href="#!" className="link-danger" onClick={openLogin}>Login</a>
                                                </p>
                                            </div>
                                        </form>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Render Login modal if showLogin state is true */}
            {showLogin && (
                <Login
                    show={showLogin}
                    handleClose={() => setShowLogin(false)} // Close Login modal
                />
            )}
        </>
    );
}

export default Register;

import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import BASE_URL from '../../database/Config';
import $ from 'jquery';
import Register from "./Register"; // Import jQuery

function LoginModal({ show, handleClose, handleLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username) {
            setError('Tên đăng nhập không được trống');
            return;
        }
        if (!password || password.length <8) {
            setError('Mật khẩu không hợp lệ');
            return;
        }
        $.ajax({
            url: `${BASE_URL}/login`,
            type: 'POST',
            dataType: 'json',
            data: {
                username,
                password
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(response) {
                if (response.success) {
                    sessionStorage.setItem('token', response.token); // Store token in session storage
                    handleLoginSuccess(); // Update login status
                    handleClose(); // Close modal after successful login


                } else {
                    setError(response.message); // Set error message from server
                }


            },
            error: function(error) {
                console.error('There was an error logging in!', error);
                setError('Sai tên đăng nhập hoặc mật khẩu'); // Set generic error message for network errors
            }
        });

    };

    const openRegisterModal = () => {
        setShowRegisterModal(true); // Show RegisterModal
        handleClose(); // Close LoginModal
    };

    return (
        <>
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="containerLogin">
                    <div className="formLogin">
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
                                    <form onSubmit={handleLogin}>
                                        <MDBInput style={{ border: '1px solid black' }} wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg"
                                                  value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <MDBInput style={{ border: '1px solid black' }} wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                                                  value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <div className="d-flex justify-content-between mb-4">
                                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                            <a href="!#">Forgot password?</a>
                                        </div>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className='text-center text-md-start mt-4 pt-2'>
                                            <MDBBtn style={{ width: '120px', height: '40px' }} type="submit">Login</MDBBtn>
                                            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account?
                                                <a href="#!" className="link-danger" onClick={openRegisterModal}>Register</a>
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
            {showRegisterModal && (
                <Register
                    show={showRegisterModal}
                    handleClose={() => setShowRegisterModal(false)} // Close RegisterModal
                />
            )}
        </>

    );
}

export default LoginModal;

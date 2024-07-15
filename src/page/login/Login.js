import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './login.css';
import axios from 'axios';
import {useLocation, useNavigate, } from "react-router-dom";
import BASE_URL from '../../database/Config';
import Images from "../img/InImage";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                username,
                password
            }, { withCredentials: true });
            if (response.data.success) {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // navigate(-1);
                window.history.go(-1);
                // window.location.reload();
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <div className="containerLogin">
            <div className="formLogin">
                <MDBContainer fluid className="p-3 my-5 h-custom">
                    <MDBRow>
                        <MDBCol col='10' md='6'>
                            <Images src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                 className="img-fluid" alt="Sample image" />
                        </MDBCol>
                        <MDBCol col='4' md='6'>
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
                                <div className='text-center text-md-start mt-4 pt-2'>
                                    <MDBBtn style={{ width: '120px', height: '40px' }} type="submit">Login</MDBBtn>
                                    <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account?
                                        <a href="#!" className="link-danger">Register</a>
                                    </p>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
}

export default Login;

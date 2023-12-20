import './LoginPage.css';
import React, { useEffect } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import HeaderLogin from '../Component/HeaderLogin';
import ReserveButton from '../Component/ReserveButton';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store';

// Production API
import { API } from '../Api';

function LoginPage() {

    const navigate = useNavigate();
    const { userId, userRole } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const loginBtnClick = () => {
        const account = document.getElementById("Account").value;
        const password = document.getElementById("examplePassword").value;
        API.login.post(account, password)
            .then((res) => {
                dispatch(login({
                    userId: res.data.user_id,
                    carId: res.data.car_id,
                    userRole:res.data.user_role,
                }));
                if (res.data.user_role.toLowerCase() === 'guard') {
                    navigate('/guard');
                }
                else {
                    navigate('/');
                }
            })
            .catch((err) => alert('Login failed\n', err));
    };
    useEffect(() => {
        if (userId) {
            if (userRole.toLowerCase() === 'guard') {
                navigate('/guard');
            }
            else {
                navigate('/');
            }
        }
    }, [navigate, userId, userRole]);

    return (
        <>
            <HeaderLogin />
            <div className="form-wrapper">
                <Form id="loginForm">
                    <FormGroup>
                        <Label for="Account"></Label>
                        <Input
                            id="Account"
                            name="Account"
                            type="email"
                            placeholder=" Account"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword"></Label>
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder=" Password"
                            type="password"
                        />
                    </FormGroup>
                </Form>
            </div>
            <ReserveButton text='Login' color='danger' outline={false} onClick={loginBtnClick} up_shift={true} />
        </>
    );
}

export default LoginPage;

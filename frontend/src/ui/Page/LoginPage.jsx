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
    const user = useSelector((state) => state.login.userId);
    const dispatch = useDispatch();
    const loginBtnClick = () => {
        const account = document.getElementById("Account").value;
        const password = document.getElementById("examplePassword").value;
        API.login.post(account, password)
            .then((res) => {
                localStorage.setItem('userId', res.data.user_id);
                localStorage.setItem('carId', res.data.car_id);
                dispatch(login({ userId: res.data.user_id, carId: res.data.car_id }));
                navigate('/');
            })
            .catch((err) => alert('Login failed\n', err));
    };
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, []);

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

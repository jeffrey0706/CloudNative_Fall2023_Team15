import './LoginPage.css';
import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import HeaderLogin from '../Component/HeaderLogin';
import ReserveButton from '../Component/ReserveButton';


// Production API
// import { API } from '../Api';

function LoginPage() {

    const navigate = useNavigate();
    const loginBtnClick = () => {
        let account = document.getElementById("Account").value;
        navigate('/', { state: { account: account } })
    };

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

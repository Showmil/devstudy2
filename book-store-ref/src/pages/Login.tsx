import React, { useState } from 'react'
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from '../components/common/inputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAlert } from '../hooks/useAlert';
import { login, signup } from '../api/auth.api';
import { SignupStyle } from './Signup';
import { useAuth } from '@/hooks/useAuth';

export interface LoginProps {
    email: string;
    password: string;
}

function Login() {
    const { userLogin } = useAuth();

    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<LoginProps>();

    const onSubmit = (data: LoginProps) => {
    userLogin(data);
    };

    return (
        <>
            <Title size="large">로그인</Title>
            <SignupStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <InputText
                            placeholder="이메일"
                            inputType="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <p className="error-text">이메일을 입력해주세요.</p>
                        )}
                    </fieldset>

                    <fieldset>
                        <InputText
                            placeholder="비밀번호"
                            inputType="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <p className="error-text">비밀번호를 입력해주세요.</p>
                        )}
                    </fieldset>
                    <fieldset>
                        <Button type="submit" size="medium" scheme="primary">
                            회원가입
                        </Button>
                    </fieldset>
                    <div className="info">
                        <Link to="/reset">비밀번호 초기화</Link>
                    </div>
                </form>
            </SignupStyle>
        </>
    );
}


export default Login;

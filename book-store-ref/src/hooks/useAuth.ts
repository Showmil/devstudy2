import React, { useState } from 'react'
import { useAlert } from './useAlert';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { LoginProps } from '@/pages/Login';
import { login, resetPassword, resetRequest, signup } from '@/api/auth.api';
import { SignupProps } from '@/pages/Signup';


export const useAuth = () => {
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const { storeLogin, storeLogout, isloggedIn } = useAuthStore();

    const userLogin = (data: LoginProps) => {
        login(data).then(
            (res) => {
                // 상태 업데이트
                storeLogin(res.token);

                showAlert("로그인이 완료되었습니다.");
                navigate("/");
            },
            (error) => {
                showAlert("로그인이 실패했습니다.");
            }
        );
    };
    const userSignup = (data: SignupProps) => {
        signup(data).then((res) => {
            // 성공
            showAlert("회원가입이 완료되었습니다.");
            navigate("/login");
        });
    };

    const userResetPassword = (data: SignupProps) => {
        resetPassword(data).then(() => {
            showAlert("비밀번호가 초기화되었습니다.");
            navigate("/login");
        });
    };

    const [resetRequested, setResetRequested] = useState(false);

    const userResetRequest = (data: SignupProps) => {
        resetRequest(data).then(() => {
            setResetRequested(true);
        });
    };

    // 렌턴
    return { userLogin, userSignup, userResetPassword, userResetRequest, resetRequested };

};

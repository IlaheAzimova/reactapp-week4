import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiry = localStorage.getItem('token_expiry');

        if (token && expiry && Date.now() < Number(expiry)) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    const handleLoginSubmit = (data) => {
        const mockToken = 'mock_jwt_' + Math.random().toString(36).substring(2);
        const expiryTime = Date.now() + 2 * 60 * 1000;

        localStorage.setItem('token', mockToken);
        localStorage.setItem('token_expiry', expiryTime);
        localStorage.setItem('userEmail', data.email);

        navigate('/dashboard', { replace: true });
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-box">
                <h2>Sistemə Giriş</h2>
                <p>Davam etmək üçün məlumatlarınızı daxil edin.</p>

                <form onSubmit={handleSubmit(handleLoginSubmit)}>
                    <div className="input-group">
                        <label>Elektron Poçt</label>
                        <input
                            type="email"
                            placeholder="name@domain.com"
                            {...register("email", {
                                required: "Bütün sahələri doldurun!",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Zəhmət olmasa etibarlı email ünvanı daxil edin."
                                }
                            })}
                        />
                        {errors.email && <span className="error-message-text">⚠️ {errors.email.message}</span>}
                    </div>

                    <div className="input-group">
                        <label>Şifrə</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            {...register("password", {
                                required: "Bütün sahələri doldurun!",
                                minLength: {
                                    value: 6,
                                    message: "Şifrə ən azı 6 simvoldan ibarət olmalıdır."
                                }
                            })}
                        />
                        {errors.password && <span className="error-message-text">⚠️ {errors.password.message}</span>}
                    </div>

                    <button type="submit" className="btn-submit">
                        Daxil Ol
                    </button>
                </form>
            </div>
        </div>
    );
}
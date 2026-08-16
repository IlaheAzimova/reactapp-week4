import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Sessiyanın qorunması: Əgər token artıq mövcuddursa, istifadəçi login səhifəsinə girə bilməz
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email.trim() && password.trim()) {
            // Mock  Token generasiyası və localStorage-də saxlanılması
            const mockToken = 'mock_jwt_' + Math.random().toString(36).substring(2);
            localStorage.setItem('authToken', mockToken);
            localStorage.setItem('userEmail', email);

            // brauzer tarixçəsini təmizləyir ki back düyməsi ilə loginə qayıtmaq olmasın
            navigate('/dashboard', { replace: true });
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-box">
                <h2>Sistemə Giriş</h2>
                <p>Davam etmək üçün məlumatlarınızı daxil edin.</p>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Elektron Poçt</label>
                        <input
                            type="email"
                            placeholder="name@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Şifrə</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-submit">
                        Daxil Ol
                    </button>
                </form>
            </div>
        </div>
    );
}
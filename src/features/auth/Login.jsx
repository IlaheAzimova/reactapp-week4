import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiry = localStorage.getItem('token_expiry');

        if (token && expiry && Date.now() < Number(expiry)) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // 1. Boşluq yoxlaması
        if (!email.trim() || !password.trim()) {
            setError('Bütün sahələri doldurun!');
            return;
        }

        // 2. Email formatı yoxlaması (@ simvolu)
        if (!email.includes('@') || !email.includes('.')) {
            setError('Zəhmət olmasa etibarlı email ünvanı daxil edin.');
            return;
        }

        // 3. Şifrə uzunluğu yoxlaması
        if (password.length < 6) {
            setError('Şifrə ən azı 6 simvoldan ibarət olmalıdır.');
            return;
        }

        setError('');
        const mockToken = 'mock_jwt_' + Math.random().toString(36).substring(2);
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userEmail', email);

        navigate('/dashboard', { replace: true });
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-box">
                <h2>Sistemə Giriş</h2>
                <p>Davam etmək üçün məlumatlarınızı daxil edin.</p>

                <form onSubmit={handleLoginSubmit}>
                    <div className="input-group">
                        <label>Elektron Poçt</label>
                        <input
                            type="email"
                            placeholder="name@domain.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError('');
                            }}
                        />
                    </div>

                    <div className="input-group">
                        <label>Şifrə</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError('');
                            }}
                        />
                    </div>

                    {error && <span className="error-message-text">⚠️ {error}</span>}

                    <button type="submit" className="btn-submit">
                        Daxil Ol
                    </button>
                </form>
            </div>
        </div>
    );
}
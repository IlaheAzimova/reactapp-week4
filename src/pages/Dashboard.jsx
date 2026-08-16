import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedia } from '../context/MediaContext';

export default function Dashboard() {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail') || 'İstifadəçi';

    const { mediaList, toggleFavorite, addMedia } = useMedia();

    const [title, setTitle] = useState('');
    const [type, setType] = useState('Film');
    const [formError, setFormError] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate('/login', { replace: true });
    }, [navigate]);

    const simulateTokenExpiration = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        alert('Token vaxtı bitdi (401 Unauthorized)! Login səhifəsinə yönləndirilirsiniz.');
        navigate('/login', { replace: true });
    }, [navigate]);

    const handleAddSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setFormError('Media başlığı boş ola bilməz!');
            return;
        }

        if (title.trim().length < 2) {
            setFormError('Başlıq ən azı 2 simvoldan ibarət olmalıdır.');
            return;
        }

        setFormError('');
        addMedia(title.trim(), type);
        setTitle('');
    };

    const displayedList = showFavoritesOnly
        ? mediaList.filter(item => item.favorite)
        : mediaList;

    return (
        <div className="dashboard-container">

            <div className="dashboard-nav">
                <div className="user-meta">
                    <h3>🎬 Şəxsi Media Arxivi (Watchlist)</h3>
                    <span>Aktiv Sessiya: {userEmail}</span>
                </div>

                <div className="nav-actions">
                    <button onClick={simulateTokenExpiration} className="btn-sim-401">
                        Simulate 401
                    </button>

                    <button onClick={handleLogout} className="btn-logout">
                        Çıxış Et
                    </button>
                </div>
            </div>

            <div className="panel-card panel-margin-bottom">
                <h4>Yeni Film və ya Kitab Əlavə Et</h4>
                <form onSubmit={handleAddSubmit}>
                    <div className="media-form-row">
                        <input
                            type="text"
                            placeholder="Adı..."
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (formError) setFormError('');
                            }}
                            className="media-input"
                        />
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="media-select"
                        >
                            <option value="Film">Film</option>
                            <option value="Kitab">Kitab</option>
                        </select>
                        <button type="submit" className="btn-submit btn-add-override">
                            Əlavə Et
                        </button>
                    </div>
                    {formError && <span className="error-message-text">⚠️ {formError}</span>}
                </form>
            </div>

            <div className="panel-card">
                <div className="list-header-row">
                    <h4 className="list-header-title">Kolleksiya Siyahısı (Validated Forms)</h4>
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`filter-btn ${showFavoritesOnly ? 'filter-active' : 'filter-inactive'}`}
                    >
                        {showFavoritesOnly ? '⭐ Bütün Siyahı' : '⭐ Yalnız Sevimlilər'}
                    </button>
                </div>

                <div className="media-list-container">
                    {displayedList.length === 0 ? (
                        <p className="empty-list-text">Heç bir element tapılmadı.</p>
                    ) : (
                        displayedList.map(item => (
                            <div key={item.id} className="media-item-card">
                                <div>
                                    <span className="media-badge">{item.type}</span>
                                    <span className="media-title-text">{item.title}</span>
                                    <span className="media-year-text">({item.year})</span>
                                </div>

                                <button
                                    onClick={() => toggleFavorite(item.id)}
                                    className="fav-toggle-btn"
                                    title="Sevimlilərə əlavə et"
                                >
                                    {item.favorite ? '⭐' : '☆'}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail') || 'İstifadəçi';

    const [mediaList, setMediaList] = useState([
        { id: 1, title: 'Interstellar', type: 'Film', year: 2014, favorite: true },
        { id: 2, title: 'Clean Code', type: 'Kitab', year: 2008, favorite: false },
        { id: 3, title: 'Inception', type: 'Film', year: 2010, favorite: false }
    ]);

    const [title, setTitle] = useState('');
    const [type, setType] = useState('Film');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate('/login', { replace: true });
    };

    const toggleFavorite = (id) => {
        setMediaList(mediaList.map(item =>
            item.id === id ? { ...item, favorite: !item.favorite } : item
        ));
    };

    const handleAddMedia = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newItem = {
            id: Date.now(),
            title: title.trim(),
            type,
            year: new Date().getFullYear(),
            favorite: false
        };

        setMediaList([newItem, ...mediaList]);
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
                <button onClick={handleLogout} className="btn-logout">
                    Çıxış Et
                </button>
            </div>


            <div className="panel-card" style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '12px' }}>Yeni Film və ya Kitab Əlavə Et</h4>
                <form onSubmit={handleAddMedia}>
                    <div className="media-form-row">
                        <input
                            type="text"
                            placeholder="Adı..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="media-input"
                            required
                        />
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="media-select"
                        >
                            <option value="Film">Film</option>
                            <option value="Kitab">Kitab</option>
                        </select>
                        <button type="submit" className="btn-submit" style={{ width: '120px', marginTop: 0 }}>
                            Əlavə Et
                        </button>
                    </div>
                </form>
            </div>


            <div className="panel-card">
                <div className="list-header-row">
                    <h4 style={{ margin: 0, border: 'none', padding: 0 }}>Kolleksiya Siyahısı</h4>
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className="filter-btn"
                        style={{ backgroundColor: showFavoritesOnly ? '#238636' : '#21262d', color: 'white' }}
                    >
                        {showFavoritesOnly ? '⭐ Bütün Siyahı' : '⭐ Yalnız Sevimlilər'}
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {displayedList.length === 0 ? (
                        <p style={{ color: '#8b949e', fontSize: '13px', textAlign: 'center', padding: '20px' }}>Heç bir element tapılmadı.</p>
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
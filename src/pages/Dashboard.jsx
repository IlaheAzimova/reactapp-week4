import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedia } from '../context/MediaContext';

export default function Dashboard() {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail') || 'İstifadəçi';

    const { mediaList, toggleFavorite, addMedia, deleteMedia } = useMedia();

    const [title, setTitle] = useState('');
    const [type, setType] = useState('Film');
    const [searchQuery, setSearchQuery] = useState('');
    const [formError, setFormError] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate('/login', { replace: true });
    }, [navigate]);

    const handleAddSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setFormError('Başlıq boş ola bilməz!');
            return;
        }
        if (title.trim().length < 2) {
            setFormError('Başlıq ən azı 2 simvol olmalıdır.');
            return;
        }

        setFormError('');
        addMedia(title.trim(), type);
        setTitle('');
    };

    const displayedList = mediaList
        .filter(item => (showFavoritesOnly ? item.favorite : true))
        .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="dashboard-container">
            <div className="dashboard-nav">
                <div className="user-meta">
                    <h3>🎬 Media Arxivi </h3>
                    <span>{userEmail}</span>
                </div>
                <button onClick={handleLogout} className="btn-logout">Çıxış Et</button>
            </div>


            <div className="panel-card panel-margin-bottom">
                <h4>Yeni Media Əlavə Et</h4>
                <form onSubmit={handleAddSubmit}>
                    <div className="media-form-row">
                        <input
                            type="text"
                            placeholder="Adı..."
                            value={title}
                            onChange={(e) => { setTitle(e.target.value); if (formError) setFormError(''); }}
                            className="media-input"
                        />
                        <select value={type} onChange={(e) => setType(e.target.value)} className="media-select">
                            <option value="Film">Film</option>
                            <option value="Kitab">Kitab</option>
                        </select>
                        <button type="submit" className="btn-submit">Əlavə Et</button>
                    </div>
                    {formError && <span className="error-message-text">⚠️ {formError}</span>}
                </form>
            </div>

            {/* Axtarış və Siyahı */}
            <div className="panel-card">
                <div className="list-header-row">
                    <h4 className="list-header-title">Kolleksiya</h4>
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`filter-btn ${showFavoritesOnly ? 'filter-active' : ''}`}
                    >
                        {showFavoritesOnly ? '⭐ Bütün Siyahı' : '⭐ Yalnız Sevimlilər'}
                    </button>
                </div>

                <div className="search-box-wrapper">
                    <input
                        type="text"
                        placeholder="Siyahıda axtar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input-field"
                    />
                </div>

                <div className="media-list-container">
                    {displayedList.length === 0 ? (
                        <p className="empty-list-text">Siyahı boşdur və ya tapılmadı.</p>
                    ) : (
                        displayedList.map(item => (
                            <div key={item.id} className="media-item-card">
                                <div>
                                    <span className="media-badge">{item.type}</span>
                                    <span className="media-title-text">{item.title}</span>
                                </div>
                                <div className="item-actions-group">
                                    {/* Favorit ulduzu */}
                                    <button onClick={() => toggleFavorite(item.id, item.favorite)} className="fav-toggle-btn">
                                        {item.favorite ? '⭐' : '☆'}
                                    </button>
                                    {/* Silmə düyməsi */}
                                    <button onClick={() => deleteMedia(item.id)} className="btn-delete-item">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
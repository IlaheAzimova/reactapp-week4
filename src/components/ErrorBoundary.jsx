import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error Boundary tərəfindən tutuldu:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary-wrapper">
                    <div className="error-boundary-box">
                        <h2>⚠️ Nəsə səhv getdi</h2>
                        <p>Bu hissədə gözlənilməz xəta baş verdi. Zəhmət olmasa səhifəni yeniləyin.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-reload"
                        >
                            Səhifəni Yenilə
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
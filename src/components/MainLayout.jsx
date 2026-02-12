import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div className="layout-root">
            {children}

            {/* Developer Signature - Bottom Right */}
            <footer className="developer-signature">
                <a
                    href="https://honeypatel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="signature-link"
                >
                    <span className="by-text">by</span>
                    <span className="name-text">Honey Patel</span>
                </a>
            </footer>
        </div>
    );
};

export default MainLayout;

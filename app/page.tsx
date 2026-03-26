"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Redirect to the static HTML file
    window.location.href = "/index.html";
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#f2f1ed',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '28px',
          height: '28px',
          border: '2px solid #dedad2',
          borderTopColor: '#508c1a',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <p style={{ color: '#888', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Loading
        </p>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

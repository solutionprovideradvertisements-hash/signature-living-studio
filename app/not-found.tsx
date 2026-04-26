export default function NotFound() {
  return (
    <html>
      <body style={{ margin: 0 }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          background: '#080808',
          color: '#C5A059',
          fontFamily: 'serif',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(4rem, 15vw, 8rem)', 
            marginBottom: '0', 
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: 1
          }}>404</h1>
          
          <div style={{
            height: '1px',
            width: '60px',
            background: 'rgba(197, 160, 89, 0.3)',
            margin: '2rem 0'
          }} />

          <p style={{ 
            fontSize: '0.75rem', 
            letterSpacing: '0.4em', 
            textTransform: 'uppercase',
            opacity: 0.8,
            fontWeight: '500'
          }}>Page Not Found</p>
          
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.4)',
            maxWidth: '300px',
            lineHeight: '1.6',
            marginTop: '1rem',
            fontFamily: 'sans-serif'
          }}>
            The residence you are looking for does not exist or has been moved.
          </p>

          <a href="/" style={{ 
            marginTop: '3rem', 
            color: '#FDFBF7', 
            textDecoration: 'none',
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            padding: '16px 32px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
            fontFamily: 'sans-serif'
          }}>
            Return Home
          </a>
        </div>
      </body>
    </html>
  )
}

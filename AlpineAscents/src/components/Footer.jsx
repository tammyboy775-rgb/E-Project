import './Footer.css'

export default function Footer({ address, email, copyright, brand }) {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div>
          <a href="#home" className="brand footer-brand">
            <span className="brand-mark">A</span>
            <span>{brand}</span>
          </a>
        </div>

        <div className="footer-links">
          <p>{address}</p>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>{copyright}</span>
      </div>
    </footer>
  )
}

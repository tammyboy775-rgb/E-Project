import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <section className="page-shell"><div className="container section-spacing"><p className="eyebrow eyebrow-dark">404</p><h1>That trail does not exist.</h1><p>The page may have moved or the address may be incorrect.</p><Link className="btn btn-primary" to="/">Return home</Link></div></section>
}

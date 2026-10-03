import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Ticker from './Ticker'
import data from '../data/alpineAscentsData.json'

export default function Layout() {
  return (
    <div className="app-shell">
      <Header nav={data.header.nav} phone={data.header.phone} brand={data.brand} visitorSeed={data.visitorCountSeed} />

      <main>
        <Outlet />
      </main>

      <Footer
        address={data.footer.address}
        email={data.footer.email}
        copyright={data.footer.copyright}
        brand={data.brand}
      />
      <Ticker />
    </div>
  )
}

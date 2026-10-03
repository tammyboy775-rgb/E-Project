import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ReviewsPage from './pages/ReviewsPage'
import ContactPage from './pages/ContactPage'
import HistoryPage from './pages/HistoryPage'
import TypesPage from './pages/TypesPage'
import TechniquesPage from './pages/TechniquesPage'
import ShelteringPage from './pages/ShelteringPage'
import HazardsPage from './pages/HazardsPage'
import RecordsPage from './pages/RecordsPage'
import ClubsPage from './pages/ClubsPage'
import GalleryPage from './pages/GalleryPage'
import LatestPage from './pages/LatestPage'
import GuidelinesPage from './pages/GuidelinesPage'
import NotFoundPage from './pages/NotFoundPage'
// App.css must stay the last import: it holds the shared responsive
// overrides that have to load after every component/page stylesheet.
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/types" element={<TypesPage />} />
          <Route path="/techniques" element={<TechniquesPage />} />
          <Route path="/sheltering" element={<ShelteringPage />} />
          <Route path="/hazards" element={<HazardsPage />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/success-stories" element={<ReviewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/latest" element={<LatestPage />} />
          <Route path="/guidelines" element={<GuidelinesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

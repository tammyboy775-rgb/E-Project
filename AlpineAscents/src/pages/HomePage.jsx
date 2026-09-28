import './HomePage.css'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import FeaturedJourneys from '../components/FeaturedJourneys'
import WhyChooseUs from '../components/WhyChooseUs'
import Experiences from '../components/Experiences'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import data from '../data/alpineAscentsData.json'

export default function HomePage() {
  return (
    <>
      <Hero {...data.hero} />
      <Stats stats={data.stats} />
      <FeaturedJourneys featured={data.featured} />
      <WhyChooseUs benefits={data.benefits} />
      <Experiences experiences={data.experiences} />
      <Testimonials testimonials={data.testimonials} />
      <CallToAction />
    </>
  )
}

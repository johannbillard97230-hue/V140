import { Routes, Route } from 'react-router-dom';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { ParkingTypes } from './sections/ParkingTypes';
import { Comparison } from './sections/Comparison';
import { Testimonials } from './sections/Testimonials';
import { BookingForm } from './sections/BookingForm';
import { FAQ } from './sections/FAQ';
import { Partners } from './sections/Partners';
import { Footer } from './sections/Footer';
import { Marquee } from './sections/Marquee';
import { CookieBanner } from './sections/CookieBanner';
import { SocialProof } from './sections/SocialProof';
import PaymentPage from './pages/Payment';
import SuccessPage from './pages/Success';

function HomePage() {
  return (
    <>
      <Marquee />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ParkingTypes />
        <Comparison />
        <Testimonials />
        <BookingForm />
        <FAQ />
        <Partners />
      </main>
      <Footer />
      <CookieBanner />
      <SocialProof />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;

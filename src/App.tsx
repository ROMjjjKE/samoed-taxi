import Header from './components/Header';
import Hero from './components/Hero';
import Talon from './components/Talon';
import Trips from './components/Trips';
import Order from './components/Order';
import Faq from './components/Faq';
import Footer from './components/Footer';
import { useLenis } from './components/useLenis';
import { useReveal } from './components/useReveal';

export default function App() {
  useLenis();
  useReveal('samoed');
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Talon />
        <Trips />
        <Order />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

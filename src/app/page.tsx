import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tariffs from "@/components/sections/Tariffs";
import Reviews from "@/components/sections/Reviews";
import Footer from "@/components/sections/Footer";
import ContactUs from "@/components/sections/ContactUs";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Tariffs />
      <Reviews />
      <ContactUs />
      <Footer />
    </>
  );
}

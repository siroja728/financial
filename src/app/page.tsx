import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tariffs from "@/components/sections/Tariffs";
import Reviews from "@/components/sections/Reviews";
import Footer from "@/components/sections/Footer";
import ContactUs from "@/components/sections/ContactUs";

import { getTariffs } from "@/lib/api-handlers/tariffs";

export const metadata = {
  title: "VR-invest - Financial Courses",
  description: "Learn finance with our comprehensive courses",
};

export default async function Home() {
  const tariffs = await getTariffs();
  const sortedTariffs = tariffs.sort((a, b) => a.order - b.order);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Tariffs tariffs={sortedTariffs} />
      <Reviews />
      <ContactUs />
      <Footer />
    </>
  );
}

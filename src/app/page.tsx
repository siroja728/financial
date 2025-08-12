import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tariffs from "@/components/sections/Tariffs";
import Reviews from "@/components/sections/Reviews";
import Footer from "@/components/sections/Footer";
import ContactUs from "@/components/sections/ContactUs";

import { getTariffs } from "@/lib/api-handlers/tariffs";
import { getAllSettingsAdmin } from "@/lib/api-handlers/adminSettings";

export const revalidate = 60;

export const metadata = {
  title: "VR-invest - Financial Courses",
  description: "Learn finance with our comprehensive courses",
};

export default async function Home() {
  const tariffs = await getTariffs();
  const sortedTariffs = tariffs.sort((a, b) => a.order - b.order);
  const settings = await getAllSettingsAdmin();

  return (
    <>
      <Header />
      <Hero settings={settings.hero_block} />
      <About about={settings.personal_info} />
      <Tariffs tariffs={sortedTariffs} settings={settings.admin} />
      <Reviews />
      <ContactUs
        contactInfo={settings.contact_info}
        socialLinks={settings.social_links}
      />
      <Footer />
    </>
  );
}

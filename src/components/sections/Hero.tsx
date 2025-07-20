import { HeroBlock } from "@/types/Settings";
function Hero({ settings }: { settings: HeroBlock }) {
  return (
    <section className="flex flex-col gap-4 items-center justify-center p-4 h-100 bg-gradient-to-r from-green-800 to-green-900 ">
      <h1 className="text-white font-bold text-5xl text-center">
        {settings.main_text}
      </h1>
      <h2 className="text-white text-xl text-center">{settings.sub_text}</h2>
    </section>
  );
}

export default Hero;

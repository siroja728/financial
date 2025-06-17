import Image, { ImageLoader } from "next/image";

const imageLoader: ImageLoader = ({ src }) => {
  return src;
};

function About() {
  return (
    <section
      id="about"
      className="flex flex-wrap items-center justify-center min-h-100 bg-grey gap-10 p-10"
    >
      <div>
        <Image
          loader={imageLoader}
          className="rounded-full border-4 border-green-800"
          src="/coach.png"
          width={300}
          height={300}
          alt="Financial Coach"
        />
      </div>
      <div className="flex flex-col gap-4 max-w-2xl">
        <h2 className="font-bold text-4xl text-green-800 text-center lg:text-left">
          Про Вікторія Рибарук
        </h2>
        <p className="text-center lg:text-left">
          Маючи понад 10 років досвіду у фінансовому плануванні та управлінні
          активами, я допомагаю окремим особам та сім&apos;ям контролювати свої
          фінанси та будувати безпечне майбутнє. Я маю сертифікати з фінансового
          планування (CFP) і допоміг понад 500 клієнтам досягти своїх фінансових
          цілей за допомогою персоналізованого коучингу та стратегічного
          планування. Мій підхід поєднує практичні стратегії бюджетування з
          довгостроковим інвестиційним плануванням для створення комплексної
          фінансової дорожньої карти, адаптованої до вашої унікальної ситуації.
        </p>
      </div>
    </section>
  );
}

export default About;

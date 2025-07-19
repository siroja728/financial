function Footer() {
  const date = new Date();
  return (
    <footer id="contact" className="bg-green p-6 text-center">
      <p className="text-white">
        {date.getFullYear()} © Вікторія Рибарук - Фінансовий тренер. Всі права
        захищені.
      </p>
    </footer>
  );
}

export default Footer;

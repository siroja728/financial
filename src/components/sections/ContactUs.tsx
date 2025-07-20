"use client";

import Image from "next/image";

import { ContactInfo, SocialLinks } from "@/types/Settings";

function ContactUs({
  contactInfo,
  socialLinks,
}: {
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
}) {
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      subject: formData.get("name") as string,
      html: formData.get("message") as string,
      sender_email: formData.get("email") as string,
    };

    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Ваше повідомлення надіслано. Я відповім протягом 24 годин.");
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Сталася помилка при надсиланні повідомлення. Спробуйте ще раз.");
    }
  };

  console.log(socialLinks);

  return (
    <section className="flex flex-col gap-4 items-center justify-center p-10 min-h-100 bg-green">
      <h2 className="text-3xl font-bold text-white mb-10">Маєш запитання?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        <div className="bg-transparent p-6">
          <h3 className="text-2xl text-white font-semibold mb-2">
            Контактна інформація
          </h3>
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-white">
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <a href={`tel:+38${contactInfo.phone}`}>+38{contactInfo.phone}</a>
            </div>
            <div className="flex items-center text-white">
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </div>
            <div className="flex items-center text-white">
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>{contactInfo.address}</span>
            </div>
          </div>
          <h3 className="text-2xl text-white font-semibold mb-2">
            Слідкуй за мною
          </h3>
          <div className="flex justify-start space-x-4 mt-4">
            {Object.entries(socialLinks).map(([platform, url]) => {
              if (!url) return null;

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-200 transition"
                >
                  <Image
                    color="white"
                    src={`/icons/social/${platform}.svg`}
                    alt={platform}
                    width={24}
                    height={24}
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Напиши мені</h3>
          <p className="text-gray-700 mb-4">
            Я відповім на всі запитання протягом 24 годин.
          </p>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Ваше ім'я"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Ваш email"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="message"
              placeholder="Ваше повідомлення"
              required
              className="w-full p-2 border border-gray-300 rounded h-32"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-800 text-white p-2 rounded hover:bg-green-700 transition-colors duration-300 cursor-pointer"
            >
              Відправити
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;

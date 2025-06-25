"use client";
import { useState } from "react";

import LiqpayPayment from "@/components/LiqpayPayment";

function Tariffs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState("");
  const [showForm, setShowForm] = useState(true);

  const handleBuyClick = (tariffName: string) => {
    setSelectedTariff(tariffName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTariff("");
    setShowForm(true);
  };

  return (
    <section
      id="tariffs"
      className="flex flex-col items-center justify-center p-10 bg-white"
    >
      <h2 className="font-bold text-4xl text-green-800 mb-6">
        Тарифи на послуги
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        <div className="bg-grey p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[350px]">
          <h3 className="text-xl font-bold text-green-800 mb-2 text-center">
            Базовий
          </h3>
          <p className="text-gray-700 mb-4 text-2xl font-bold text-center">
            500 грн/місяць
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Щомісячні консультації</li>
            <li>Базове бюджетування</li>
            <li>Доступ до онлайн ресурсів</li>
          </ul>
          <button
            onClick={() => handleBuyClick("Базовий")}
            className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
          >
            Купити
          </button>
        </div>
        <div className="bg-green-800 p-6 rounded-lg shadow-md flex flex-col justify-between  min-h-[350px]">
          <h3 className="text-xl font-bold text-white mb-2 text-center">
            Стандартний
          </h3>
          <p className="text-white mb-4 text-2xl font-bold text-center">
            1000 грн/місяць
          </p>
          <ul className="list-disc pl-5 text-white">
            <li>Все з Базового тарифу</li>
            <li>Індивідуальне планування інвестицій</li>
            <li>Щотижневі звіти про прогрес</li>
          </ul>
          <button
            onClick={() => handleBuyClick("Стандартний")}
            className="mt-4 bg-white text-green px-4 py-2 rounded cursor-pointer"
          >
            Купити
          </button>
        </div>
        <div className="bg-grey p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[350px]">
          <h3 className="text-xl font-bold text-green-800 mb-2 text-center">
            Преміум
          </h3>
          <p className="text-gray-700 mb-4 text-2xl font-bold text-center">
            2000 грн/місяць
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Все з Стандартного тарифу</li>
            <li>Персоналізоване фінансове планування</li>
            <li>24/7 підтримка через месенджери</li>
          </ul>
          <button
            onClick={() => handleBuyClick("Преміум")}
            className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
          >
            Купити
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer rounded-full p-1 transition duration-200 hover:bg-gray-100"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
              Купівля тарифу: {selectedTariff}
            </h3>
            <p className="text-gray-700 mb-4">
              Ви обрали тариф&nbsp;
              <span className="font-bold">{selectedTariff}</span>. Будь ласка,
              заповніть форму та здійсніть оплату через LiqPay.
            </p>
            <p className="text-gray-700 mb-4">
              Ми не передаємо ваші дані третім особам і використовуємо їх лише
              для обробки платежів та надання послуг.
            </p>
            {showForm ? (
              <form className="flex flex-col gap-4">
                <label className="text-gray-700">
                  Ваше ім&apos;я:
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
                    required
                  />
                </label>
                <label className="text-gray-700">
                  Email:
                  <input
                    type="email"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
                    required
                  />
                </label>
                <label className="text-gray-700">
                  Телефон:
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
                    required
                  />
                </label>
              </form>
            ) : null}
            <LiqpayPayment onContinue={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Tariffs;

"use client";
import { useState } from "react";

import LiqpayPayment from "@/components/LiqpayPayment";

import Tariff from "@/types/Tariff";
import { AdminSettings } from "@/types/Settings";

function Tariffs({
  tariffs,
  settings,
}: {
  tariffs: Tariff[];
  settings: AdminSettings;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);
  const [expandedTariffs, setExpandedTariffs] = useState<Set<string>>(
    new Set()
  );
  const { enable_liqpay: enableLiqpay, currency } = settings;
  const currencySymbol = currency === "UAH" ? "грн" : "$";

  const handleBuyClick = (selectedTariff: Tariff) => {
    setSelectedTariff(selectedTariff);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTariff(null);
  };

  const toggleExpanded = (tariffId: string) => {
    const newExpanded = new Set(expandedTariffs);

    if (newExpanded.has(tariffId)) {
      newExpanded.delete(tariffId);
    } else {
      newExpanded.add(tariffId);
    }
    setExpandedTariffs(newExpanded);
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
        {tariffs.map((tariff) => {
          const isExpanded = expandedTariffs.has(tariff.id);

          return (
            <div
              key={tariff.id}
              className={`bg-grey p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[400px] max-w-[350px] ${
                isExpanded ? "h-auto" : "h-[400px]"
              }`}
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-800 mb-2 text-center">
                  {tariff.name}
                </h3>
                <p className="text-gray-700 mb-4 text-2xl font-bold text-center">
                  {tariff.price} {currencySymbol}/місяць
                </p>
                <div className="flex flex-col">
                  <div
                    className={`text-gray-700 whitespace-pre-wrap ${
                      isExpanded ? "" : "line-clamp-4 overflow-hidden"
                    }`}
                  >
                    {tariff.description}
                  </div>
                  <button
                    onClick={() => toggleExpanded(tariff.id)}
                    className="text-green-800 hover:text-green-600 text-sm mt-2 self-start underline"
                  >
                    {isExpanded ? "Згорнути" : "Показати більше"}
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleBuyClick(tariff)}
                className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer flex-shrink-0"
              >
                {enableLiqpay ? "Купити" : "Зареєструватися"}
              </button>
            </div>
          );
        })}
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
              {enableLiqpay
                ? `Оплата за тарифом ${selectedTariff?.name}`
                : "Реєстрація на тариф"}
            </h3>
            {enableLiqpay ? (
              <p className="text-gray-700">
                Будь ласка, заповніть форму та здійсніть оплату. Всю додаткову
                інформацію буде надіслано на вашу електронну пошту після
                успішної оплати.
              </p>
            ) : (
              <p className="text-gray-700">
                Будь ласка, заповніть форму реєстрації. Всю додаткову інформацію
                буде надіслано на вашу електронну адресу після реєстрації.
              </p>
            )}
            <LiqpayPayment
              enableLiqpay={settings.enable_liqpay}
              tariff={selectedTariff}
              onFormSubmit={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Tariffs;

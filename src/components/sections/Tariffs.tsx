function Tariffs() {
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
          <button className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer">
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
          <button className="mt-4 bg-white text-green px-4 py-2 rounded cursor-pointer">
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
          <button className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer">
            Купити
          </button>
        </div>
      </div>
    </section>
  );
}

export default Tariffs;

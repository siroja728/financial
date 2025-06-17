function Reviews() {
  return (
    <section
      id="reviews"
      className="flex flex-col items-center justify-center p-10 bg-grey"
    >
      <h2 className="font-bold text-4xl text-green-800 mb-6">Відгуки</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">
                ★
              </span>
            ))}
          </div>
          <p className="text-gray-700 mb-4">
            &quot;Дякую за професійну допомогу! Тепер я впевнено керую своїми
            фінансами та маю чіткий план на майбутнє.&quot;
          </p>
          <div className="text-sm text-gray-600">
            <p className="font-semibold">Марія Петренко</p>
            <p>Підприємець</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">
                ★
              </span>
            ))}
          </div>
          <p className="text-gray-700 mb-4">
            &quot;Завдяки індивідуальному підходу змогла створити ефективну стратегію
            інвестування. Рекомендую всім!&quot;
          </p>
          <div className="text-sm text-gray-600">
            <p className="font-semibold">Анна Коваленко</p>
            <p>Менеджер</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex mb-4">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">
                ★
              </span>
            ))}
            <span className="text-gray-300 text-xl">★</span>
          </div>
          <p className="text-gray-700 mb-4">
            &quot;Професійний коуч, який допоміг мені зрозуміти основи фінансового
            планування та почати інвестувати.&quot;
          </p>
          <div className="text-sm text-gray-600">
            <p className="font-semibold">Олексій Іванов</p>
            <p>IT-спеціаліст</p>
          </div>
        </div>
      </div>
      <button className="mt-6 bg-green text-white px-8 py-4 rounded hover:bg-green-700 transition cursor-pointer">
        Залишити відгук
      </button>
    </section>
  );
}

export default Reviews;

import { getTariffs } from "@/lib/api-handlers/tariffs";

import TariffsTable from "@/app/admin/tariffs/TariffsTable";

async function TariffsPage() {
  const tariffs = await getTariffs();
  const sortedTariffs = tariffs.sort((a, b) => a.order - b.order);

  return (
    <div className="p-4 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Тарифи</h1>
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <TariffsTable tariffs={sortedTariffs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TariffsPage;

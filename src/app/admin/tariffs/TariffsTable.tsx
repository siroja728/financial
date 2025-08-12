"use client";
import { useState } from "react";

import Tariff from "@/types/Tariff";

import {
  createTariff,
  updateTariff,
  deleteTariff,
} from "@/lib/api-handlers/tariffs";

const initialFormData = {
  id: "",
  name: "",
  price: "",
  description: "",
  order: 0,
  duration: "month",
  discount: 0,
  discount_type: "none",
};

function TariffsTable({ tariffs }: { tariffs: Tariff[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tariffToDelete, setTariffToDelete] = useState<Tariff | null>(null);

  const handleCreate = () => {
    setIsCreating(true);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const handleEdit = (tariff: Tariff) => {
    setIsCreating(false);
    setFormData({
      id: tariff.id,
      name: tariff.name,
      price: tariff.price.toString(),
      description: tariff.description,
      order: tariff.order,
      duration: tariff.duration,
      discount: tariff.discount,
      discount_type: tariff.discount_type,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (tariff: Tariff) => {
    setTariffToDelete(tariff);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (tariffToDelete) {
      await deleteTariff(tariffToDelete.id);
      setIsDeleteModalOpen(false);
      setTariffToDelete(null);
      window.location.reload();
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setTariffToDelete(null);
  };

  const handleSave = async () => {
    if (formData.id) {
      const tariff = {
        ...formData,
        order: formData.order,
        discount: 0,
        discount_type: "none" as const,
        duration: "month" as const,
        price: parseFloat(formData.price),
      };

      await updateTariff({
        id: formData.id,
        tariff,
      });
    } else {
      const tariff = {
        order: 0,
        discount: 0,
        discount_type: "none" as const,
        duration: "month" as const,
        price: parseFloat(formData.price),
        name: formData.name,
        description: formData.description,
      };

      await createTariff({
        tariff,
      });
    }
    setIsModalOpen(false);
    setIsCreating(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsCreating(false);
    setFormData(initialFormData);
  };

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const handleDeleteModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleDeleteCancel();
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Створити тариф
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Назва
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ціна
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Опис
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Дії
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tariffs.map((tariff) => (
            <tr key={tariff.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {tariff.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {tariff.price} грн/місяць
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {tariff.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button
                  onClick={() => handleEdit(tariff)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded cursor-pointer"
                >
                  Редагувати
                </button>
                <button
                  onClick={() => handleDeleteClick(tariff)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded cursor-pointer"
                >
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {isCreating ? "Створити тариф" : "Редагувати тариф"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Назва
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Назва тарифу"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ціна
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ціна"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Опис
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Опис тарифу"
                  rows={10}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Скасувати
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Зберегти
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50"
          onClick={handleDeleteModalBackdropClick}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Підтвердження видалення</h2>
            <p className="text-gray-700 mb-6">
              Ви впевнені, що хочете видалити тариф &quot;{tariffToDelete?.name}
              &quot;? Цю дію не можна скасувати.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Скасувати
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TariffsTable;

import { useEffect, useState } from "react";
import service from "../appwrite/config";
import ItemModal from "../components/ItemModal";

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await service.getItems();
        setItems(res.documents);
      } catch (error) {
        console.error("Failed to fetch items", error);
      }
    };
    fetchItems();
  }, []);

  const getImageUrl = (id) => service.getFileView(id);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
        View Items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.$id}
            onClick={() => setSelectedItem(item)}
            className="bg-white shadow-md rounded-lg cursor-pointer overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={getImageUrl(item.coverImage)}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        getImageUrl={getImageUrl}
      />
    </div>
  );
};

export default ViewItems;

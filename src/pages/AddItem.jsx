import { useState } from "react";
import { useForm } from "react-hook-form";
import service from "../appwrite/config";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const coverImageUpload = data.coverImage[0]
        ? await service.uploadFile(data.coverImage[0])
        : null;
      const coverImageId = coverImageUpload?.$id;

      const additionalImageIds = [];
      if (data.additionalImages?.length > 0) {
        for (let file of data.additionalImages) {
          const upload = await service.uploadFile(file);
          if (upload?.$id) additionalImageIds.push(upload.$id);
        }
      }

      await service.createItem({
        name: data.itemName,
        type: data.itemType,
        description: data.description,
        coverImage: coverImageId,
        additionalImages: additionalImageIds,
      });

      toast.success("Item successfully added!");
      setLoading(false);
      reset();
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-6 bg-white shadow-md rounded-lg ">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
        Add New Item
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        <div>
          <label className="block font-medium">
            Item Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            disabled={loading}
            {...register("itemName", {
              required: {
                value: true,
                message: "Item name is required",
              },
            })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Nike Shoes"
          />
          {errors.itemName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.itemName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">
            Item Type<span className="text-red-500">*</span>
          </label>
          <select
            disabled={loading}
            {...register("itemType", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select type</option>
            <option value="Phone">Phone</option>
            <option value="Watch">Watch</option>

            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports Gear">Sports Gear</option>
          </select>
          {errors.itemType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.itemType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Item Description</label>
          <textarea
            disabled={loading}
            {...register("description")}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write a short description..."
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label className="block font-medium mb-1">
              Cover Image<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              disabled={loading}
              {...register("coverImage", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 file:mr-3 file:py-1 file:px-2 file:border-0  file:text-blue-900"
            />
            {errors.coverImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.coverImage.message}
              </p>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <label className="block font-medium mb-1">Additional Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={loading}
              {...register("additionalImages")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 file:mr-3 file:py-1 file:px-2 file:border-0 file:text-blue-900 "
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded font-medium transition 
      ${
        loading
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-blue-900 hover:bg-blue-950 text-white"
      }`}
          >
            {loading ? "Adding Item" : "Add Item"}
          </button>

          <Link
            to="/view-items"
            className="px-6 py-2 rounded font-medium bg-gray-300 hover:bg-gray-400 text-black transition"
          >
            View Items
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddItem;

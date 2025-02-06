"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/app/components/SideBar";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    rating: "",
    description: "",
    discountPercentage: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      // Upload image if selected
      if (imageFile) {
        const formDataToSend = new FormData();
        formDataToSend.append("file", imageFile);

        const uploadResponse = await fetch("/api/products/uploadImage", {
          method: "POST",
          body: formDataToSend,
        });

        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok) {
          imageUrl = uploadData.imageUrl; // Use the returned image URL
        } else {
          throw new Error("Image upload failed.");
        }
      }

      // Construct the payload according to Sanity's schema
      const productPayload = {
        _type: "product",
        name: formData.name,
        details: formData.description,
        price: parseFloat(formData.price) || 0,
        priceWithoutDiscount: parseFloat(formData.discountPercentage) || 0,
        category: formData.rating,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageUrl, // Reference to the uploaded image in Sanity
          },
        },
      };

      // Sanity API call to create a new product
      const productResponse = await fetch("/api/products/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productPayload),
      });

      const productData = await productResponse.json();
      if (productResponse.ok) {
        alert("Product added successfully!");
        router.push("/admin/product"); // Redirect to product listing page
      } else {
        alert(`Error: ${productData.message}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-300 text-white flex justify-center items-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-blue-900">Add Product</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-300 text-black border border-gray-600 rounded-lg"
                placeholder="Enter Product Name"
              />
            </div>

            {/* Price */}
            <div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 bg-gray-300 text-black border border-gray-600 rounded-lg"
                placeholder="Enter Price"
              />
            </div>

            {/* Discount Percentage */}
            <div>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="w-full p-3 bg-gray-300 text-black border border-gray-600 rounded-lg"
                placeholder="Enter Discount Percentage"
              />
            </div>

            {/* Product Description */}
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 bg-gray-300 text-black border border-gray-600 rounded-lg"
                rows={4}
                placeholder="Enter Product Description"
              />
            </div>

            {/* Rating */}
            <div>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-3 bg-gray-300 text-black border border-gray-600 rounded-lg"
                placeholder="Enter Rating"
              />
            </div>

            {/* Image Upload */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 bg-gray-300 text-black border border-gray-600 rounded-lg"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 bg-gradient-to-r from-blue-300 to-teal-900 text-white rounded-lg ${
                  loading ? "cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-500" : "hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-600"
                }`}
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

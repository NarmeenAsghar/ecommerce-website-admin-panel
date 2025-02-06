"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import SideBar from "@/app/components/SideBar";

// Define the Product Interface
interface Product {
  _id: string;
  name: string;
  price: string;
  image: {
    asset: {
      url: string;
    };
  };
  discountPercentage?: number;
  category?: string;
  description?: string;
  dimensions?: string[];
  material?: string[];
  sizes?: string[];
}

const fetchProductById = async (productId: string): Promise<Product | null> => {
  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    name,
    price,
    image {
      asset -> {
        _id,
        url
      }
    },
    discountPercentage,
    category,
    description,
    dimensions,
    material,
    sizes
  }`;

  try {
    const product = await client.fetch(query, { id: productId });
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const updateProduct = async (productId: string, updatedData: Partial<Product>) => {
  try {
    const mutation = {
      _id: productId,
      _type: "product",
      ...updatedData,
    };

    await client.createOrReplace(mutation);
    return true; // Return true if the update was successful
  } catch (error) {
    console.error("Error updating product:", error);
    return false; // Return false if the update failed
  }
};

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: "",
    description: "",
    dimensions: [],
    material: [],
    sizes: [],
  });

  useEffect(() => {
    if (productId) {
      const getProduct = async () => {
        const fetchedProduct = await fetchProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setFormData({
            name: fetchedProduct.name,
            price: fetchedProduct.price,
            description: fetchedProduct.description || "",
            dimensions: fetchedProduct.dimensions || [],
            material: fetchedProduct.material || [],
            sizes: fetchedProduct.sizes || [],
          });
        }
      };

      getProduct();
    } else {
      console.error("Product ID not found in the URL");
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form data to be submitted:", formData);

    const isUpdated = await updateProduct(productId, formData);

    if (isUpdated) {
      router.push(`/product/${productId}`); // Redirect after success
    } else {
      console.error("Failed to update product");
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      {/* Sidebar */}
     <SideBar />

      {/* Main Content Area */}
        <div className=" md:ml-64 flex-1 p-8 bg-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start order-1">
            <Image
              src={product.image.asset.url}
              alt={product.name}
              className="object-contain rounded-[10px] mb-6 md:mb-0"
              width={300}
              height={300}
            />
            <div className="md:ml-20 w-full">
              <h2 className="font-poppins font-semibold text-[30px] leading-9 text-black mb-4">{product.name}</h2>

              <form onSubmit={handleSubmit} className="space-y-4 order-2">
                {/* Product Name */}
                <div>
                  <label className="font-poppins font-medium text-[16px] text-[#6e4b3b]" htmlFor="name">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="ml-2 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>

                {/* Product Price */}
                <div>
                  <label className="font-poppins font-medium text-[16px] text-[#6e4b3b]" htmlFor="price">
                    Price:
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price || ""}
                    onChange={handleChange}
                    className="ml-2 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>

                {/* Product Description */}
                <div>
                  <label className="font-poppins font-medium text-[16px] text-[#6e4b3b]" htmlFor="description">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    className="ml-2 p-2 border border-gray-300 rounded w-full"
                  />
                </div>

                {/* Dimensions */}
                <div>
                  <label className="font-poppins font-medium text-[16px] text-[#6e4b3b]" htmlFor="dimensions">
                    Select Dimensions:
                  </label>
                  <select
                    name="dimensions"
                    value={formData.dimensions?.[0] || ""}
                    onChange={handleChange}
                    className="ml-2 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="">Choose Dimension</option>
                    {product.dimensions?.map((dimension, index) => (
                      <option key={index} value={dimension}>
                        {dimension}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Material */}
                <div>
                  <label className="font-poppins font-medium text-[16px] text-[#6e4b3b]" htmlFor="material">
                    Select Material:
                  </label>
                  <select
                    name="material"
                    value={formData.material?.[0] || ""}
                    onChange={handleChange}
                    className="ml-2 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="">Choose Material</option>
                    {product.material?.map((material, index) => (
                      <option key={index} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size */}
                <div>
                  <label className="font-poppins font-medium text-[16px] text-[#6e4b3b]" htmlFor="sizes">
                    Select Size:
                  </label>
                  <select
                    name="sizes"
                    value={formData.sizes?.[0] || ""}
                    onChange={handleChange}
                    className="ml-2 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="">Choose Size</option>
                    {product.sizes?.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-300 to-teal-900 text-white p-2 rounded w-full"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;

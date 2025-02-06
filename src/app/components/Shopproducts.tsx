import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SideBar from "@/app/components/SideBar";
import { client } from "@/sanity/lib/client";
import { FaStar, FaPlus } from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  price: string;
  image: {
    asset: {
      _id: string; // Change 'any' to 'string'
      url: string;
    };
  };
  discountPercentage?: number;
  rating?: string;
  description?: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"] {
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
    rating,
    description
  }`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const deleteProduct = async (productId: string) => {
  try {
    await client.delete(productId);
    return productId;
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

const Shopproducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  // Handle delete functionality when delete button is clicked
  const handleDelete = async (productId: string) => {
    const deletedProductId = await deleteProduct(productId);
    if (deletedProductId) {
      setProducts(products.filter(product => product._id !== deletedProductId));
    }
  };

  return (
    <div className="overflow-hidden">
      <SideBar />
      <div className="p-8 grid md:grid-cols-4 grid-cols-1 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link href={`/product/${product._id}`} className="flex flex-col items-center md:items-start">
              <div className="relative w-[200px] h-[200px] mb-4">
                <Image
                  src={product.image.asset.url}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-semibold text-lg text-[#000000]">{product.name}</h3>
              <p className="font-medium text-[16px] text-[#000000]">{`Rs. ${product.price}`}</p>
              {product.discountPercentage && (
                <p className="text-sm text-[#FF5733]">Discount: {product.discountPercentage}%</p>
              )}
              {product.rating != null ? (
                <p className="text-sm text-[#8b5d42] flex items-center">
                  Rating: {product.rating} <FaStar color="#FFD700" size={14} className="ml-1" />
                </p>
              ) : (
                <p className="text-sm text-[#8b5d42] flex items-center">Rating: No rating</p>
              )}
              {product.description && (
                <p className="text-sm text-[#888] mt-2 text-center">{product.description}</p>
              )}
            </Link>
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(product._id)}
              className="mt-4 p-2 bg-red-500 text-white rounded-lg"
            >
              Delete Product
            </button>
          </div>
        ))}

        {/* Add Product button at the end */}
        <div className="flex justify-center mt-6">
          <Link href="/product/add-product">
            <button className="w-[200px] h-[200px] flex flex-col justify-center items-center bg-gradient-to-b from-gray-200 to-gray-50 text-gray-700">
              <FaPlus size={40} />
              <p className="mt-2 text-xl">Add Product</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shopproducts;

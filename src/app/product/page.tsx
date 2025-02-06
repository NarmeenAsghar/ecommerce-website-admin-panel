"use client";
import React, { useEffect, useState } from "react";
import Shopproducts from "@/app/components/Shopproducts";
import SideBar from "../components/SideBar";  // Sidebar import is kept

interface Product {
  _id: string;
  name: string;
  price: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  discountPercentage?: number;
  rating?: string;
  description?: string;
}

const ProductPage = () => {
  const [, setProducts] = useState<Product[]>([]); // Use Product[] instead of any[]

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products"); // Adjust this API based on your setup
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <SideBar />
      <div className="md:ml-64 p-8 font-sans bg-gradient-to-b from-gray-200 to-gray-50 text-gray-700">
        <h1 className="text-center font-bold text-[40px] mt-6 text-blue-600">
          Products
        </h1>
        <p className="text-center text-gray-600 mt-4 text-lg">
          Browse through our wide range of products. We offer top-quality items to
          meet your needs. From electronics to home goods, discover the best deals
          and find exactly what you`re looking for!
        </p>

        {/* Product Listings */}
        <div className="mt-8">
          {/* Pass the fetched products to Shopproducts */}
          <Shopproducts  />
        </div>
      </div>
    </>
  );
};

export default ProductPage;

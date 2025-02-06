"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import SideBar from "../components/SideBar";

// Interface for the data model
interface HeroData {
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  email: string;
  streetAddress: string;
  townCity: string;
  province: string;
  zipCode: string;
  paymentMethod: string;
  orderStatus: string;
  estimatedDeliveryDate: string;
}

const query = async (): Promise<HeroData[]> => {
  const res = await client.fetch(`
    *[_type == "checkout"]{
      firstName,
      lastName,
      companyName,
      phone,
      email,
      streetAddress,
      townCity,
      province,
      zipCode,
      paymentMethod,
      orderStatus,
      estimatedDeliveryDate,
    }
  `);
  return res; // Returning all records as an array
};

function Page() {
  const [data, setData] = useState<HeroData[]>([]); // Updated to an array

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await query();
      setData(fetchedData); // Store all fetched data
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="ml-64 w-full p-8">
        <h1 className="font-semibold text-3xl mt-8 text-blue-900 mb-8">
          Checkout Information
        </h1>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Order Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.firstName} {item.lastName}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.phone}</td>
                  <td className="px-4 py-2">{item.orderStatus}</td>
                  <td className="px-4 py-2 flex gap-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEye size={18} />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-700">
                      <FaEdit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (Optional) */}
        <div className="flex justify-center mt-6">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Previous
          </button>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 ml-4">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default Page;

import { NextResponse } from "next/server";

// Sanity client (use your own configuration here)
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "your-project-id", // Replace with your Sanity project ID
  dataset: "your-dataset-name", // Replace with your dataset name (e.g., 'production')
  useCdn: false, // Set to 'false' to ensure you are getting the latest data
});

// Function to handle the POST request to add a product
export async function POST(req: Request) {
  try {
    // Parse the request body
    const { name, details, price, priceWithoutDiscount, category, image } = await req.json();

    // Create a new product in Sanity
    const result = await client.create({
      _type: "product", // Make sure this matches the schema in Sanity
      name,
      details,
      price,
      priceWithoutDiscount,
      category,
      image, // This should be the image URL or reference you got from the image upload
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Error creating product." }, { status: 500 });
  }
}

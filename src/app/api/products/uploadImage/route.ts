// pages/api/products/uploadImage.ts

import { NextResponse } from 'next/server'; // Next.js v13 uses NextResponse
import { client } from '@/sanity/lib/client'; // Sanity client import
import formidable, { Fields, Files } from 'formidable'; // Correctly importing formidable and its types
import fs from 'fs'; // To read the file stream
import { IncomingMessage } from 'http'; // Import the IncomingMessage type for request

// API route configuration
export const runtime = 'nodejs'; // Node.js runtime

// POST request handler
export async function POST(request: Request) {
  try {
    // `formidable` instance to handle form parsing
    const form = new formidable.IncomingForm();

    // Parsing the request body using `formidable`
    const data = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      form.parse(request as unknown as IncomingMessage, (err, fields, files) => { // Using IncomingMessage for the request type
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Accessing the uploaded image file (assuming 'file' is the name of the input field)
    const imageFile = data.files.file?.[0]; // Use optional chaining to avoid errors if no file is uploaded

    if (!imageFile) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Read the file content (Sanity expects a file buffer, not just a path)
    const fileContent = fs.readFileSync(imageFile.filepath); // Read the file as a buffer

    // Upload the file to Sanity (using the correct asset type 'image' and the file buffer)
    const imageAsset = await client.assets.upload('image', fileContent);

    // Returning the uploaded image URL
    return NextResponse.json({ imageUrl: imageAsset.url }, { status: 200 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
  }
}

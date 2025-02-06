// pages/api/products/update.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const productData = req.body; // Extract product data from the request body

      const { name, details, price, priceWithoutDiscount, category, image } = productData;

      // Create a new product document in Sanity
      const product = await client.create({
        _type: 'product',
        name,
        details,
        price,
        priceWithoutDiscount,
        category,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: image, // The reference to the uploaded image
          },
        },
      });

      res.status(200).json({ message: 'Product added successfully', product });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Failed to add product' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;

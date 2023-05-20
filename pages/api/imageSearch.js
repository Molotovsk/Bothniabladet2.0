import cloudinary from '../../utils/cloudinary';
import prisma from '../../prisma';

export default async (req, res) => {
  if (req.method === 'GET') {
    // Fetch image information from Cloudinary
    const images = await cloudinary.api.resources();

    // Store image information in MongoDB using Prisma
    await Promise.all(
      images.resources.map(async (image) => {
        const existingImage = await prisma.image.findUnique({
          where: { public_id: image.public_id },
        });

        if (!existingImage) {
          await prisma.image.create({
            data: {
                created_at,
                width,
                height,
                asset_id,
                filename,
                tags: { set: tags },
                context,
                url,
              },
          });
        }
      })
    );

    res.status(200).json({ message: 'Images fetched and stored successfully' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

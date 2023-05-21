import prisma from '../../../utils/prisma';
import { syncImages } from './syncImages';

export async function bulkInsertImages() {
  try {
    const images = await syncImages();

    if (images.length === 0) {
      console.log('No images fetched');
      return;
    }

    const existingImageIds = await prisma.images.findMany({
      where: {
        asset_id: {
          in: images.map((image) => image.asset_id),
        },
      },
      select: {
        asset_id: true,
      },
    });

    const existingAssetIds = new Set(existingImageIds.map((image) => image.asset_id));

    // Restructure the images array to match the expected format
    const createImagesInput = images
      .filter((image) => !existingAssetIds.has(image.asset_id))
      .map((image) => ({
        created_at: image.created_at,
        width: image.width,
        height: image.height,
        asset_id: image.asset_id,
        filename: image.filename,
        url: image.url,
      }));

    // Store image information in the database using Prisma
    if (createImagesInput.length > 0) {
      const createImagesRes = await prisma.images.createMany({
        data: createImagesInput,
      });

      console.log('New images stored successfully:', createImagesRes);
    } else {
      console.log('No new images to store');
    }
  } catch (error) {
    console.error('Error occurred during bulk insertion:', error);
  }
}

// Call the function to initiate the bulk insertion
bulkInsertImages();
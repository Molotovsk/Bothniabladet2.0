import cloudinary from '../../../utils/cloudinary';



export async function syncImages() {
  try {
    // Fetch image information from Cloudinary
    const images = await cloudinary.v2.search
      .expression('')
      .with_field('context')
      .with_field('tags')
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute();

    console.log('Fetched images:', images);

    // Return the images for bulk insertion
    return images.resources.map((image) => {
      return {
        asset_id: image.asset_id,
        created_at: image.created_at,
        filename: image.filename,
        height: image.height,
        licens: null,
        price: null,
        updated_at: null,
        url: image.url,
        width: image.width,
      };
    });
  } catch (error) {
    console.error('Error occurred during fetching images:', error);
    return [];
  }
}
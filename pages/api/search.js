import prisma from '../../utils/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { query } = req.query;

  try {
    const fetchedImages = await prisma.image.findMany({
      where: {
        OR: [
          {
            description: {
              contains: query,
            },
          },
          {
            tags: {
              has: query,
            },
          },
        ],
      },
    });

    res.status(200).json(fetchedImages);
  } catch (error) {
    console.error('Error occurred during search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function performSearch(query = {}) {
  const paramString = query.expression.toString(); // Use the 'expression' property of the query object

  const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      expression: "",
      with_field: ['context', 'tags']
    }),
    method: 'POST'
  }).then(r => r.json());

  //console.log('Search results:', results);

  if (results.error) {
    throw new Error(results.error.message);
  }

  return results;
}

export function mapImageResources(resources) {
  if (!Array.isArray(resources)) {
    console.error('Invalid resources array');
    return [];
  }

  return resources.map(resource => {
    const { width, height, tags, context, public_id } = resource;
    const { alt, caption } = context || {};

    return {
      id: resource.asset_id,
      title: caption || public_id,
      image: resource.secure_url,
      width,
      height,
      tags,
      alt: alt || '',
      caption: caption || '',
    };
  });
}

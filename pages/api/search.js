export default async function handler(req, res) {
  const params = req.body; // No need to parse JSON since it's already in JSON format

  console.log('Received request with params:', params);

  try {
    const results = await performSearch(params);

    const filteredResults = results.resources.map((resource) => {
      const { public_id, created_at, width, height, asset_id, filename, tags, context, url } = resource;
      return {
        public_id,
        created_at,
        width,
        height,
        asset_id,
        filename,
        tags,
        context,
        url,
      };
    });

    console.log('Filtered results:', filteredResults);

    res.status(200).json({ resources: filteredResults });
  } catch (error) {
    console.error('Error occurred:', error);
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
      expression: paramString,
      with_field: ['context', 'tags']
    }),
    method: 'POST'
  }).then(r => r.json());

  if (results.error) {
    throw new Error(results.error.message);
  }

  return results;
}
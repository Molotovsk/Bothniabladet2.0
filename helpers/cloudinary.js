export async function search(options = {}) {
  const { expression, ...params } = options;

  const searchParams = {
    ...params,
    expression: expression || '',
  };

  if (options.nextCursor) {
    searchParams.next_cursor = options.nextCursor;
    delete searchParams.nextCursor;
  }

  const paramString = Object.keys(searchParams)
    .map(key => `${key}=${encodeURIComponent(searchParams[key])}`)
    .join('&');

  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET
        ).toString('base64')}`,
      },
    }
  ).then(r => r.json());

  return results;
}

export function mapImageResources(resources) {
  return resources.map(resource => {
    const { width, height } = resource;
    return {
      id: resource.asset_id,
      title: resource.public_id,
      image: resource.secure_url,
      width,
      height,
    };
  });
}

export async function getFolders(options = {}) {
  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/folders`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET
      ).toString('base64')}`,
    },
  }).then(r => r.json());

  return response;
}

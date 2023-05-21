import { config } from 'pages/config';

export async function search(query = {}) {

  const paramString = query;

  const results = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudiary.CLOUD_NAME}/resources/search/`, {
    headers: {
      Authorization: `Basic ${Buffer.from(config.cloudiary.API_KEY + ':' + config.cloudiary.API_SECRET).toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "expression": "",
      "with_field": [
        "context",
        "tags"
      ]
    }),
    method: 'POST'
  }).then(r => r.json());
  console.log.r;
  console.log.results;
  return results;

  
}


export function mapImageResources(resources) {
  if (!Array.isArray(resources)) {
    console.error('Invalid resources array');
    return [];
  }

  return resources.map(resource => {
    const { width, height, tags, context, public_id } = resource;
    const { alt, caption, price, photograph_name, license } = context || {}; // Provide a default empty object if context is undefined

    return {
      id: resource.asset_id,
      title: caption || public_id,
      image: resource.secure_url,
      width,
      height,
      tags,
      alt: alt || '', // Provide a default value for alt if it is undefined
      caption: caption || '', // Add the caption parameter
      photograph_name: photograph_name || '',
      price: price || '', // Add the price parameter
      license: license || '', // Add the price parameter
    };
  });
}




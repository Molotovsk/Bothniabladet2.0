import { search } from '../../helpers/cloudinary';

export default async function handler(req, res) {
  const params = JSON.parse(req.body);

  console.log('Received request with params:', params);

  try {
    const results = await search(params);

    console.log('Search results:', results);

    res.status(200).json({ ...results });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedImages = async () => {
  try {
    const images = [
      {
        asset_id: '6a0197e636e84af95d967d1b6240cbb6',
        context: ['alt', 'caption', 'uploadDate'],
        created_at: new Date('2023-05-18T06:31:42+00:00'),
        filename: 'Sadball_wqsvos',
        height: 660,
        licens: '100', // Add appropriate licens value
        price: '420', // Add appropriate price value
        tags: ['groda', 'ledsen'],
        updated_at: new Date('2023-05-18T06:31:42+00:00'),
        url: 'https://res.cloudinary.com/dmhozrlru/image/upload/v1684391502/Sadball_wqsvos.jpg',
        width: 660,
      },
      {
        asset_id: 'fabd5ab2389311b3683ffcbd3d426e07',
        context: ['alt', 'caption', 'uploadDate'],
        created_at: new Date('2023-05-16T19:55:10+00:00'),
        filename: 'Angryfrog_n5qdy1',
        height: 416,
        licens: '69', // Add appropriate licens value
        price: '699', // Add appropriate price value
        tags: ['Groda', 'svartvit'],
        updated_at: new Date('2023-05-16T19:55:10+00:00'),
        url: 'https://res.cloudinary.com/dmhozrlru/image/upload/v1684266910/Angryfrog_n5qdy1.jpg',
        width: 625,
      },
    ];

    for (const image of images) {
      await prisma.images.create({
        data: image,
      });
    }

    console.log('Images seeded successfully!');
  } catch (error) {
    console.error('Error occurred during image seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedImages();

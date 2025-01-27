type SIZES = 'small' | 'medium' | 'large';

const CNY_CLOUD_NAME = process.env.NEXT_PUBLIC_CNY_CLOUD_NAME;
const CNY_CODE = process.env.NEXT_PUBLIC_CNY_CODE;

export const getImageRecipe = (name: string, size: SIZES) => {
	// console.log(size)
	return `https://res.cloudinary.com/${CNY_CLOUD_NAME}/image/upload/${CNY_CODE}/thumbnails/${size}/${name}.webp`;
};

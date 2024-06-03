import getCroppedImg from './crop';

export default async function getSavedCrop(src: string, fileName: string) {
	const crops = JSON.parse(localStorage.getItem('crops') || '{}');

	if (crops[fileName]) {
		const { x, y, width, height } = crops[fileName];
		return await getCroppedImg(src, { x, y, width, height });
	}

	return src;
}

export async function saveCrop(
	fileName: string,
	crop: { x: number; y: number; width: number; height: number }
) {
	const crops = JSON.parse(localStorage.getItem('crops') || '{}');
	crops[fileName] = crop;

	localStorage.setItem('crops', JSON.stringify(crops));
}

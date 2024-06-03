export default async function getCroppedImg(
	imageSrc: string,
	pixelCrop: { width: number; height: number; x: number; y: number }
) {
	const image = new Image();
	image.src = imageSrc;

	await new Promise((resolve) => {
		image.onload = resolve;
	});

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		return null;
	}

	// set canvas size to match the bounding box
	canvas.width = image.width;
	canvas.height = image.height;

	// Draw the image
	ctx.drawImage(image, 0, 0, image.width, image.height);

	const croppedCanvas = document.createElement('canvas');

	const croppedCtx = croppedCanvas.getContext('2d');

	if (!croppedCtx) {
		return null;
	}

	// Set the size of the cropped canvas
	croppedCanvas.width = pixelCrop.width;
	croppedCanvas.height = pixelCrop.height;

	// Draw the cropped image onto the new canvas
	croppedCtx.drawImage(
		canvas,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	);

	// As a blob
	return new Promise<string | null>((resolve, reject) => {
		croppedCanvas.toBlob((file) => {
			if (!file) {
				reject(new Error('File is null'));
				return;
			}
			resolve(URL.createObjectURL(file!));
		});
	});
}

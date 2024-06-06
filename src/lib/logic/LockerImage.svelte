<script lang="ts">
	import getCroppedImg from '$lib/logic/crop';
	import getSavedCrop, { saveCrop } from '$lib/logic/save';
	import Cropper from 'svelte-easy-crop';
	import IconCrop from '~icons/carbon/crop';

	export let src: string;
	export let filename: string;

	let workingSrc = '';

	let isHovered = false;
	let isCropping = false;

	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let cropResult = { x: 0, y: 0, width: 0, height: 0 };

	const handleCropComplete = async (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			console.log('Cropped');

			// use canvas to resize the image.
			try {
				const result = await getCroppedImg(src, cropResult);
				await saveCrop(filename, cropResult);
				if (result) {
					workingSrc = result;
				}
			} catch (error) {
				console.error(error);
			}

			isCropping = false;

			console.log(src);
		}

		window.onkeydown = null;
	};

	const handleStartCrop = () => {
		console.log('Start cropping');
		isCropping = true;
		window.onkeydown = handleCropComplete;
	};

	let aspect = 1;

	// preserve aspect ratio
	const originalImg = new Image();
	originalImg.src = src;

	originalImg.onload = () => {
		aspect = originalImg.width / originalImg.height;
	};

	// get saved crop
	getSavedCrop(src, filename).then((savedCrop) => {
		if (savedCrop) {
			workingSrc = savedCrop;
		}
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="relative m-1 mb-2 mt-0"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	title={filename}
>
	<img src={workingSrc} alt="" class="w-full" />
	{#if isHovered && !isCropping}
		<div class="absolute top-0 p-1">
			<button
				class="rounded-full border border-white/10 bg-black/70 p-2 text-white hover:bg-neutral-700"
				on:click={handleStartCrop}
			>
				<IconCrop />
			</button>
		</div>
	{/if}

	{#if isCropping}
		<Cropper
			image={src}
			bind:crop
			bind:zoom
			{aspect}
			on:cropcomplete={(e) => (cropResult = e.detail.pixels)}
		/>
	{/if}
</div>

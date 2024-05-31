<script lang="ts">
	import LockerImage from '$lib/components/LockerImage.svelte';

	let fileInput: HTMLInputElement;

	let images: string[] = [];

	const handleFiles = () => {
		if (!fileInput.files) return;
		const imageFiles = Array.from(fileInput.files);
		images = imageFiles.map((file) => URL.createObjectURL(file));

		console.log(images);
	};
</script>

<input type="file" accept="image/*" multiple bind:this={fileInput} on:change={handleFiles} />

<div class="columns-4 gap-0">
	{#each images as image}
		<LockerImage src={image} />
	{/each}
</div>

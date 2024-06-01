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

{#if images.length == 0}
	<div class="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
		<h1 class="text-8xl font-bold text-orange-400">Locker Formatter</h1>
		<input type="file" accept="image/*" multiple bind:this={fileInput} on:change={handleFiles} />
	</div>
{/if}

<div class="columns-4 gap-0">
	{#each images as image}
		<LockerImage src={image} />
	{/each}
</div>

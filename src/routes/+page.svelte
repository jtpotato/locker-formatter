<script lang="ts">
	import type { FormInputEvent } from '$lib/components/ui/input';
	import Input from '$lib/components/ui/input/input.svelte';
	import LockerImage from '$lib/logic/LockerImage.svelte';

	let fileInput: HTMLInputElement;

	let images: Array<Array<string>> = [];

	const handleFiles = (e: FormInputEvent) => {
		let fileInput = e.target as HTMLInputElement;
		if (!fileInput.files) return;
		const imageFiles = Array.from(fileInput.files);
		images = imageFiles.map((file) => [URL.createObjectURL(file), file.name]);

		// console.log(images);
	};
</script>

<title>Locker Formatter</title>

{#if images.length == 0}
	<div class="flex min-h-screen flex-col items-center justify-center">
		<h1 class="text-magenta-400 mb-16 w-full py-2 text-center text-8xl font-bold text-fuchsia-900">
			Locker Formatter
		</h1>
		<div class="max-w-2xl">
			<Input type="file" accept="image/*" multiple on:change={handleFiles} />
		</div>
	</div>
	<div class="p-4 px-8 opacity-50">
		<p>Made with ❤️ and 🧋 - Joel Tan</p>
	</div>
{/if}

<div class="columns-4 gap-0 p-1">
	{#each images as image}
		<LockerImage src={image[0]} filename={image[1]} />
	{/each}
</div>

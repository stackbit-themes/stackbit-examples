<script context="module">
    export async function load({ url }) {
        return {
            props: {
                currentUrl: url.pathname,
            },
        };
    }
</script>

<script>
    import { invalidate } from "$app/navigation";
    export let currentUrl;

	function onContentChange(event) {
        invalidate(`${currentUrl}.json`);
        console.log("Content update - invalidating current page");
	}
</script>

<svelte:window on:stackbitObjectsChanged|preventDefault={onContentChange}/>

<slot />

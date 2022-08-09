<script context="module">
    import { goto } from '$app/navigation';
    export async function load({ fetch, params }) {
        const url = `/${params.slug}.json`;
        const res = await fetch(url);
        if (res.ok) {
            const { blog } = await res.json();

            return {
                props: {
                    blog,
                    gotoFn: goto,
                },
            };
        }

        return {
            status: res.status,
            error: new Error(`Could not load ${url}`),
        };
    }
</script>

<script>
    import RichContent from "$lib/components/RichContent.svelte";
    export let gotoFn;
    export let blog;
</script>

<div class="container" data-sb-object-id={blog?.sys?.id}>
    <button on:click={gotoFn('/')}>Back</button>
    <h1 class="title" data-sb-field-path="title">{blog?.fields?.title ?? ""}</h1>
    {#if blog?.fields?.content}
        <RichContent fieldPath="content" richContent={blog.fields.content} />
    {/if}
</div>

<style>
    .container {
        width: 1024px;
        margin: 0 auto;
    }

    .title {
        text-align: center;
    }
</style>

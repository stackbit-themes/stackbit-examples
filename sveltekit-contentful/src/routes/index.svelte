<script context="module">
    export async function load({ fetch }) {
        const [{ blogs }] = await Promise.all([
            fetch("/data.json").then((r) => r.json()),
        ]);
        return {
            props: {
                blogs,
            },
        };
    }
</script>

<script>
    import { base } from "$app/paths";
    export let blogs;
</script>

<div class="container">
    <h1 class="title">Posts</h1>
    <div class="posts">
        {#each blogs.items as blog}
            <a href={`${base}/${blog.fields?.slug}`} class="post-item">
                    <p class="post-title">{blog.fields?.title}</p>

                    {#if blog.fields?.excerpt}
                        <p class="excerpt">{blog.fields.excerpt}</p>
                    {/if}
            </a>
        {/each}
    </div>
</div>

<style>
    .container {
        width: 1024px;
        margin: 0 auto;
    }

    .title {
        text-align: center;
    }

    .posts {
        display: flex;
        flex-wrap: wrap;
        gap: 3em;
    }

    .post-item {
        box-sizing: border-box;
        flex: 0 0 30%;
        padding: 12px;
        border-radius: 8px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        transition: 0.3s;
        text-decoration: none;
        color: #000;
    }

    .post-item:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    .post-title {
        display: block;
        margin: 8px 0;

        font-size: 1.2em;
        font-weight: bold;
    }

    .excerpt {
        margin: 0;
    }
</style>

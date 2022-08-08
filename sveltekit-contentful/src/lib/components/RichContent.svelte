<script>
    import { marked } from 'marked';
    export let richContent = '';
    export let fieldPath = '';
    const renderer = new marked.Renderer();
    $: pageContent = marked(richContent, { renderer });
</script>

<div data-sb-field-path={fieldPath}>{@html pageContent}</div>
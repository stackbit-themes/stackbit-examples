[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/drkstr101/minimal-contentful-theme)

# [minimal-contentful-theme](https://github.com/drkstr101/minimal-contentful-theme)

Begin a new Stackbit project or learn to add Stackbit to an existing site.

## Getting Started

Get up and running quickly by running the following command:

```txt
npx create-stackbit-app [project-name]
```

Then change into `[project-name]` directory (default: `my-stackbit-site`) and start the Next.js dev server and Stackbit local dev in separate terminal tabs/windows.

```txt
cd [project-name]
npm run dev

# in a separate tab/window
npm run stackbit-dev
```

## Learn the Basics

Follow the [getting started tutorial](https://docs.stackbit.com/getting-started/) while running this project locally to get a feel for how Stackbit works.

Or jump to individual topics [in the docs](https://docs.stackbit.com/).

## Support & Feedback

[Join us on Discord](https://discord.gg/HUNhjVkznH) for community support and to provide feedback to us.

## NOTES

### 1. `hot-content-reload` vs `with-remote-data-updates`

What is the difference between `sourcebit-target-next/hot-content-reload` and `sourcebit-target-next/with-remote-data-updates`.

The former is used in `create-stackbit-app`, while the latter is the form used by the docs. They both appear to do the same thing from a quick glance at the source.

The only reference to `hot-content-reload` is a brief mention in [the troubleshooting guide](https://docs.stackbit.com/troubleshooting/page-doesnt-refresh/).

It was not clear from the documentation which is the preferred method. Could we maybe merge these use cases? It seems confusing to me to have one method for git, and another for api (I'm assuming that was the intended difference between them).

---

### 2. Annotations usage with frontmatter

Why does `FlexiblePage` from `create-stackbit-app` not use [nested object notation](https://docs.stackbit.com/reference/annotations/data-sb-field-path/#annotating_nested_objects) for fields defined in frontmatter? And how is it that when I flatten the frontmatter, the page still works without modification (IE. where specifically can I find the code that infers this automatically)?

```tsx
    // console.log({ page, site });
    return (
        <div className="page">
            <Head>
                <title>{page.frontmatter.title}</title>
            </Head>
            <div {...toObjectId(page.__metadata.id)}>
                {page.frontmatter.sections && (
                    <div {...toFieldPath('sections')}>
                        {page.frontmatter.sections.map((section, index) => (
                            <DynamicComponent key={index} {...section} {...toFieldPath(`.${index}`)} />
                        ))}
                    </div>
                )}
            </div>
            <Footer {...site.footer} />
        </div>
    );
};
```

According to the docs it should be `toFieldPath('frontmatter.sections')`, but this seems to not matter.

#### 2.1 Contentful source breaks local dev

And why does switching to the exact same model, but loaded from contentful, not work at all in stackbit local dev:

```
error: AnnotationError: Field path starts with accessor (.) but parent field path not found (/html/body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/a[1])
error: AnnotationError: Field path starts with accessor (.) but parent field path not found (/html/body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/a[1]/h3[1])
error: AnnotationError: Field path starts with accessor (.) but parent field path not found (/html/body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/a[1]/span[1])
error: AnnotationError: Field path starts with accessor (.) but parent field path not found (/html/body[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/a[2])
//...
```

See <https://github.com/drkstr101/minimal-contentful-theme/pull/1/files> for a comparison of changes.

---

### 3. `models` vs `contentModels`

What is the difference between the `contentModels` (documented) and `models` (undocumented) field in `stackbit.yaml`

```yml
contentModels:
    Page:
        isPage: true
        urlPath: '/{slug}'
```

vs

```yml
models:
    Page:
        type: page
        urlPath: '/{slug}'
```

The former only works with git, while the later only seems to work with api (EG contentful).

### 4. `@stackbit/cms-contentful`

I see this is added as a dependency to our existing contentful theme, but there is no mention in the docs about what this is or why/when it would be needed.

---

### 5. `sourcebit-source-filesystem` improvements

Would it be reasonable at this point to propose a breaking change to `sourcebit-source-filesystem` that flattens frontmatter by default (unless maybe specified in options), and also includes the resolved model name in `__metadata.modelName`? Automatically providing a `__metadata.urlPath` based on standard algo, perhaps configurable in options, would be another big win for code-reuse IMHO.

_This would eliminate the need for magic fields polluting the domain model (IE `layout`, `type`, `slug`, etc.), and greatly improve code reuse across different model sources. Code resuse is pretty much impossible between sources as it stands now, without additional code to massage the data back into what one would expect for their own user-defined domain model._

---

### 6. Data dedupe in nextjs cache

Should we make an attempt to dedupe the page models from `sourcebit-target-nextjs`, which are currently listed both in the `objects` bucket and again in the `pages`? Or perhaps reference the page data by ID rather than copy all the fields? note: This only applies when `sourcebit-target-nextjs` has correctly defined its pages in the options.

_This is not super important, but I could see it maybe having a small impact on performance for large(ish) sites. Although, it probably doesn't even matter since the only thing sent across the wire is that which is returned by `getStaticProps`..._

---

### 7. Sourcebit deprecation

What gives with the ominous message in the docs that sourcebit will soon be deprecated? Would this be for the upcoming `contentlayer`, or is there something like a complete rewrite in the pipeline?

I hope my week long deep-dive into sourcebit was not in vain!

## References

1. [Notes: adding Contentful to existing project (w/local dev)](https://www.notion.so/stackbit/Notes-adding-Contentful-to-existing-project-w-local-dev-WIP-173eab6a77d2403fa396c30f2cb2b8b0#f49ed497d33f491aa4913c8c908f597c) (I found many of these same issues had already been documented, but without any apparent resolution)
2. [Comparison of changes for contentful source](https://github.com/drkstr101/minimal-contentful-theme/pull/1/files)

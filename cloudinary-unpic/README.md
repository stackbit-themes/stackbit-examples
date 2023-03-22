# Responsive Gallery

A React-based masonry-grid (a.k.a *Pinterest-style) image gallery that uses [unpic-img](https://github.com/ascorbic/unpic-img) for image tag generation and
[Cloudinary](https://cloudinary.com/) as the image CDN. Images are fetched in
the appropriate size and served in the best file format for your browser
(e.g.  AVIF for Chrome, WebP for Safari).

The site is statically generated with [Next.js](https://nextjs.org/) and
*visually editable* via [Stackbit.](https://www.stackbit.com/)

In all browsers that support querying to the size of downloaded resources via the [PerformanceResourceTiming API](https://caniuse.com/mdn-api_performanceresourcetiming_encodedbodysize), the size of the image actually delivered vs. its original size are overlaid on each image.

To see how the browser picks the appropriate image size, make the browser window narrow
and load this site in a new tab. Then, gradually make the window wider.

## Run locally

### Start the website

Run:

```shell
git clone git@github.com:stackbit-themes/stackbit-examples.git
cd stackbit-examples/cloudinary-unpic
npm i
npm run dev
```

### Edit with Stackbit & Cloudinary

1. Create a free Cloudinary account. Note the _cloud name_ and API key in the Cloudinary dashboard.
1. Install the Stackbit command-line tool: `npm i -g @stackbit/cli@latest`.
1. In a new terminal window, navigate to the same directory as above and run:

```shell
stackbit dev --cloudinary-cloud-name <your cloud name> --cloudinary-api-key <your key>
```

Click on the link to open Stackbit in your browser. If this is your first time using Stackbit, you will be prompted to create a free account.

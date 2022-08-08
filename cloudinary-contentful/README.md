# Stackbit + Cloudinary Example

[![Netlify Status](https://api.netlify.com/api/v1/badges/966bc45a-4c7b-471f-9273-ac06c7215795/deploy-status)](https://app.netlify.com/sites/cloudinary-example-7e297/deploys)

**Live demo:** https://cloudinary-example.stackbit.app/ <br/>
*(but seriously, run it locally with the Stackbit editor to get the editing experience)*

## Overview

Stackbit supports inserting images from [Cloudinary](https://cloudinary.com/) with all supported content sources, i.e. currently Git, Contentful and Sanity.

This feature is available in [paid plans](https://www.stackbit.com/pricing/) only, however you're free to test-drive it in [local development](https://docs.stackbit.com/how-to-guides/local-development/).

Beyond selecting images, the power of Stackbit lies in enabling developers build visually-editable components tailored for your content editor's needs. The purpose of this example project is to showcase two such components: 

1. An **image gallery** which is optimized to the device width and resolution and loads images in the relevant size only. Editors can preview different resizing options.
2. An **image with thumbnails** component showing multiple options for scaling an image into a square thumbnail.

## Getting Started

1. Clone this repository.
2. Run:
```
npm install
```
3. Run Next.js in dev mode: 
```
npm run dev
```
4. The site will run at http://localhost:3000. 
    1. Explore how the file size of displayed images changes as you resize the browser, or when you use the its Dev Tools to simulate mobile devices.
    2. If you switch to smaller widths/pixel density, reload the page - when the browser already has high-resolution images available, it won't download smaller ones (but it works automatically in the other direction!)
6. Install Stackbit's command line tools:
    1. Run `npm i -g @stackbit/cli@latest` (once).
    1. Note: you need veresion 0.2.19+ to use the Cloudinary integration locally.
7. Run:
```
stackbit dev --cloudinary-cloud-name <cloudinary cloud name> --cloudinary-api-key <api key>
```
8. Click the displayed link to open the Stackbit editor, connected to your local server.

**Note:** <br/>If you don't pass these arguments, you will be able to view the website but not choose Cloudinary images in the UI.

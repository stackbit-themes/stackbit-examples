# A New Stackbit Project

Welcome to your new project created with Stackbit!

Here are a few useful tips & links:

## Set up

1. If you haven't yet transferred this project to your GitHub account, click on the **Gear** icon in the visual editor to open **Project Settings** and start the transfer. [Learn More](https://docs.stackbit.com/how-to-guides/transfer-repo/).
1. Once the repository is in your account, the Project Settings window will show you the commands to run for setting up your local environment. [Learn More](https://docs.stackbit.com/how-to-guides/local-development/).

## Develop with Stackbit Locally
To spin up local dev, run:
1. In terminal 1:\
    1. `git clone`
    2. `npm install`
    3. Add the Contentful tokens to the `.env` file (see `.env.example` for reference)
    4. `npm run dev`

2. In terminal 2:\
`sudo npm i -g @stackbit/cli@latest`
```
stackbit dev \
    -c contentful \
    --contentful-space-id <space_id> \
    --contentful-preview-token <preview_token> \
    --contentful-access-token <access_token>
```

## Learn the basics

1. It's a good idea to go through our [Getting Started tutorial](https://docs.stackbit.com/getting-started/). It will give you a small taste of component development as well, and links for further reading.
1. To go deeper into how things work, head to the [Conceptual Guides](https://docs.stackbit.com/conceptual-guides/).
1. For more concise, practical information see the [How-to Guides](https://docs.stackbit.com/how-to-guides/).

## Get answers

[Join us on Discord](https://discord.gg/HUNhjVkznH) for community support.

## Building for production 🏗

To build a static site for production, run the following command

```shell
npm run build
```

The generated site will be written to the `out` folder. The contents of this folder can be deployed by a serverless deployment platform such as [Netlify](https://www.netlify.com). You can start a local server serving the static files from the `out` folder, for example, by installing and running `http-server`:

```shell
npm install http-server -g
http-server out
```

## Contributing 🙏

To contribute to this theme, please follow the following steps:

1. Clone this repository locally

2. Create a new Space in Contentful

3. Create new Contentful Personal Access Tokens [here](https://app.contentful.com/account/profile/cma_tokens/)

4. Install dependencies

   ```shell
   npm install
   ```

5. Import the Contentful data stored in the `contentful/export.json` file to the new space by running the following command. Replace the `<management_token>` with your Personal Access Token and the `<space_id>` with the new space ID.

   ```shell
   ./contentful/import.js <management_token> <space_id>
   ```

6. Create "**Content Preview API - Access Token**" for the new space via Contentful app "Settings" => "API Keys" => "Content delivery / preview tokens" => "Add API Key".

7. Define the following environment variables to allow Next.js to fetch the content from Contentful when developing or building the site. Replace the `{SPACE_ID}` with your Space ID and the `{CPA}` with the new **Content Preview API - Access Token**.

   ```shell
   export CONTENTFUL_SPACE_ID={SPACE_ID}
   export CONTENTFUL_PREVIEW_TOKEN={CPA}
   ```

8. Lastly, run the Next.js development server:

   ```shell
   npm run dev
   ```

   Navigate to [http://localhost:3000](http://localhost:3000) to see the site.

9. Now you can update site code, and the content in Contentful. The browser will automatically live-update your changes.

10. Once you finish updating the code and contents, export the contents back to the `contentful/export.json` file by running the following command. Replace the `<management_token>` with your Personal Access Token and the `<space_id>` with the new space ID.

    ```shell
    ./contentful/export.js <management_token> <space_id>
    ```

11. Commit, push and submit a pull-request 🎉


## Learn More 📚

To learn more about Stackbit, take a look at the following resources:

- [Stackbit Documentation](https://docs.stackbit.com)
- Configure your theme using [stackbit.yaml](https://docs.stackbit.com/reference/stackbit-yaml/)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Contentful, take a look at the following resources:

- [Contentful Docs](https://www.contentful.com/developers/docs/)
- [Importing and exporting content with the Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/)

To learn more about Netlify, take a look at the following resources:

- [Netlify Docs](https://docs.netlify.com/)

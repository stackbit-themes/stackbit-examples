# stackbit-typist

This package provides **TypistSection**, a Stackbit component for typing animation based on [react-typist](https://www.npmjs.com/package/react-typist). The animation is optionally rendered inside a terminal window-like element (adopted from [Simple Terminal](https://tailwindcomponents.com/component/terminal)).

https://user-images.githubusercontent.com/2673881/146737487-d5b9efb6-1345-4656-a28b-4c8012fe3d69.mp4

The component isn't meant to be a extensive solution. Use as-is or extend to your needs!

## Setup

### 1. Installing the package

**If developing your Stackbit project locally, run:**

```shell
npm install stackbit-typist
```

When you push these changes to the `preview` branch, the visual editor should automatically install the package on the preview server and restart it. This can take several minutes.

**If working with the online code editor:**

Add the dependency inside `package.json`: under `dependencies` add the line `"stackbit-typist": "^1.0.0"` and save the file. The visual editor will restart.

### 2. Loading models

The `models` directory in this package contains model definitions used by the component. To load these in your project, open the file `stackbit.yaml` in your project's root dir, and locate the `modelsSource` property.

Add the relative path `node_modules/stackbit-typist/models` to `modelDirs`. Here's how this property should now look like:

```yaml
# In stackbit.yaml...
modelsSource:
  type: files
  modelDirs:
    - node_modules/stackbit-typist/models
    - .stackbit/models
```

### 3. Registering components

Open the file `src/components/components-registry.js` in your project (assuming the project is based on one of our themes). Locate the `components` object.

Add the following line to to the `components` object:

```js
const components = {
    'TypistSection': dynamic(() => import('../../node_modules/stackbit-typist')), // Added line
    // ... rest of object
```

This will map the model name `TypistSection` to the React functional component. The component is actually loaded by Next.js only if and when it's used.

### 4. Instruct Tailwind to generate needed classes

Open the file `tailwind.config.js` in your project.

Locate the array `purge.content` inside the `module.exports` object, and add this value to the array:
`'./node_modules/stackbit-typist/dist/components/**/*.js'`.

Here's how the code should look like:

```js
// ...
module.exports = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.{js,ts,jsx,tsx}',
                  './content/**/*',
                  './node_modules/stackbit-typist/dist/components/**/*.js'], // This item added now
        // ...
```

### 5. Adding the CSS file (optional)

To add a blinking cursor effect to the animation, react-typist provides a vanilla CSS file.

Since Next.js only allows loading global CSS files from the App module. To enabled this effect, add the following import to your `src/pages/_app.js` file:

```js
import 'stackbit-typist/dist/Typist.css';
```

## Using the component

Now, head over to the visual editor and add you should be able to add the new **Typist** component to your pages - anywhere adding sections is allowed.

You can now add items to the elements field, change styles, etc. On any change to the content, the animation will start over to reflect the change.

Note that since the animation can comprise of several text lines, it's best to set a fixed height to the component using the `Fixed Height` field.

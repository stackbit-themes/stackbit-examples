# stackbit-countdown

This package provides **CountdownSection**, a Stackbit component for counting down to a specified date & time.

While the date to count down to is persisted in the CMS, the countdown is only rendered on the client side. **Note the use of `useEffect` in the component's code to detect when running in the client side** (`useEffect` is not called when Next.js performs SSG or SSR).

This component uses [Countdown.js](https://github.com/mckamey/countdownjs) for an intuitive count - this is trickier than you'd think! The component isn't meant to be a extensive solution. It currently does not handle different timezones. Use as-is or extend to your needs.

## Setup

### 1. Installing the package

**If developing your Stackbit project locally, run:**

```shell
npm install stackbit-countdown
```

When you push these changes to the `preview` branch, the visual editor should automatically install the package on the preview server and restart it. This can take several minutes. 

**If working with the online code editor:**

Add the dependency inside `package.json`: under `dependencies` add the line `"stackbit-countdown": "^1.0.0"` and save the file. The visual editor will restart.

### 2. Loading models

The `models` directory in this package contains model definitions used by the component. To load these in your project, open the file `stackbit.yaml` in your project's root dir, and locate the `modelsSource` property.

Add the relative path `node_modules/stackbit-countdown/models` to `modelDirs`. Here's how this property should now look like:

```yaml
# In stackbit.yaml...
modelsSource:
  type: files
  modelDirs:
    - node_modules/stackbit-countdown/models
    - .stackbit/models
```

### 3. Registering components

Open the file `src/components/components-registry.js` in your project (assuming the project is based on one of our themes). Locate the `components` object. 

Add the following line to to the `components` object:
```js
const components = {
    'CountdownSection': dynamic(() => import('../../node_modules/stackbit-countdown')), // Added line
    // ... rest of object
```

This will map the model name `CountdownSection` to the React functional component. The component is actually loaded by Next.js only if and when it's used.

### 4. Instruct Tailwind to generate needed classes

Open the file `tailwind.config.js` in your project.

Locate the array `purge.content` inside the `module.exports` object, and add this value to the array:
`'./node_modules/stackbit-countdown/dist/components/**/*.js'`. 

Here's how the code should look like:

```js
// ...
module.exports = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.{js,ts,jsx,tsx}', 
                  './content/**/*', 
                  './node_modules/stackbit-countdown/dist/components/**/*.js'], // This item added now
        // ...
```

## Using the component

Now, head over to the visual editor and add you should be able to add the new __Countdown__ component to your pages - anywhere adding sections is allowed. Set the field `End date` to start the countdown.


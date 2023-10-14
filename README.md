McFly - Back to the Basics. Into the Future.
---

McFly is a framework that grows with you.

Start at the very basic of writing HTML files and enhance with standard web technologies or go advanced as you like, at your own pace.

It will never get in the way between you and the web platform.

- HTML pages
- Server-Side Rendering logic
- Custom Elements
- REST APIs
- Deployment Anywhere

...all in the same project.


## Ambitious Goals
We want a way to:
1. create web apps with vanilla custom elements
1. write real .HTML files
1. no frameworks or reactivity libraries on the browser
1. server-side pre-rendering
1. control on when and where JS is downloaded for interactive elements

## Special directories
**1. `src/pages`**
- file based routing for `.html` files
- directly use custom elements (no registry maintenance needed)
- use `<script server:setup>` to define logic that runs on the server, which then gets stripped away

**2. `src/components`**
- custom element constructor class files go here (only `.js` files for now)
- all components are automatically registered using their file names (e.g., a `hello-world.js` component can be used as `<hello-world>` element)

## Setting up

Do the following steps to get you started:

1. clone project and go into the directory
```
git clone https://github.com/ayoayco/mcfly.git
```
```
cd mcfly
```

2. install deps
```
npm i
```

3. run the dev server
```
npm run dev
```

4. open the browser to `https://localhost:3000` (or what the dev server said)

## McFly config

To tell McFly you want to use components, pass the mode (only `"js"` for now) to the `components` prop mcfly.config.ts

```js
import defineConfig from "./packages/define-config";

export default defineConfig({
  components: "js",
});

```


## More info
At the moment, this is a Proof of Concept and testing ground for using [Nitro](https://nitro.unjs.io) and vanilla JS custom elements using a minimal [Web Component Base](https://ayco.io/n/web-component-base) class.

This project was generated from Nitro starter guide. Look at the [Nitro documentation](https://nitro.unjs.io/) to learn more.


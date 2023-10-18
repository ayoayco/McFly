![rick_morty_PNG10-min 2](https://github.com/ayoayco/McFly/assets/4262489/719a51c6-4858-4e3c-9856-c5af0e9be1bd)

# McFly - Back to the Basics. Into the Future.
**McFly** is a full-stack no-framework framework that assists developers in leveraging the web platform.

- HTML pages
- Server-Side Rendering
- Custom Elements
- REST APIs
- Deploy Anywhere

## Project Goals
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
- the idea is, if it is a valid custom element constructor, just throw it in the `components` directory and it will work... vanilla, Lit, Stencil, or our own totally optional [Base Class](https://ayco.io/n/web-component-base) -- your choice!

## Setting up

It's still very early in the project development and we have no packages published yet.

You can, however, experience the framework by cloning the project and play with the example files in the [special directories](#special-directories). 

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
This framework is a result of [an exploration](https://social.ayco.io/@ayo/111195315785886977) for using [**Nitro**](https://nitro.unjs.io) and vanilla JS custom elements using a minimal [**Web Component Base**](https://ayco.io/n/web-component-base) class.

**Nitro** is the same production-grade web server powering [**Nuxt**](https://nuxt.com/)

---
*Just keep building*<br />
*A project by [Ayo Ayco](https://ayco.io)*

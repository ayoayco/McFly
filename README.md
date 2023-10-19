<p align="center">
  <img width="250" src="https://github.com/ayoayco/McFly/assets/4262489/719a51c6-4858-4e3c-9856-c5af0e9be1bd" alt="rRick & Morty cartoon" />
</p>

<h1 align="center">McFly</h1>

<p align="center"><strong>McFly</strong> is a full-stack no-framework framework<br />that assists developers in leveraging the web platform</p>

<p align="center">
  <img src="https://img.shields.io/badge/from-the_future-blue?style=flat" />
  <img src="https://img.shields.io/badge/status-legit-purple?style=flat" />
  <a href="https://mc-fly.vercel.app" target="_blank"><img src="https://img.shields.io/badge/see-the_demo_↗️-blue?style=flat&colorB=28CF8D" /></a>
</p>

## Features
- Create web apps with vanilla custom elements
- Write real .HTML files
- Have no frameworks or reactivity libraries on the browser
- Use server-side rendering
- Deploy anywhere

## Special directories
**1. `src/pages`**
- file based routing for `.html` files
- directly use custom elements & static fragments (no imports or registry maintenance needed)
- use `<script server:setup>` to define logic that runs on the server, which then gets stripped away

**2. `src/components`**
- custom element constructor files (only `.js` files for now)
- all components are automatically registered using their file names; a `hello-world.js` component can be used as `<hello-world>`
- static `.html` fragments; a `my-header.html` fragment can be directly used as `<my-header>`

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

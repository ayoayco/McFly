<p align="center">
  <img width="250" src="https://github.com/ayoayco/McFly/assets/4262489/719a51c6-4858-4e3c-9856-c5af0e9be1bd" alt="rRick & Morty cartoon" />
</p>

<h1 align="center">Create McFly</h1>

```
npm create mcfly@latest
```

<p align="center"><strong>McFly</strong> is a no-framework framework<br />that assists in leveraging the web platform</p>

<p align="center">
  <img src="https://img.shields.io/badge/from-the_future-blue?style=flat" />
  <img src="https://img.shields.io/badge/status-legit-purple?style=flat" />
  <a href="https://mc-fly.vercel.app/demo" target="_blank"><img src="https://img.shields.io/badge/see-the_demo_↗️-blue?style=flat&colorB=28CF8D" /></a>
</p>

## Features
The time has come for vanilla Web tech. 🎉

✅ Create web apps with vanilla custom elements<br>
✅ Write real .HTML files<br>
✅ Have no frameworks or reactivity libraries on the browser<br>
✅ Use server-side rendering<br>
✅ Deploy anywhere<br>

## Special directories
**1. `./src/pages/`**
- file-based routing for `.html` files
- directly use custom elements & static fragments (no imports or registry maintenance needed)
- use `<script server:setup>` to define logic that runs on the server, which then gets stripped away

**2. `./src/components/`**
- custom element constructor files (only `.js` files for now)
- all components are automatically registered using their file names; a `hello-world.js` component can be used as `<hello-world>`
- static `.html` fragments; a `my-header.html` fragment can be directly used as `<my-header>`

**3. `./routes/api/`**
- file-based routing for REST API endpoints
- e.g., `./routes/api/users.ts` can be accessed via `http://<domain>/api/users`
- TypeScript or JavaScript welcome!

## McFly config

To tell McFly you want to use components, pass the mode (only `"js"` for now) to the `components` prop mcfly.config.ts

```js
import defineConfig from "./packages/define-config";

export default defineConfig({
  components: "js",
});

```

## More info
This framework is a result of [an exploration](https://social.ayco.io/@ayo/111195315785886977) for using [**Nitro**](https://nitro.unjs.io) and vanilla JS custom elements using a minimal [**Web Component Base**](https://WebComponent.io) class.

**Nitro** is the same production-grade web server powering [**Nuxt**](https://nuxt.com/)

---
*Just keep building*<br />
*A project by [Ayo Ayco](https://ayco.io)*

<p align="center">
  <img width="250" src="https://github.com/ayoayco/McFly/assets/4262489/719a51c6-4858-4e3c-9856-c5af0e9be1bd" alt="rRick & Morty cartoon" />
</p>

<h1 align="center">McFly</h1>

<p align="center"><strong>McFly</strong> is a no-framework framework<br />that assists in leveraging the web platform</p>

<p align="center">
  <img src="https://img.shields.io/badge/from-the_future-blue?style=flat" />
  <img src="https://img.shields.io/badge/status-legit-purple?style=flat" />
  <a href="https://mc-fly.vercel.app/demo" target="_blank"><img src="https://img.shields.io/badge/see-the_demo_↗️-blue?style=flat&colorB=28CF8D" /></a>
</p>

## Project Status 

We are currently in a Proof of Concept phase. All parts are subject to breaking changes in minor releases. 

## Installation

Run the following to generate a McFly starter project.
```
npm create mcfly@latest
```
## Join Us!
Need help? Wanna hangout? Everyone is welcome to join our public [McFly chat rooms](https://mcfly.js.org/chat)... or just read through the [Discussion channel](https://app.element.io/#/room/!ClBXAeIoOzdniMUUue:matrix.org) even without an account!

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

## Packages
The following are the project packages published on the NPM registry:

| Package | Description | Version |
| --- | --- | --- |
| [`@mcflyjs/cli`](https://ayco.io/n/@mcflyjs/cli) | The McFly CLI tooling | ![npm version](https://img.shields.io/npm/v/%40mcflyjs%2Fcli) |
| [`@mcflyjs/config`](https://ayco.io/n/@mcflyjs/config) | Nitro server config for McFly projects | ![npm version](https://img.shields.io/npm/v/%40mcflyjs%2Fconfig) |
| [`@mcflyjs/core`](https://ayco.io/n/@mcflyjs/core) | Route event and config handlers | ![npm version](https://img.shields.io/npm/v/%40mcflyjs%2Fcore) |
| [`create-mcfly`](https://ayco.io/n/create-mcfly) | Script for scaffolding a new McFly workspace | ![npm version](https://img.shields.io/npm/v/create-mcfly) |

## More info
This framework is a result of [an exploration](https://social.ayco.io/@ayo/111195315785886977) for using [Nitro](https://nitro.unjs.io) and vanilla JS custom elements using a minimal [Web Component Base](https://WebComponent.io) class.

**Nitro** is the same production-grade web server powering [Nuxt](https://nuxt.com/)

---
*Just keep building*<br />
*A project by [Ayo Ayco](https://ayco.io)*

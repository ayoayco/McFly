> [!Note]
> **Project Archived**
> This project is archived. It is a “pet project” that will continue to be developed in my spare time at https://git.ayo.run/ayo/mcfly. If you are interested in the goals described below, you can find how to reach me at https://ayco.io/about#contact

<p align="center">
  <img width="250" src="https://git.ayo.run/ayo/mcfly/raw/branch/main/assets/mcfly-logo-sm.png" alt="McFly logo" />
</p>

<h1 align="center">McFly</h1>

<p align="center"><strong>McFly</strong> is a metaframework<br />that assists in building on the Web</p>

<p align="center">
  <img src="https://img.shields.io/badge/from-the_future-blue?style=flat" />
  <img src="https://img.shields.io/badge/status-legit-purple?style=flat" />
  <a href="https://mcfly.js.org/demo" target="_blank"><img src="https://img.shields.io/badge/see-the_demo_↗️-blue?style=flat&colorB=28CF8D" /></a>
</p>

## Why?

I often wonder what it would look like to build sites & apps knowing just the basics.

I thought:

- What if I knew how to write [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) and I can have a dynamic web page from that?
- What if I knew how to build [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) and that's all the component system I needed?
- What if I can write [HTML fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) and [assemble them](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) easily in a page?
- What if I did not have to worry about the [ever-growing number of ways to have a place on the Web](https://v1.ayos.blog/places-in-the-web/)?

**McFly** is my reimagination of web development: _Back to the basics. Into the future._

## Project Status

We are currently in a focused rewrite. All parts are subject to breaking changes in minor releases.

- [x] generic plugin system for using server frameworks
- [x] file-based API routing via fastify as server framework
- [ ] file-based HTML pages routing
- [ ] HTML templating via Eta
- [ ] auto-registry of custom elements
- [ ] SSR custom elements
- [ ] SSG builds

## Try it today

Run the following to generate a McFly starter project.

```
npm create mcfly@latest
```

## Target Features

✅ Use vanilla custom elements (or sugar-coated web components)<br>
✅ Write server-powered .html pages<br>
✅ "Use the Platform™" on both server runtimes & browsers<br>
✅ Use server-side rendering<br>
✅ Deploy anywhere, even the Edge<br>

## Special directories

**1. `./src/api/`**

- file-based routing for REST API endpoints
- e.g., `./src/api/users.js` can be accessed via `http://<domain>/api/users`

## Packages

The following are the project packages published on the NPM registry:

| Package                                                  | Description                                   | Version                                                                |
| :------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| [`@mcflyjs/config`](https://ayco.io/n/@mcflyjs/config)   | Configuration handling for McFly projects     | ![npm version](https://img.shields.io/npm/v/%40mcflyjs%2Fconfig/alpha) |
| [`@mcflyjs/core`](https://ayco.io/n/@mcflyjs/core)       | Commands & runtime handling                   | ![npm version](https://img.shields.io/npm/v/%40mcflyjs%2Fcore/alpha)   |
| [`@mcflyjs/fastify`](https://ayco.io/n/@mcflyjs/fastify) | Adapter for using fastify as server framework | ![npm version](https://img.shields.io/npm/v/%40mcflyjs%2Ffastify)      |
| [`create-mcfly`](https://ayco.io/n/create-mcfly)         | Script for scaffolding a new McFly workspace  | ![npm version](https://img.shields.io/npm/v/create-mcfly)              |

## Project setup

After cloning the project, you will need [node](https://nodejs.org/en/download) and [pnpm installed](https://pnpm.io/installation). When you are sure that you have `node` and `pnpm`, then run the following to download the dependencies:

```
corepack enable
pnpm i
```

The following commands are available to you on this project. Add more, or modify them as needed in your `./package.json` file.

| Command                 | Action                                                |
| ----------------------- | :---------------------------------------------------- |
| pnpm run site           | Start the development server for https://mcfly.js.org |
| pnpm run template:basic | Start the development server for the basic template   |
| pnpm run build          | Locally generate the app's build files to `./output`  |
| pnpm run preview        | Preview the built app locally                         |

## More info

This framework was initially a result of [an exploration](https://social.ayco.io/@ayo/111195315785886977) for using [Nitro](https://nitro.build) and custom elements using a minimal [Web Component Base](https://WebComponent.io) class.

In 2026, we pivoted to a new target architecture to become more like a "glue" that allows putting together existing options that achieve our goals. We avoid building custom mechanisms when we can. The resulting architecture theoretically allows using different server frameworks, templating libraries, custom element libraries, etc.

---

_Just keep building._<br>
_A project by [Ayo](https://ayo.ayco.io)_

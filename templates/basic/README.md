# McFly Starter Project

**McFly** is a no-framework framework that assists in leveraging the web platform.

```
npm create mcfly@latest
```
![template-basic](https://raw.githubusercontent.com/ayoayco/McFly/main/assets/template-basic.png)

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

## Commands

From the root of your project, you can run the following.

| Command | Result |
| --- | --- |
| npm start | Start the dev server |
| npm run prepare | Prepare the app |
| npm run build | Locally generate the app's build files to `./output` |
| npm run preview | Preview the built app locally |

## More info

Check our [website](https://mc-fly.vercel.app) and [GitHub](https://github.com/ayoayco/McFly)

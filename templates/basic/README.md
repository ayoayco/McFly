# McFly Starter Project

This project was generated from the basic template for **McFly** -- a no-framework framework that assists in leveraging the web platform.

It contains example files to get you started using vanilla web technologies in a modern way. See the [Special Directories](#special-directories) section for more information.

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

## Commands

The following commands are available to you on this project. Add more, or modify them as needed in your `./package.json` file.

| Command | Action |
| --- | --- |
| npm start | Start the development server |
| npm run prepare | Prepare the workspace |
| npm run build | Locally generate the app's build files to `./output` |
| npm run preview | Preview the built app locally |

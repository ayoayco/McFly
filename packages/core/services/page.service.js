
export class PageService {
    /**
     * Gets the correct HTML depending on the path requested
     * @param {string} path
     * @param {Storage} storage
     * @returns {Promise<StorageValue>}
     */
    async getHtml(path, storage) {
        const rawPath = path[path.length - 1] === "/" ? path.slice(0, -1) : path;
        const filename = rawPath === "" ? "/index.html" : `${rawPath}.html`;
        const fallback = this.getPath(rawPath + "/index.html");
        const filePath = this.getPath(filename);
        let html = await storage.getItem(filePath);
        if (!html) html = await storage.getItem(fallback);
        if (!html) html = await storage.getItem(this.getPath("/404.html"));

        return html;
    }

    /**
     * Gets the storage path for a file
     * @param {string} filename
     * @returns {string}
     */
    getPath(filename) {
        return `assets:pages${filename}`;
    }
}
/**
 * Get all files from the storage given a type
 * @param {string} type
 * @param {Storage} storage
 * @returns {Promise<string[]>}
 */
export async function getFiles(type, storage) {
    return (await storage.getKeys("assets:components"))
        .map((key) => key.replace("assets:components:", ""))
        .filter((key) => key.includes(type));
}
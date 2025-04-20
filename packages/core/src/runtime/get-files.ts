import type { Storage } from 'unstorage'

/**
 * Get all files from the storage given a type
 * @param {string} type
 * @param {Storage} storage
 * @returns {Promise<string[]>}
 */
export async function getFiles(type: string, storage: Storage) {
  return (await storage.getKeys('assets:components'))
    .map((key) => key.replace('assets:components:', ''))
    .filter((key) => key.includes(type))
}

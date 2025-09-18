// Minimal IndexedDB helper for storing phrases

const DATABASE_NAME = 'textgen-db'
const DATABASE_VERSION = 2
const STORE_NAME = 'phrases'

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)

    request.onupgradeneeded = (event) => {
      const db = request.result
      const oldVersion = event.oldVersion || 0

      // v1: create store and createdAt index
      if (oldVersion < 1) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
        store.createIndex('createdAt', 'createdAt', { unique: false })
      }

      // v2: add source index for optional source field
      if (oldVersion < 2) {
        const tx = event.currentTarget.transaction
        const store = tx.objectStore(STORE_NAME)
        if (!store.indexNames.contains('source')) {
          store.createIndex('source', 'source', { unique: false })
        }
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function withStore(mode, callback) {
  return openDatabase().then((db) =>
    new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, mode)
      const store = transaction.objectStore(STORE_NAME)
      const result = callback(store)
      transaction.oncomplete = () => resolve(result)
      transaction.onerror = () => reject(transaction.error)
      transaction.onabort = () => reject(transaction.error)
    })
  )
}

export function getAllPhrases() {
  return withStore('readonly', (store) => {
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  })
}

export function addPhrase(text, source = '') {
  const phrase = { text, source, createdAt: Date.now() }
  return withStore('readwrite', (store) => {
    return new Promise((resolve, reject) => {
      const request = store.add(phrase)
      request.onsuccess = () => resolve({ ...phrase, id: request.result })
      request.onerror = () => reject(request.error)
    })
  })
}

export function deletePhrase(id) {
  return withStore('readwrite', (store) => {
    return new Promise((resolve, reject) => {
      const request = store.delete(id)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  })
}

export async function ensureSeedData(defaultPhrases) {
  const existing = await getAllPhrases()
  if (existing && existing.length > 0) return existing
  // Seed defaults
  const inserted = []
  for (const text of defaultPhrases) {
    // eslint-disable-next-line no-await-in-loop
    const saved = await addPhrase(text, '')
    inserted.push(saved)
  }
  return inserted
}



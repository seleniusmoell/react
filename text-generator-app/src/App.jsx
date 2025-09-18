import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { addPhrase, deletePhrase, ensureSeedData, getAllPhrases } from './db.js'

function App() {
  const [generatedText, setGeneratedText] = useState('')
  const [phrases, setPhrases] = useState([])
  const [newPhrase, setNewPhrase] = useState('')
  const defaultPhrases = useMemo(
    () => [
      'The quick brown fox jumps over the lazy dog.',
      'Hello, world! Have a wonderful day.',
      'React makes building UIs a joy.',
      'Coding is like poetry in logic.',
      'Ships are safe in harbor, but that’s not what ships are for.',
      'Simplicity is the soul of efficiency.',
      'Stay curious and keep building.',
    ],
    []
  )

  useEffect(() => {
    (async () => {
      const items = await ensureSeedData(defaultPhrases)
      setPhrases(items)
    })()
  }, [defaultPhrases])

  async function refreshPhrases() {
    const items = await getAllPhrases()
    setPhrases(items)
  }

  function handleGenerateClick() {
    if (!phrases || phrases.length === 0) {
      setGeneratedText('No facts available. Add one below!')
      return
    }
    const randomIndex = Math.floor(Math.random() * phrases.length)
    setGeneratedText(phrases[randomIndex].text)
  }

  async function handleAddPhrase(e) {
    e.preventDefault()
    const trimmed = newPhrase.trim()
    if (!trimmed) return
    await addPhrase(trimmed)
    setNewPhrase('')
    await refreshPhrases()
  }

  async function handleDeletePhrase(id) {
    await deletePhrase(id)
    await refreshPhrases()
  }

  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || '/')

  useEffect(() => {
    function onHashChange() {
      setRoute(window.location.hash.replace('#', '') || '/')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function navigate(to) {
    window.location.hash = to
  }

  const isAdmin = route === '/admin'

  return (
    <>
      <header style={{ textAlign: 'center' }}>
        <h1>Dagens fakta</h1>
      </header>

      {!isAdmin && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <button onClick={handleGenerateClick}>Visste du att...</button>
          <p
            style={{
              minHeight: '2.5rem',
              marginTop: '1rem',
              fontSize: '1.25rem',
              lineHeight: 1.6,
              textAlign: 'center',
              color: '#111827',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)'
            }}
          >
            {generatedText || 'Click the button to generate text.'}
          </p>
        </div>
      )}

      {isAdmin && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Facts</h2>
          <form onSubmit={handleAddPhrase} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              type="text"
              placeholder="Add a new fact..."
              value={newPhrase}
              onChange={(e) => setNewPhrase(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit">Add</button>
          </form>

          <ul style={{ marginTop: '1rem', paddingLeft: '1rem' }}>
            {phrases.map((p) => (
              <li key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ flex: 1 }}>{p.text}</span>
                <button onClick={() => handleDeletePhrase(p.id)}>Delete</button>
              </li>
            ))}
            {phrases.length === 0 && <li>No facts yet.</li>}
          </ul>
        </div>
      )}
    </>
  )
}

export default App

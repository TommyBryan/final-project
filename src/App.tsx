import Header from './components/Header'
function App() {
  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <Header />
      <h1>Welcome to iNtellecta 📚</h1>
      <p>Built with React + Vite + TypeScript</p>
      <button onClick={() => alert('You clicked!')}>Click Me</button>
    </main>
  )
}

export default App

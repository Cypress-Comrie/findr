import { Outlet } from 'react-router'
function App() {
  return (
    <div className="app">
      <header className="p-4 bg-purple-600 text-white">
        <h1 className="text-2xl font-bold">Findr</h1>
      </header>
      <main>
        <Outlet /> {/* This renders your child routes */}
      </main>
    </div>
  )
}

export default App

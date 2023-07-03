// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import {useState} from 'react'

function Greeting({initName}) {
  const [name, setName] = useState(initName)

  function handleChange(event) {
    const inputValue = event.target.value
    setName(inputValue)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" defaultValue={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initName="Alex" />
}

export default App

// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import {useState} from 'react'

function Greeting() {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [name, setName] = useState('')

  function handleChange(event) {
    const inputValue = event.target.value
    setName(inputValue)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App

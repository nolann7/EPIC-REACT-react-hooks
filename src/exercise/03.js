// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => onAnimalChange(event.target.value)}
      />
    </div>
  )
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}${animal ? '!': ''}`}</div>
}

function App() {
  // const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={value => setAnimal(value)}
      />
      <Display animal={animal} />
    </form>
  )
}

export default App

import {useEffect, useState} from 'react';
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon';

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  // 🐨 use React.useEffect where the callback should be called whenever the pokemon name changes.
  useEffect(() => {
    if (!pokemonName) return;
    setPokemon(null);
    setError(null)
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemon(pokemonData);
      })
      .catch(error => setError(error));
  }, [pokemonName]);
  let output = <></>;
  // 0. error handling
  if (error) {
    output = (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    );
  }
  //   1. no pokemonName: 'Submit a pokemon'
  else if (!pokemonName) {
    output = <div>Submit a pokemon</div>;
  }
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  else if (pokemonName && !pokemon) {
    output = <PokemonInfoFallback name={pokemonName} />;
  }
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  else if (pokemon) {
    output = <PokemonDataView pokemon={pokemon} />;
  }
  return output;
}

function App() {
  const [pokemonName, setPokemonName] = useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;

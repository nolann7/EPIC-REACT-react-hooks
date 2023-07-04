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
  const [status, setStatus] = useState('idle'); // 'idle' | 'pending' | 'resolved' | 'rejected'
  // 🐨 use React.useEffect where the callback should be called whenever the pokemon name changes.
  useEffect(() => {
    if (!pokemonName) return;
    setStatus('pending');
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemon(pokemonData);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [pokemonName]);
  let output = <></>;

  //   1. no pokemonName: 'Submit a pokemon'
  if (status === 'idle') {
    output = <div>Submit a pokemon</div>;
  }
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  else if (status === 'pending') {
    output = <PokemonInfoFallback name={pokemonName} />;
  }
  // 3. error handling
  else if (status === 'rejected') {
    output = (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    );
  }
  //   4. pokemon: <PokemonDataView pokemon={pokemon} />
  else if (status === 'resolved') {
    output = <PokemonDataView pokemon={pokemon} />;
  } else {
    throw new Error('This should be impossible');
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

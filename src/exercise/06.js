import {useEffect, useState, Component} from 'react';
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon';

class ErrorBoundary extends Component {
  state = {error: null};
  static getDerivedStateFromError(error) {
    return {error};
  }

  render() {
    let {error} = this.state;
    if (error) {
      return <this.props.fallback error={error} />;
    }

    return this.props.children;
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({
    pokemon: null,
    error: null,
    status: 'idle',
  });
  const {status, pokemon, error} = state;
  useEffect(() => {
    if (!pokemonName) return;
    setState(prevState => ({...prevState, status: 'pending'}));
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState(prevState => ({
          ...prevState,
          pokemon: pokemonData,
          status: 'resolved',
        }));
      })
      .catch(error => {
        setState(prevState => ({...prevState, error, status: 'rejected'}));
      });
  }, [pokemonName]);
  let output = <></>;

  if (status === 'idle') {
    output = <div>Submit a pokemon</div>;
  } else if (status === 'pending') {
    output = <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'rejected') {
    throw error;
    // output = (
    //   <div role="alert">
    //     There was an error:{' '}
    //     <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    //   </div>
    // );
  } else if (status === 'resolved') {
    output = <PokemonDataView pokemon={pokemon} />;
  } else {
    throw new Error('This should be impossible');
  }
  return output;
}
function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  );
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
        <ErrorBoundary key={pokemonName} fallback={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Main from './Main';

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Něco se pokazilo:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Restartujte aplikaci.</button>
    </div>
  )
}

class App extends Component {
  render() {
      return(
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            document.location.reload();
          }}
        >
          <Main></Main>
        </ErrorBoundary>
      );
  }
}

export default App;

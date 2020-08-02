import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box } from '@chakra-ui/core';
import Home from 'pages/Home';
import { AppContext, appReducer, appInitialState } from 'service/context/appContext';

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(appReducer, appInitialState);

  return (
    <Box maxW="6xl" height="100%" margin="0 auto">
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </Box>
  );
};

export default App;

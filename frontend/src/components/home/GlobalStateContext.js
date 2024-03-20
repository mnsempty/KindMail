// GlobalStateContext.js
import React from 'react';

const GlobalStateContext = React.createContext({
 selectedUserId: null,
 setSelectedUserId: () => {},
});

export default GlobalStateContext;

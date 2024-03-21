import React from "react";

const GlobalStateContext = React.createContext({
  selectedChatId: null,
  setSelectedChatId: () => {},
});

export default GlobalStateContext;

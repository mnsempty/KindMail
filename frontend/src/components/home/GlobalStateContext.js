import React from "react";

const GlobalStateContext = React.createContext({
  ChatIds: {
    current: null,
    previous: null,
 },
  setSelectedChatId: () => {},
});

export default GlobalStateContext;

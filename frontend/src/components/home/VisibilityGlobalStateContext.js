import React from "react";

const VisibilityGlobalStateContext = React.createContext({
  isAsideVisible: true,
  isChatVisible: false,

  toggleVisibility: () => {},
});

export default VisibilityGlobalStateContext;

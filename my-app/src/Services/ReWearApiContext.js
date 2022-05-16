import { createContext, useState } from "react";

const ReWearApiContext = createContext({});

const ReWearApiContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);

  function logOut() {
    console.log("calling logout");
    setLoggedUser(null);
    setAccessToken(null);
  }

  return (
    <ReWearApiContext.Provider
      value={{ accessToken, setAccessToken, loggedUser, setLoggedUser, logOut }}
    >
      {children}
    </ReWearApiContext.Provider>
  );
};

export { ReWearApiContext, ReWearApiContextProvider };

/*
import { createContext, useState } from "react";

const [unicornTypes, setUnicornTypes] = useState(undefined);

ReferenceDataContext = createContext({ unicornTypes, setUnicornTypes });

const ReferenceDataContextProvider = ({ children }) => {
  return (
    <ReferenceDataContext.Provider value={{ unicornTypes, setUnicornTypes }}>
      {...children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
*/

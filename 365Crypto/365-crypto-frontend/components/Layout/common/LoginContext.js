import { useState, createContext } from "react";

export const LoginContext = createContext();
export const LoginProvider = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [redirect, setRedirect] = useState({
    status: false,
    redirectTo: null,
    url: null,
  });

  return (
    <LoginContext.Provider
      value={[
        modalShow,
        isLogin,
        redirect,
        setLogin,
        setModalShow,
        setRedirect,
      ]}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

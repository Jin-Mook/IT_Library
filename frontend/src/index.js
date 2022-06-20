import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import store from "./redux/store";
import { Provider } from "react-redux";
//Provider는 어떠한 컴포넌트들에게 리덕스를 제공할 것인가에 대한 울타리와 같은 것

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>
);

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./context/userContext";
import App from "./App";

import Theme from "./context/Theme";
import { GlobalStyle } from "./styled/globalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
      <BrowserRouter>
        <Theme>
          <GlobalStyle />
          <App />
        </Theme>
      </BrowserRouter>
  </UserProvider>
);

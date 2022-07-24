import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider as UrqlProvider, createClient, defaultExchanges } from "urql";
import { Dashboard } from "./pages/Dashboard";
import { Jira } from "./pages/Jira";
import { Orders } from "./pages/Orders";
import { Posts } from "./pages/Posts";
import { Frame } from "./components/Frame";

const urql = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: defaultExchanges,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UrqlProvider value={urql}>
      <App />
    </UrqlProvider>
  </React.StrictMode>
);

function App() {
  return (
    <BrowserRouter>
      <Frame>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="jira" element={<Jira />} />
          <Route path="posts" element={<Posts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Frame>
    </BrowserRouter>
  );
}

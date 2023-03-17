import React from "react";
import ReactDOM from "react-dom/client";

import { httpBatchLink } from "@trpc/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { trpc } from "./trpc";

import { Dashboard } from "./pages/Dashboard";
import { Jira } from "./pages/Jira";
import { Frame } from "./components/Reusable/Frame";
import { Privacy } from "./pages/Privacy";
import { Posts } from "./pages/Posts";
import { Orders } from "./pages/Orders";
import { UserProvider } from "./context/UserContext";

export function Query() {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `${import.meta.env.VITE_API_URL}/trpc`,
        }),
      ],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <App />
        </UserProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Frame>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="jira" element={<Jira />} />
          <Route path="posts" element={<Posts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Frame>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Query />
  </React.StrictMode>
);

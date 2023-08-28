import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "pages/router";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Router />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

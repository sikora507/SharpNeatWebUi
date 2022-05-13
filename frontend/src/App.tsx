import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import { Stack } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ExperimentContextProvider from "./store/experiment-context";
import ConfigPage from "./components/pages/ConfigPage";
import ChartsPage from "./components/pages/ChartsPage";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack className="h-100">
        <ExperimentContextProvider>
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/config" element={<ConfigPage />} />
              <Route path="/charts" element={<ChartsPage />} />
            </Routes>
          </main>
          <Footer />
        </ExperimentContextProvider>
      </Stack>
    </QueryClientProvider>
  );
}

export default App;

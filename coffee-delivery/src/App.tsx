import { Home } from "./pages/Home";
import { GlobalStyle } from "./global";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./default";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Payment } from "./pages/Payment";
import { DataProvider } from "./context/coffeeContext";
import { Confirmation } from "./pages/Confirmation";

export function Router() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    )
}

export function App() {

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <DataProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <GlobalStyle />
        </DataProvider>
        
      </ThemeProvider>
    </>
  )
}


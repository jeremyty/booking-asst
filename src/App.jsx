import LoginPage from "./pages/LoginPage";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider } from "./components/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";


export default function App() {

  return (
    <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
          <Routes>
              <Route path="*" element={<LoginPage />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
  )
}
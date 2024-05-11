import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/authContext";
import { Header } from "./components";
import "./App.css";
import { AuthOrgContextProvider } from "./context/authOrgContext";

const App = () => {
  return (
    <>
      <AuthOrgContextProvider>
        <AuthContextProvider>
          <ChakraProvider>
            <Header />
            <main>
              <Outlet />
            </main>
          </ChakraProvider>
        </AuthContextProvider>
      </AuthOrgContextProvider>
    </>
  );
};

export default App;

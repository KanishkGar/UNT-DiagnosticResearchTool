import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { doneWithStudyAtom, loggedInAtom } from "./atoms";
import { Done } from "./components/Done";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Login } from "./components/Login";

function App() {
  const loggedIn = useRecoilValue(loggedInAtom);
  const doneWithStudy = useRecoilValue(doneWithStudyAtom);
  return (
    <ChakraProvider>
        <Header />
        {loggedIn ? doneWithStudy ? <Done /> : <Home /> : <Login />}
    </ChakraProvider>
  );
}

export default App;

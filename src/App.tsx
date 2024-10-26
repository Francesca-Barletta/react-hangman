import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import { createGlobalStyle } from "styled-components";


function App() {


  return (
    <>
    <GlobalStyle/>
      <Word/>
      <Keyboard/>
   
    </>
  )
}

const GlobalStyle = createGlobalStyle`
body{
  background-color: #ffd103;
}
`


export default App

import { FunctionComponent, useState, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components"

import { selectWord, selectSelectedLetters, lifePoints, resetGame, addLetter, winPoints, levelNum, nextWord, closeModal, openModal} from '../redux/reducers/hangman-reducer';

const Word:FunctionComponent = () => {
const dispatch = useDispatch();
const life = useSelector(lifePoints)
const level = useSelector(levelNum)
const points = useSelector(winPoints)
const word = useSelector(selectWord);
const message = useSelector((state:any) => state.guess.message);
const isWordGuessed = useSelector((state:any) => state.guess.isWordGuessed);
const isModalOpen = useSelector((state:any) => state.guess.isModalOpen);
const endGame = useSelector((state:any) => state.guess.endGame)

const selectedLetters = useSelector(selectSelectedLetters);
const [visibleWord, setVisibleWord] = useState<string[]>([]);



const memoWord = useMemo(() => {
    return word.split('').map((char: string) =>
    selectedLetters.includes(char) ? char : '_'
   
   );
}, [word, selectedLetters]);

const handleLetterSelection = (char:string) => {
    if (!selectedLetters.includes(char)){
        dispatch(addLetter(char));

      
    }
};

const handleKeyUp = (event: KeyboardEvent) => {
    const char = event.key.toLowerCase();
    if (char.length === 1 && char >= 'a' && char <= 'z') { 
      handleLetterSelection(char);
    }
  };


useEffect(() => {

    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
}, [selectedLetters]);

useEffect(() => {
    if (isWordGuessed || isModalOpen) {
        console.log("Valore di endGame:", endGame);
        console.log(isWordGuessed, isModalOpen)
        const timeoutId = setTimeout(() => {
            dispatch(openModal());
        },1000);

        return () => clearTimeout(timeoutId);
    }
},[isWordGuessed, isModalOpen, message, dispatch])


const handleCloseModal = () => {
    console.log("Valore di endGame:", endGame);
    dispatch(closeModal());
    console.log('nellhandle', isWordGuessed) // Chiude il modale
    if(isWordGuessed){
        dispatch(nextWord()); // Avanza alla parola successiva solo quando l'utente chiude il modale
    }else if(endGame){
        dispatch(resetGame());
    }
    
};


useEffect(() => {
    setVisibleWord(memoWord);  
}, [memoWord, ]);

  return (
    
    <Wrapper>

    <div className="container">
        <h1 className="title">The Hangman</h1>
        <button className="reset" onClick={() => dispatch(resetGame())}>Reset game</button>
        <p className="levels"> Points: {points}</p>
        <p className="levels"> Life: {life}</p>
        <p className="levels"> Level: {level}</p>
        <div className="row">
        {visibleWord.map((char, index) =>{
            return (
                <div key={index} className="word">
                    <p className="char" onClick={() =>handleLetterSelection(char)}>{char}</p>

                </div>
        )
        })}

        </div>
        <div className="modal-bg" style={{ display: isWordGuessed || isModalOpen ? "flex" : "none"}}>
            <div className="modal-content">
                <p className="levels">{message}</p>
                <button className="continue" onClick={() => handleCloseModal() }>{endGame ? 'reset' : 'continua'}</button>
            </div>
        </div>
        
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
.container{
    max-width: 1000px;
    margin:0 auto;
    h1{
        text-align: center;
        font-size:3rem;
        margin:30px
    }
    .row{
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items: center;
    }
}
.title{
    padding-top: 50px;
    user-select: none;
    font-family: "DynaPuff", system-ui;
}
.reset, .continue{
    border:none;
    font-family: "DynaPuff", system-ui;
    font-size: 16px;
    background-color:white;
    padding:10px;
    border-radius:5px;
    box-shadow:3px 3px 2px 2px  #dbb302;
    user-select: none;
    &:hover{
        background-color:black;
        color:white;
        cursor:pointer;
    }

}
.levels{
    font-family: "DynaPuff", system-ui;
    font-size: 24px;
    user-select: none;
}
.word{
    font-family: "DynaPuff", system-ui;
    font-size: 50px;
    user-select: none;
    width:60px;
    height: 60px;
    display:flex;
    justify-content:center;
    align-items: center;
    margin: 30px 5px;
   .hidden{
    visibility: hidden;
   }
}
.modal-bg{
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    justify-content: center;
    align-items: flex-start;
    .modal-content {
        background-color: #fefefe;
        border-radius: 15px;
        margin-top:100px;
        padding: 20px;
        border: 1px solid #888;
        width: 50%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
}
}
`;


export default Word
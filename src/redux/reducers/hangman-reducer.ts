import { createSlice} from '@reduxjs/toolkit';
import { getItemFromLocalStorage, setLocalStorageItem } from '../../utils/localStorage';
import data from '../../data';

const firstLevel:string[] = data.word
const secondLevel:string[] = data.word2
const thirdLevel:string[] = data.word3


// ritorna la stringa (parola da indovinare), in input prende l'array e un numero(che serve come indice)
const getWord = (arr:string[], num:number) => {
    let result:string =  arr[num]

    return result
}


// prende in input una parola e un'array1, trasforma la parola in array2, 
// la cicla e se l'array1 contiene il singolo elemento di Array2, la inserisce nella variabile result che è un Array,
//a questo punto trasformo result in una stringa e se è uguale alla parola data in input ritorna true (la parola è stata indovinata completamente)
const isGuessedWord = (a:string, b:string[]) => {
    const wordToArray = a.split('')
    const result:string[] = []
    for(let i = 0; i < wordToArray.length; i++){
        let char:string = wordToArray[i]
        if(b.includes(char)){
            result.push(char)
        }
    }
    const newResult = result.join('')
    if(newResult == a){
        return true
    }else{
        return false
    }
}

// in base al numero passato come parametro prende e ritorna un'array diverso
const changeDifficulty = (num:number) => {
    const level:any = num
    let array:string[] = []
    if (level == 0) {
        array = firstLevel

    } else if (level == 1) {
        array = secondLevel

    } else if (level == 2) {
        array = thirdLevel

    }
    return array
}


let level = 0


//definizione dello stato iniziale dello slice 
const initialState = {
    selectedLetters: getItemFromLocalStorage('selectedLetters') || [],
    life: getItemFromLocalStorage('life') || 10,
    word: getItemFromLocalStorage('word') || getWord(changeDifficulty(level), 0),
    points: getItemFromLocalStorage('points') || 0,
    difficulty: getItemFromLocalStorage('difficulty') || level,
    sortedWords: getItemFromLocalStorage('sortedWords') || 0,
    isWordGuessed : false,
    isModalOpen : false,
    endGame : false,
    message: '',

};



const hangmanSlice = createSlice({
    name: 'hangman',
    initialState,
    reducers : {

        addLetter:(state, action) => {
            const letter = action.payload;
            if(state.selectedLetters.includes(letter)){
                state.message = 'lettera già inserita!'
                state.isModalOpen = true
            }else{
                state.selectedLetters.push(letter);

                state.message = '';
                setLocalStorageItem('selectedLetters', state.selectedLetters);
                if(!state.word.split('').includes(letter)){
                    state.life -= 1;
                    setLocalStorageItem('life', state.life)
                    if (state.life == 0){
                        state.message = "Hai perso!, hai totalizzato "+ state.points +" punti"
                        state.isModalOpen = true
                    }
                }else{
                    state.points += 1;
                    setLocalStorageItem('points', state.points)
                }
            }

            if(isGuessedWord(state.word, state.selectedLetters)){
                state.message = 'Complimenti hai indovinato la parola!'
                state.isWordGuessed = true
                // se la parola è stata indovinata aumento di 10 punti
                state.points += 10
                // salvo nel localStorage punti e vita
                setLocalStorageItem('points', state.points)
                setLocalStorageItem('life', state.life)
                return
            }
        },
        nextWord: (state) => {

                state.isWordGuessed = false
                // riazzero le lettere selezionate
                state.selectedLetters = []
                // aumento di 1 sortedwords per prendere la lettera successiva nell'array di lettere
                if(state.sortedWords < 4){
                     state.sortedWords += 1
                }
                
                // se sortedwords è arrivato alla stessa dimensione dell'array e la difficoltà è minore di 3 allora aumenta la difficoltà di 1
                if(state.sortedWords == 4 && state.difficulty == 2){
                    state.message = 'complimenti hai completato tutti i livelli, hai totalizzato: '+ state.points + 'punti'
                    state.endGame = true
                    state.isWordGuessed = false
                    state.isModalOpen = true
                }else if (state.sortedWords == 4 && state.difficulty < 3){
                        state.difficulty +=1
                        state.sortedWords = 0
                        state.word = getWord(changeDifficulty(state.difficulty), state.sortedWords)
                        state.message='hai sbloccato il '+ state.difficulty+'° livello'
                        state.isModalOpen = true
                }else{
                    // se sorted words è inferiore alla length, prendo la prossima parola  dall'array
                    state.word = getWord(changeDifficulty(state.difficulty), state.sortedWords)
                    setLocalStorageItem('selectedLetters', state.selectedLetters);
                    setLocalStorageItem('word', state.word);
                }


        },
        resetGame: (state) => {
            state.selectedLetters = [],
            state.message = '',
            state.life = 10,
            state.points = 0,
            state.word = getWord(changeDifficulty(level), 0)
            state.sortedWords = 0
            state.endGame = false
            state.difficulty = level
        },
        openModal: (state) =>{
            state.isModalOpen= true
        },
        closeModal: (state) =>{
            state.isModalOpen = false
        },


    },
});

export const {addLetter, resetGame, nextWord, closeModal, openModal} = hangmanSlice.actions;
export const selectWord = (state: any) => state.guess.word;
export const winPoints = (state:any) => state.guess.points;
export const lifePoints = (state:any) => state.guess.life;
export const levelNum = (state:any) => state.guess.difficulty;
export const modalOpen = (state:any) => state.guess.isModalOpen;
export const endGame = (state:any) => state.guess.endGame;
export const selectSelectedLetters = (state: any) => state.guess.selectedLetters;
const {reducer} = hangmanSlice;
export default reducer
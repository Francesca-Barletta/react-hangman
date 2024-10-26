import { FunctionComponent} from 'react';
import { useDispatch} from 'react-redux';
import { addLetter} from '../redux/reducers/hangman-reducer';
import styled from "styled-components";
import data from '../data';

const Keyboard:FunctionComponent = () => {
    const dispatch = useDispatch();
    const letters = data.letters.split('');
    // const message = useSelector((state:any) => state.guess.message);


    const handleLetterClick = (letter:string) => {
        dispatch(addLetter(letter));
    }

  return (
    <Wrapper>
        <section>
            
            <div className='container'>
                {letters.map((char, index) => {
                    return (
                    <div key={index} onClick={()=>{handleLetterClick(char)}} className='char'>{char.toUpperCase()}</div>
                )
                })}
                
            </div>
            {/* <div className='container'>
                {message && <p>{message}</p>}
            </div> */}
        </section>
    </Wrapper>
  )
}


const Wrapper = styled.article`
.container{
    max-width: 1000px;
    margin:0 auto;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items: center;
}
.char{
    border: 1px solid black;
    border-radius:10px;
    box-shadow:3px 3px 2px 2px  #dbb302;
    width:50px;
    height:50px;
    padding:20px; 
    margin: 10px;
    font-family: "Concert One", sans-serif;
    font-size: 30px;
    display:flex;
    justify-content:center;
    align-items: center;
    user-select: none;
    cursor:pointer;
    &:hover{
        border:1px solid white;
        background-color: #ffffff;
        box-shadow:3px 3px 2px 2px #dbb302;
    }
}
`;

export default Keyboard
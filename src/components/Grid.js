import Line from './Line';
export default function grid({ guesses, currentGuess, ans }){
    return (
        <div className='App'>
        {
            guesses.map((guess,i)=>{
                const flag = i === guesses.findIndex(val => val == null);
                return (
                    <Line 
                        key={i} guess = {flag ? currentGuess.toLocaleUpperCase() : guess ? guess : ''} 
                        isFinal = {!flag && guess != null}
                        ans = {ans}
                    />
                );
            })
        }
        </div>
    );
}
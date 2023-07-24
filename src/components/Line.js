export default function Line({ guess, isFinal, ans }){
    const store = [];
    const tiles = [];
    let temp = ans;
    for(let i=0;i<5;i++){
        const ch = guess[i];
        let className = 'tile';
        if(isFinal){
            if(temp[i] === guess[i]){
                className += ' green';
                temp = temp.replace(guess[i],'-');
            }
        }
        tiles.push({className,ch});
    }
    for(let i=0;i<5;i++){
        if(isFinal){
            if(tiles[i].className.length <= 5){
                if(temp.includes(tiles[i].ch)){
                    tiles[i].className += ' yellow';
                    temp = temp.replace(guess[i],'-');
                }
                else{
                    tiles[i].className += ' grey';
                }
            }
        }
    }
    for(let i=0;i<5;i++){
        store.push(<div key={i} className={tiles[i].className}>{tiles[i].ch}</div>)
    }
    return (
        <div className="line">
            {store}
        </div>
    );
}
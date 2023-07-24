export default function KeyBoard({handleClick}){
    const key_values = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','<<'];
    const keys = [];
    for(var i=0;i<28;i++){
        keys.push(<button onClick={handleClick} value={key_values[i]} className='key'>{key_values[i]}</button>);
    }
    return <div className='key_board'>{keys}</div>
}
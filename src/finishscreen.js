export default function Finishscreen({ points, maxposiblepoints,highscore,dispatch}) {

    const percentage = (points / maxposiblepoints) * 100;
    

    return (<>
        <p className="result">
            you scored <strong>{ points}</strong> out of {maxposiblepoints}  ({Math.ceil(percentage)}%)
        </p>
        <p className="highscore">
                (Highscore : {highscore} points )
        </p>
        <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}> Restart Quiz</button>
        </>
    )
}

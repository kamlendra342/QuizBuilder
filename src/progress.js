export default function Progress({numquestions,index, points,maxposiblepoints,answer }) {
    return (
        <header className="progress">
            <progress max={numquestions} value={index + Number(answer !== null)} />
            <p> Question <strong>{index+1}/</strong>{numquestions}</p>
            <p><strong>{points}/</strong>{maxposiblepoints} points</p>
        </header>
    )
}
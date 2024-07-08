export default function Startscreen({numquestions ,dispatch}) {
    console.log()
    return <div className="start">
        <h2 className="">Welcome to The React Quiz !</h2>
        <h3 className="">{`${numquestions} questions to test your React mastery`}</h3>
        <button className="btn btn-ui" onClick={()=>{dispatch({type:"start"})}}> Let's Start!</button>
    </div>
}
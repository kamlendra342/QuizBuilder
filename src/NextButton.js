export default function Nextbutton({ dispatch, answer,index }){
    
    if (answer == null) return null;

    return (
        <button className="btn btn-ui" onClick={()=>dispatch({type:`${index<14 ? "nextQuestion" : "finish"}`})}> Next</button>
    )
}
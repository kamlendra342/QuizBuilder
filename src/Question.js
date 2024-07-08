import { useState } from "react"
import Options from "./Options";

export default function Question({ questions }) {
    const [current ,setCurrent] = useState(0);

    function handelClicknext() {
        setCurrent((current) => {
            if (current < questions.length - 1) {
                return current + 1;
            } else {
                alert("No more question ");
                return current
            }
        });
    }
    
    const value=questions[current]

    return (
        <div>
            <h4>{value.question}</h4>
            <Options option={value.options} correctoption={ value.correctOption} />
            <button className="btn btn-ui" onClick={()=>{handelClicknext()}}>next</button>
        </div>
        
    )
}

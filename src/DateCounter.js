import { useReducer, useState } from "react";

function reducer(state, action) {

  switch (action.type) {
    case "inc":
      return { ...state, count:  state.count + state.step };
    case "dec":
      return { ...state, count:  state.count - state.step };
    case "defineCount":
      return { ...state, count:  action.payload};
    case "defineStep":
      return { ...state, step:action.payload};
    case "reset":
      return { ...state, step:1,count:0};

    default:
      throw new Error("Unkown String");
  }

  
}
function DateCounter() {
  /*   const [count, setCount] = useState(0); */
  const initialstate={count:0 , step: 1}
  const [state, dispatch] = useReducer(reducer, initialstate); // reducer take a reducer function and initial state as an arguments
  const { count, step } = state;
  /*   const [step, setStep] = useState(1); */

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count ); // as count changes re-render accur .. whih changes date 

  const dec = function () {
    dispatch({type : "dec" }); // here we pass an object with type and payload 
  };

  const inc = function () {
    dispatch({type : "inc" }); 
  };

  const defineCount = function (e) {
    dispatch({type : "defineCount" , payload: Number(e.target.value)  }); 
  };

  const defineStep = function (e) {
    dispatch({type : "defineStep" , payload: Number(e.target.value)  });
/*     setStep(Number(e.target.value)); */
  };

  const reset = function () {
    dispatch({type : "reset" });
/*     setCount(0); */
/*     setStep(1); */
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

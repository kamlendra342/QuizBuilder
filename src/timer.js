import { useEffect } from "react"

export default function Timer({ dispatch, SecoundRemaining }) {
    useEffect(function () {
        const id = setInterval(function () {
            dispatch({ type: "tick" })
        }, 1000);
        return () => clearInterval(id);    
    }, [dispatch]);

    let minutes = Math.floor(SecoundRemaining / 60);
    let seconds = SecoundRemaining % 60;
    
    return <div className="timer">
        {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </div>
}
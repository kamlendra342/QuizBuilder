import React, { useState } from 'react';


export default function Options({ questions, dispatch, answer }) {
    const hasAnswered = answer !== null;
    
    function handleClick(index) {
        dispatch({type:'newAnswer',payload: index})
    }

    return (
        <div className="options">
            {questions.options.map((el, index) => (
                <button
                    className={`btn btn-option ${index == answer ? "answer" : ""} ${hasAnswered ? index == questions.correctOption ? 'correct' : 'wrong':""}`}
                    key={index}
                    disabled={hasAnswered}
                    onClick={() => handleClick(index)}
                >
                    {el}
                </button>
            ))}
        </div>
    );
}

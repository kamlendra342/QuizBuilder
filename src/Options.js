export default function Options({option ,correctoption}) {
    console.log(correctoption)
    function handleClick(e) {
        console.log(e)
        /* if (option[correctoption] ===  ) */
        
    }
    return <div className="options">
        {
            option.map((el) => (
                <button className="btn btn-option" key={el} onClick={(e)=>{handleClick(e)}}> { el}</button>
            ))
        }
    </div>
}
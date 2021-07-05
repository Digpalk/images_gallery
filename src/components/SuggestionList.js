import React from 'react'
import '../styles/Search.css';

const SuggestionList = ({searchText,setShowSuggestion,setsearchText}) => {

    if(searchText.length>2){
        sessionStorage.setItem(searchText,0);
    }
        

        while(Object.keys(sessionStorage).length>5){
            sessionStorage.removeItem(Object.keys(sessionStorage)[0]);
        }
        // console.log(keys);
        let lists=Object.keys(sessionStorage);

        const addInInput=(event)=>{
            console.log(event.target.className)

            if(event.target.className ==='span_tag'){
                setShowSuggestion(false);
                setsearchText(event.target.textContent)
            }
        }
     
        return (
            <div className="suggestionList ch-100 row align-items-center p-3 mb-2 bg-dark text-white border border-dark" onClick={addInInput}>
            {lists.map((item,index)=>{
                return(
                    <>
                    <span className="span_tag" key={`span${index}`}>{item}</span>
                    <br/>
                    </>
                )
            })}
            </div>
        )
}

export default SuggestionList

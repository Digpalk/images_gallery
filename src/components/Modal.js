import React from 'react';
import '../styles/Search.css';

const Modal = ({selectedImg,setSelectedImg,setShowSuggestion}) => {

    setShowSuggestion(false);
    const closeImg=(event)=>{
        console.log();
        if(event.target.classList.contains('selectedImg')){
            setSelectedImg(null);
        }
        
    }

    return (
        <div className="selectedImg" onClick={closeImg}>
        console.log(selectedImg);
            <img src={selectedImg} alt="images"></img>
        </div>
    )
}

export default Modal;

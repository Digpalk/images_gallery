import React, {useState,useEffect} from 'react'
import axios from 'axios';
import '../styles/Search.css';
import SearchImages from './SearchImages';
import Modal from './Modal';
import SuggestionList from './SuggestionList';

const Search = () => {

        const [searchText, setsearchText] = useState("");
        const [recentImages, setRecentImages] = useState([]);
        const [currentpage, setCurrentPage] = useState(1);
        const [totalPage, setTotalPage] = useState('');
        const [selectedImg, setSelectedImg] = useState(null);
        const [showSuggestion, setShowSuggestion] = useState(false);

        useEffect(() => {
             getRecentImages();
             console.log("recent image api useeffect");
           
        },[])


        function getRecentImages(){
            axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=cbe8a33661d5363ad5ef6e762219e7c9&per_page=40&page='+currentpage+'&format=json&nojsoncallback=1')
            .then(res=>{
                console.log(res.data.photos.photo);
                setRecentImages(res.data.photos.photo);
                setTotalPage(res.data.photos.pages);
            }
            ).catch(err=>{
                console.log(err);
            })
        }

        const onsearchTextChange=(event)=>{
            console.log(event.target.value);
            if(event.target.value.length>0){
                setsearchText(event.target.value);
                setShowSuggestion(true);
            }else{
                setsearchText(event.target.value);
                setShowSuggestion(false);
            }
            
        }

        // window.onscroll=function(){
        //     if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
        //         console.log("scroll");
        //         setCurrentPage(currentpage+1);
        //     }
        //     console.log(window.innerHeight+document.documentElement.scrollTop);
        //     // console.log(document.documentElement.scrollTop+" document.documentElement.scrollTop");
        //     console.log(document.documentElement.offsetHeight+" document.documentElement.offsetHeight")
        // }

        const imageClick=(event)=>{
            // console.log(event.target.src);
            setSelectedImg(event.target.src);
        }
     

    return (
        <>
            <div id="header">
                <p>Search Photos</p>
                <input type="text" value={searchText} placeholder="Serach photos here" onChange={onsearchTextChange}></input>
                {showSuggestion && <SuggestionList searchText={searchText} setShowSuggestion={setShowSuggestion} setsearchText={setsearchText}/>} 
            </div>

            {searchText.length <=0 ? <div id="recent_images" onClick={imageClick}>
                {
                    recentImages.length>0 ? recentImages.map((item,index)=>{
                        return(
                            <img className="img-fluid img-thumbnail" key={item.id} src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} alt={item.title}></img>
                        )
                    })
                    :null
                }
            </div> :null }

            {searchText.length > 0 ?<SearchImages searchtext={searchText} setSelectedImg={setSelectedImg}/> : null} 

            {selectedImg ? <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} setShowSuggestion={setShowSuggestion}/> :null} 
        </>
    )
}

export default Search;

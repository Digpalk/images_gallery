import React,{useState,useEffect,useCallback} from 'react';
import axios from 'axios';
import '../styles/Search.css';

const SearchImages = (props) => {

    const {searchtext}=props;
    const {setSelectedImg}=props;
    const [searchImages, setSearchImages] = useState([])
    const [imagesNull, setImagesNull] = useState(false);

    // console.log(searchtext);
    useEffect(() => {
        // getSearchImages();
        optimiseGetSearchImages(searchtext);
        console.log("Search image api useeffect");
      
   },[searchtext])

   function getSearchImages(searchtext){
       axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a09bb7346e2caf74ee80b51187d1b3ad&tags='+searchtext+'&format=json&nojsoncallback=1')
       .then(res=>{
        //    console.log(res.data.photos.photo);
           setSearchImages(res.data.photos.photo)
           console.log("api call");
           console.log(res.data.photos.photo.length);
           if(res.data.photos.photo.length ===0){
               setImagesNull(true);
           }
       }
       ).catch(err=>{
           console.log(err);
       })
   }

   const debounce=(func)=>{
    let timer;

    return function(...args){
      const context=this;
      // args=arguments;
      if(timer){
        clearTimeout(timer);
      }
      
      timer= setTimeout(()=>{
          timer=null;
          func.apply(context,args);
      },300);
    }
  }

   const optimiseGetSearchImages=useCallback(debounce(getSearchImages),[]);

        const imageClick=(event)=>{
            // console.log(event.target.src);
            setSelectedImg(event.target.src);
        }

    return (
        <>
            <div id="recent_images" onClick={imageClick}>
                {
                    searchImages.length>0 ? searchImages.map((item,index)=>{
                        return(
                            <img className="img-fluid img-thumbnail" key={item.id} src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} alt={item.title}></img>
                        )
                    })
                    :
                    imagesNull && <div id="error">images not found !!</div>
                }
            </div>
            
        </>
    )
}

export default SearchImages;

import {useEffect, useState} from 'react';
//import GetComments from '../includes/getCommets';
import '../styling/home.scss';

export default function Home(){
    let [data, setData] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState(0)
    const moviesPerPage = 10;
    let getURL = (number)=>{
        return `https://yts.mx/api/v2/list_movies.json?limit=${moviesPerPage}&page=${number}`;}


    useEffect(
            async ()=> { 
            await fetch(getURL(currentPage))
            .then((response)=>{
                if(response.status === 200){return response.json(); }
                else{throw new Error("Error: "+ response.statusText);}
            })
            .then((json)=>{ 
                setCurrentPage(json.data.page_number);
                setData(json.data.movies);   
                setTotalPages(Math.ceil(json.data.movie_count/moviesPerPage));
            })
            .catch((error)=> {throw new Error("Error: "+ error)});      
           
    }, [currentPage]);

    let commentsToggle = (id)=>{
        const commentsContainer = document.getElementById("commments_section-" + id.toString());
        console.log("id: ", id);
       // GetComments(id);
     if(commentsContainer.style.display === 'block'){commentsContainer.style.display = 'none';}
       else{commentsContainer.style.display = 'block';}
    }
    let clearInput = (id)=>{
        document.getElementById("comment_input-"+ id.toString()).value = "";
    }

    let handleSubmit = (event, id)=>{
        event.preventDefault();
        const input = document.getElementById("comment_input-"+ id.toString()).value;
        clearInput(id);
    }
    let hideMovie = (id)=>{
        console.log("hideMovie", id);
    }
    return (<div className="home-contaienr">
                <div className="main-movies-container">
                    { data && data.map((item)=>{return (
                        <div className="single-movie-container" key={item.id}>
                            <div className="movie-image-container"><img src={item.background_image} /></div>
                            <div ><strong> {item.title}</strong></div> 
                            <div className="truncate">{item.summary }</div>
                            <div >Year: {item.year}</div>
                            <div>Genres: {item.genres}</div>
                            <div>Rationg: {item.rating} <i className="fa fa-star"></i></div>
                            <div className="comments-container">
                                <button type="button" onClick={()=>commentsToggle(item.id)} style={{padding:"2px 18px 2px 18px"}}><i className="fa fa-comments"></i></button>
                                <button type="button" onClick={()=>hideMovie(item.id)}>Hide <i className="fa fa-archive"></i></button>
                                <div style={{display:"block",marginTop:"5px"}} id={`commments_section-${item.id}`} >
                                    <form onSubmit={(e)=>handleSubmit(e, item.id)} method="post" action="." encType="application/x-www-form-urlencoded" >
                                        <textarea id={`comment_input-${item.id}`} placeholder="Write a comment..."></textarea>
                                        <button type="submit" ><i className="fa fa-save"></i></button>
                                        <button type="button" onClick={()=>clearInput(item.id)} ><i className="fa fa-trash"></i></button>
                                    </form>
                                
                                    <div className="comments-user-container">
                                        {/* <GetComments id={item.id}/> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                    <div className="pagination-container">
                        <div className="pagination-buttons-container">
                            <button type="button" onClick={()=>(setCurrentPage(1))}>First</button>
                            <button type="button" onClick={()=>(setCurrentPage((currentPage>1)?currentPage-1:1))}><i className="fa fa-angle-double-left"></i></button>
                            <button type="button"> {currentPage} of {totalPages} </button>
                            <button type="button" onClick={()=>(setCurrentPage((currentPage < totalPages)?currentPage+1:currentPage))}><i className="fa fa-angle-double-right"></i></button>
                            <button type="button" onClick={()=>(setCurrentPage(totalPages))}>Last</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}
 
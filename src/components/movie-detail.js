import {useEffect, useState} from 'react';
import '../styling/movie-detail.scss';
import { getCommentsByMovieId, setComments } from './localstorage';
import SVG from './svg';

export default function Home(){
    const movieId = document.location.pathname.slice(1);
    const [movie, setMovie] = useState([]);
    const [commentsState, setCommentsState] = useState(getCommentsByMovieId(parseInt(movieId)));
    const URL = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`;
    useEffect(
          ()=> { 
        fetch(URL)
            .then((response)=>{
                if(response.status === 200){return response.json(); }
                else{throw new Error("Error: "+ response.statusText);}
            })
            .then((data)=>{
                setMovie(data.data.movie);
                console.log(data.data.movie)   
            })
            .catch((error)=> {throw new Error("Error: "+ error)});           
    }, [URL]);

    const commentsToggle = ()=>{
        const comments = document.getElementById("row-2-comments-section");
        if(comments.className.includes('hidden')){comments.classList.remove('hidden');}
        else{comments.classList.add('hidden');}
    }
    const clearInput = ()=>{
        document.getElementById("comment-input").value = "";
        commentsToggle();
    }
    
    const handleSubmit = (event)=>{
        event.preventDefault();
        const input = document.getElementById("comment-input").value;
        clearInput();
        setComments(input, movieId);
        setCommentsState(getCommentsByMovieId(movieId));
    }
    return (<div className="content-contaienr">
                <div className="movie-container" >
                    <div className="image-container"><img alt='' src={movie.large_cover_image} /></div>
                    <div ><strong> {movie.title}</strong></div> 
                    <div className='description_full'><strong>Description:</strong> {movie.description_full}</div>
                    <div ><strong>Year: </strong>{movie.year}</div>
                    <div><strong>Genres:</strong> {movie.genres}</div>
                    <div><strong>Rating:</strong> {movie.rating} <i className="fa fa-star"></i></div>
                    <div><strong>Download:</strong> {movie.download_count} <i className="fa fa-star"></i></div>
                    <div><strong>language:</strong> {movie.language}</div>
                    <div className="comments-container">
                        <div className='row-2' >
                            <button type="button" onClick={()=>commentsToggle()} >
                                <span> Comment </span>
                            </button>
                        </div>
                        <div className='row-2 hidden' id="row-2-comments-section" >
                            <form onSubmit={(e)=>handleSubmit(e)} method="post" action="." encType="application/x-www-form-urlencoded" >
                                <textarea id='comment-input' placeholder="Write a comment..."></textarea>
                                <button type="submit" >
                                    <SVG name='comment' color='black' />
                                </button>
                                <button type="button" onClick={()=>clearInput()} >
                                    <SVG name='trash' color='black' />
                                </button>
                            </form>
                        </div>
                        <div className="row-3">
                            {commentsState.map((comment, index)=> {
                                return (<div key={index} className="comment">
                                            <div>{comment.text}</div>
                                            <div className='date-container'>{comment.date}</div>
                                        </div>);
                            })}
                        </div>
                    </div>
            </div>
        </div>
    );
}
 
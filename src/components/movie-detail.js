import {useEffect, useState} from 'react';
import '../styling/movie-detail.scss';
import { getCommentsByMovieId, setComments } from './localstorage';
import SVG from './svg';
import {Link, useParams} from 'react-router-dom';
import '../styling/comments.scss';
import Footer from './footer';

export default function MovieDetail(){
    const {movieId } = useParams();
    const [movie, setMovie] = useState([]);
    const [suggestion, setSuggestion] = useState([]);
    const [commentsState, setCommentsState] = useState(getCommentsByMovieId(parseInt(movieId)));
    const URL = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`;
    useEffect(()=> { 
        fetch(URL)
            .then(res => res.json())
            .then((data)=>{
                setMovie(data.data.movie);
            })
            .catch((error)=> {console.log(error)});
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.status === 200 && this.readyState === 4){
                setCommentsInDom(this.response);
            }
        }
        xhttp.open("GET", `https://yts.mx/ajax/comments/${movieId}?offset=0`, true);
        xhttp.send();

        fetch("https://yts.mx/api/v2/movie_suggestions.json?movie_id="+movieId)
            .then(res => res.json())
            .then((data)=>{
                setSuggestion(data.data.movies);
            })
            .catch((error)=> {console.log(error)});        
    }, [URL, movieId]);

    const commentsToggle = ()=>{
        const comments = document.getElementById("row-2-comments-section");
        if(comments.className.includes('hidden')){comments.classList.remove('hidden');}
        else{comments.classList.add('hidden');}
    }
    const clearInput = ()=>{
        document.getElementById("comment-input").value = "";
        commentsToggle();
    }
    const setCommentsInDom = (comments)=> {
        const container = document.querySelector('.comments-api-container');
        if(comments){
            container.innerHTML =  comments;
            const anchors = document.querySelectorAll('.avatar-thumb');
            for(let i = 0; i < anchors.length; i++){
                anchors[i].removeAttribute('href');
            }
        }
    }
    const splitGenres = (genres)=> {
        if(genres){
            const container = document.createElement('div');
            for(let i =0; i < genres.length; i++){
                let child = document.createElement('span');
                child.innerText = (i < genres.length - 1)? genres[i] + ', ': genres[i] ;
                container.append(child);
            }
            return container.innerText;
        }
        return null;
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        const input = document.getElementById("comment-input").value;
        clearInput();
        setComments(input, movieId);
        setCommentsState(getCommentsByMovieId(parseInt(movieId)));
    }
    return (<>
            <div className="content-contaienr">
                <div className="movie-container" >
                    <div className="image-container"><img alt='' src={movie.large_cover_image} /></div>
                    <div ><strong> {movie.title}</strong></div> 
                    <div className='description_full'><strong>Description:</strong> {movie.description_full}</div>
                    <div ><strong>Year: </strong>{movie.year}</div>
                    <div><strong>Genres:</strong> {splitGenres(movie.genres)}</div>
                    <div><strong>Rating:</strong> {movie.rating} <i className="fa fa-star"></i></div>
                    <div><strong>Download:</strong> {movie.download_count} <i className="fa fa-star"></i></div>
                    <div><strong>language:</strong> {movie.language}</div>
                    <div className="comments-container">
                        <div className='row-2' >
                            <button type="button" onClick={()=>commentsToggle()} ><span> Comment </span></button>
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
                    </div>
                </div>
                <div className="comments-storage-container">
                    {getCommentsByMovieId(movieId).map((comment, index)=> {
                        return (<div key={index} className="comment">
                                    <div className='avatar-thumb'>
                                        <img alt='' src='https://img.yts.mx/assets/images/users/thumb/default_avatar.jpg' />    
                                    </div>
                                    <div>
                                        <div className='comment-text'><span>{comment.date}</span></div>
                                        <div className='comment-text'>
                                            <p>{comment.text}</p></div>
                                    </div>
                                </div>);
                    })}
                </div>
                <div className='comments-api-container'></div>
                <div className='movie-suggestion-container'>
                        {suggestion && suggestion.map((item, index)=> {return (<div className='suggestion-container' key={index}>
                            <div className='image'>
                                <Link to={'/id='+ item.id}>
                                    <img alt="" src={item.medium_cover_image} />
                                </Link>
                            </div>
                            <div className='title'>{item.title}</div>
                            <div className='year' >{item.year}</div>
                        </div>)})}
                </div>
        </div>
        <Footer/>
        </>);
}
 
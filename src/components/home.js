import {useEffect, useState} from 'react';
import {Link } from 'react-router-dom';
import '../styling/home.scss';
import Footer from './footer';
import SVG from './svg';

export default function Home(){
    let [data, setData] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState(0)
    const moviesPerPage = 20;
    let getURL = (number)=>{return `https://yts.mx/api/v2/list_movies.json?limit=${moviesPerPage}&page=${number}`;}

    useEffect(
            ()=> { 
             fetch(getURL(currentPage))
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

    return (<>
    <div className="home-container">
                <div className="pagination-container">
                    <div className="pagination-buttons-container">
                        <button type="button" onClick={()=>(setCurrentPage(1))}><span className='text'>First</span></button>
                        <button type="button" onClick={()=>(setCurrentPage((currentPage>1)?currentPage-1:1))}>
                            <SVG name='angles-left' color='black' />
                        </button>
                        <button type="button"> {currentPage} of {totalPages} </button>
                        <button type="button" onClick={()=>(setCurrentPage((currentPage < totalPages)?currentPage+1:currentPage))}>
                            <SVG name='angles-right' color='black' />
                            </button>
                        <button type="button" onClick={()=>(setCurrentPage(totalPages))}><span className='text'>Last</span></button>
                    </div>
                </div>
                <div className="main-movies-container">
                    { data && data.map((item)=>{return (
                        <div className="single-movie-container" key={item.id}>
                            <div className='row-1'>
                                <div className="movie-image-container">
                                    <Link to={'/id='+ item.id }><img alt='' src={item.medium_cover_image } /></Link>
                                </div>
                            </div>
                            <div className='row-2'>
                                <div ><strong> {item.title}</strong></div> 
                                <div className="truncate">{item.summary }</div>
                                <div >Year: {item.year}</div>
                                <div>Genres: {item.genres.map((item, index)=> {return <span key={index}> {item}</span>})}</div>
                                <div>Rationg: {item.rating} <i className="fa fa-star"></i></div>
                                <div className='view-details-container'><Link to={'/id='+ item.id }>View details</Link></div>
                            </div>
                        </div>
                    )})}
                </div>
                <div className="pagination-container">
                    <div className="pagination-buttons-container">
                        <button type="button" onClick={()=>(setCurrentPage(1))}><span className='text'>First</span></button>
                        <button type="button" onClick={()=>(setCurrentPage((currentPage>1)?currentPage-1:1))}>
                            <SVG name='angles-left' color='black' />
                        </button>
                        <button type="button"> {currentPage} of {totalPages} </button>
                        <button type="button" onClick={()=>(setCurrentPage((currentPage < totalPages)?currentPage+1:currentPage))}>
                            <SVG name='angles-right' color='black' />
                            </button>
                        <button type="button" onClick={()=>(setCurrentPage(totalPages))}><span className='text'>Last</span></button>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
    );
}
 
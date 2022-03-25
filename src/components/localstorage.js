"use-strict";

export const setComments = (comment_text, MOVIE_ID)=> {
    const comments = getComments();
    const comment = {
        text:comment_text,
        date:getFullDate(),
        movie_id:parseInt(MOVIE_ID),
    }
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}
export const getComments = ()=> {
    const comments = JSON.parse(localStorage.getItem('comments'));
    if(comments){
        return comments;
    }
    localStorage.setItem('comments', JSON.stringify([]));
    return [];
}
export const getCommentsByMovieId = (MOVIE_ID)=> {
    const comments = getComments();
    let commentsByMovieId = [];
    for(let i = 0; i < comments.length; i++){
        if(parseInt(comments[i].movie_id) === parseInt(MOVIE_ID)){
            commentsByMovieId.push(comments[i]);
        }
    }
    return commentsByMovieId;
}


const getFullDate = ()=> {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemberry'];
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const DISPLAY = (item)=> {return ((item < 10)?("0" + item.toString()): item.toString());  }
    return  months[month] + ' '+  DISPLAY(day).toString() + ', ' + year.toString()  + ' at '+ DISPLAY(hours) + ':' + DISPLAY(minutes);
}
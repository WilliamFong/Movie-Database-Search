const 
    moviedb = require('moviedb'),
    inquirer = require('inquirer')

const getSearch = (query) => {
    console.log(query)
    moviedb.multiSearch(query)
        .then(results=> console.log(results))
}

const getTvSearch = (query) => {
     
}

const getPersonSearch = (query) => {
    
}
const getMovieSearch = (query) => {
    
}
const infoPromt = (result) =>{
    //display info once user choses from search results
}

module.exports = {
    getSearch
}

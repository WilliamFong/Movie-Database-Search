const 
    moviedb = require('moviedb'),
    inquirer = require('inquirer')

    //for tv get the overview, name, fits_air_date
    //for movie get overview, release_date, title
    //for people known_for, (follow above info), name

const getSearch = (query) => {
    moviedb.multiSearch(query)
        .then(search => {
            let list = search.results.map(item =>{
                if(item.media_type ==='movie')
                    return getMovieObj(item)
                else if(item.media_type ==='tv'){
                    return getTvObj(item)
                 }
                else{
                    return getPersonObj(item)
                }
            })
            showPromt(list)
                .then(selected =>{
                    print(list[selected.search.slice(0, selected.search.indexOf(')'))-1])
                })
        })
}

const showPromt = (list)=>{
    let index = 1
    let choices =  list.map(item => {
        return `${index++}) ${item.media_type} : ${item.name}`
    })
    return inquirer.prompt([{
        type: 'list',
        message: 'select results to find out more',
        name: 'search',
        choices: choices
    }])
}


const getTvSearch = (query) => {
     
}

const getPersonSearch = (query) => {
    
}
const getMovieSearch = (query) => {
    
}
const print = (item) =>{
    //display info once user choses from search results
    //todo person is harder since it has known for
    if(item.media_type == 'movie')
       console.log(`name: ${item.name}\ntype: ${item.media_type} \nrelease_date: ${item.release_date} \noverview: ${item.overview}`)
    else if(item.media_type == 'tv')
        console.log(item)
    else if(item.media_type == 'person'){
        console.log(item)
    }

}

const getMovieObj = (item) =>{
    return ({
        // id : item.id,
        name : item.title,
        release_date : item.release_date,
        overview : item.overview,
        media_type : 'movie'
})
}
 
const getTvObj = (item) =>{
    return ({
        // id : item.id,
        name: item.name,
        first_air_date : item.first_air_date,
        overview : item.overview,
        media_type : 'tv'
    })
}

const getPersonObj = (item) =>{
    return({
        name: item.name,
        media_type : 'person',
        known_for: item.known_for.map(film =>{
            if(item.media_type ==='movie'){
                return(getMovieObj(film))
            }
            else if(item.media_type ==='tv'){
                return(getTvObj(film))
             }
        })

    })
}

module.exports = {
    getSearch
}

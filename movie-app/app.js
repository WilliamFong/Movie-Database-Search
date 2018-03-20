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
                if(item.media_type ==='movie'){
                    return({
                            // id : item.id,
                            name : item.title,
                            release_date : item.release_date,
                            overview : item.overview,
                            media_type : item.media_type
                    })
                }
                else if(item.media_type ==='tv'){
                    return({
                        // id : item.id,
                        name: item.name,
                        first_air_date : item.first_air_date,
                        overview : item.overview,
                        media_type : item.media_type
                    })
                 }
                else{
                    return({
                        // id : item.id,
                        name: item.name,
                        media_type : item.media_type,
                        known_for: item.known_for.map(film =>{
                            if(item.media_type ==='movie'){
                                return({
                                        name : item.title,
                                        release_date : item.release_date,
                                        overview : item.overview,
                                        media_type : item.media_type
                                })
                            }
                            else if(item.media_type ==='tv'){
                                return({
                                    name: item.name,
                                    first_air_date : item.first_air_date,
                                    overview : item.overview,
                                    media_type : item.media_type
                                })
                             }
                        })

                    })
                }
            })
            showPromt(list)
                .then(selected =>{
                    console.log(list[selected.search.slice(0, selected.search.indexOf(')'))])
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
const print = (result) =>{
    //display info once user choses from search results
}

module.exports = {
    getSearch
}

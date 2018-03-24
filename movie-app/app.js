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
                    moviedb.getItem(selected.search.from, selected.search.id)
                        .then(results => {
                            if(selected.search.from == 'tv'){
                                print(getTvObj(results))
                            }else if(selected.search.from == 'person'){
                                print(formatPerson(results))
                            }else if(selected.search.from == 'movie'){
                                print(getMovieObj(results))
                            }
                        })
                })
        })
}

const showPromt = (list)=>{
    let index = 1
    let choices =  list.map(item => {
        return {name: item.name, value: {id: item.id, from: item.media_type}} 
    })
    return inquirer.prompt([{
        type: 'list',
        message: 'select results to find out more',
        name: 'search',
        choices: choices
    }])
}



const getTvSearch = (query) => {
    moviedb.tvSearch(query)
        .then(results => {
            let list = results.results.map(item => getTvObj(item))
            showPromt(list)
            .then(selected =>{
                moviedb.getItem(selected.search.from, selected.search.id)
                .then(results => print(getTvObj(results)))
            })

        })
}

const getPersonSearch = (query) => {
    moviedb.personSearch(query)
        .then(results => {
            let list = results.results.map(item => getPersonObj(item))
            showPromt(list)
            .then(selected =>{
                moviedb.getItem(selected.search.from, selected.search.id)
                .then(results => print(formatPerson(results)))
            })

        })
}

const getMovieSearch = (query) => {
    moviedb.movieSearch(query)
        .then(results => {
            let list = results.results.map(item => getMovieObj(item))
            showPromt(list)
            .then(selected =>{
                moviedb.getItem(selected.search.from, selected.search.id)
                .then(results => print(getMovieObj(result)))
            })

        })
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
        id : item.id,
        name : item.title,
        id: item.id,
        release_date : item.release_date,
        overview : item.overview,
        media_type : 'movie'
})
}
 
const getTvObj = (item) =>{
    return ({
        id : item.id,
        name: item.name,
        first_air_date : item.first_air_date,
        overview : item.overview,
        media_type : 'tv'
    })
}

const getPersonObj = (item) =>{
    return({
        id : item.id,
        name: item.name,
        media_type : 'person',
        known_for: item.known_for.map(film =>{
            if(film.media_type ==='movie'){
                return(getMovieObj(film))
            }
            else if(film.media_type ==='tv'){
                return(getTvObj(film))
             }
        })
    })
}

const formatPerson = (person) =>{
    return {
        name: person.name,
        bday: person.birthday,
        place_of_birth: person.place_of_birth,
        bio: person.biography,
        media_type: 'person'
    }
}

module.exports = {
    getSearch,
    getTvSearch,
    getPersonSearch,
    getMovieSearch
}

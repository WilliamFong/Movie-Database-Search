const
    moviedb = require('moviedb'),
    inquirer = require('inquirer'),
    printMessage = require('print-message'),
    wrap = require('wordwrap')(100)

    //for tv get the overview, name, fits_air_date
    //for movie get overview, release_date, title
    //for people known_for, (follow above info), name

const getSearch = (query) => {
    moviedb.multiSearch(query)
        .then(search => {
            let list = search.results.map(item => {
                if (item.media_type ==='movie')
                    return getMovieObj(item)
                else if (item.media_type ==='tv') {
                    return getTvObj(item)
                 }
                else {
                    return getPersonObj(item)
                }
            })

            if (list.length > 0) {
                showPrompt(list)
                .then(selected => {
                    moviedb.getItem(selected.search.from, selected.search.id)
                        .then(results => {
                            if (selected.search.from == 'tv') {
                                print(getTvObj(results))
                            } else if (selected.search.from == 'person') {
                                print(formatPerson(results))
                            } else if (selected.search.from == 'movie') {
                                print(getMovieObj(results))
                            }
                        })
                })
            } else {
                console.log('No Results Found.')
            }
        })
}

const showPrompt = (list)=>{
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
            if (list.length > 0) {
                showPrompt(list)
                .then(selected => {
                    moviedb.getItem(selected.search.from, selected.search.id)
                    .then(results => print(getTvObj(results)))
                })
            } else {
                console.log('No Results Found.')
            }
        })
}

const getPersonSearch = (query) => {
    moviedb.personSearch(query)
        .then(results => {
            let list = results.results.map(item => getPersonObj(item))
            if (list.length > 0) {
                showPrompt(list)
                .then(selected => {
                    moviedb.getItem(selected.search.from, selected.search.id)
                    .then(results => print(formatPerson(results)))
                })
            } else {
                console.log('No Results Found.')
            }
        })
}

const getMovieSearch = (query) => {
    moviedb.movieSearch(query)
        .then(results => {
            let list = results.results.map(item => getMovieObj(item))

            if (list.length > 0) {
                showPrompt(list)
                .then(selected => {
                    moviedb.getItem(selected.search.from, selected.search.id)
                    .then(results => print(getMovieObj(results)))
                })
            } else {
                console.log('No Results Found.')
            }
        })
}

const print = (item) => {
    //display info once user choses from search results
    if (item.media_type == 'movie') {
        console.log('-----------------------------------------------------------------------------------------------------')
        printMessage(['Name: ', item.name + '\n', 'Type: ', item.media_type + '\n', 'Release Date: ', item.release_date + '\n', 'Overview: ', wrap(item.overview)],{
        border: false,
        color: 'blue'
        })
        console.log('-----------------------------------------------------------------------------------------------------')
    }
    else if (item.media_type == 'tv') {
        console.log('-----------------------------------------------------------------------------------------------------')
        printMessage(['Name: ', item.name + '\n', 'Type: ', item.media_type + '\n', 'Release Date: ', item.first_air_date + '\n', 'Overview: ', wrap(item.overview)],{
        border: false,
        color: 'red'
        })
        console.log('-----------------------------------------------------------------------------------------------------')
    }
    else if (item.media_type == 'person') {
        console.log('-----------------------------------------------------------------------------------------------------')
        printMessage(['Name: ', item.name + '\n', 'Birthday: ', item.bday + '\n', 'Place of Birth: ', item.place_of_birth + '\n', 'Biography: ', wrap(item.bio)],{
        border: false,
        color: 'green'
        })
        console.log('-----------------------------------------------------------------------------------------------------')
    }

}

const getMovieObj = (item) => {
    return ({
        id : item.id,
        name : item.title,
        id: item.id,
        release_date : item.release_date,
        overview : item.overview,
        media_type : 'movie'
    })
}
 
const getTvObj = (item) => {
    return ({
        id : item.id,
        name: item.name,
        first_air_date : item.first_air_date,
        overview : item.overview,
        media_type : 'tv'
    })
}

const getPersonObj = (item) => {
    return ({
        id : item.id,
        name: item.name,
        media_type : 'person',
        known_for: item.known_for.map(film => {
            if (film.media_type === 'movie') {
                return(getMovieObj(film))
            }
            else if (film.media_type === 'tv') {
                return(getTvObj(film))
            }
        })
    })
}

const formatPerson = (person) => {
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

const 
    config = require('./config'),
    superagent = require('superagent')

    // need help look at https://developers.themoviedb.org/3/search/search-tv-shows
    // look at the tabs on left for search tb search people and search movies
    const _fetch = (command) =>{
        return superagent.get(`${config.url}/${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
    }
exports.tvSearch = (query) => {
    if(query != null){
        return _fetch(`search/tv?api_key=${config.apiKey}&query=${query}`)
    }else
        return -1
}

exports.movieSearch = (query) => {
    if(query != null){
        return _fetch(`search/movie?api_key=${config.apiKey}&query=${query}`)
    }else
        return -1
}

exports.personSearch = (query) => {
    if(query != null){
        return _fetch(`search/person?api_key=${config.apiKey}&query=${query}`)
    }else
        return -1
}

//this will be default search
exports.multiSearch = (query) =>{
    if(query != null){
        return _fetch(`search/multi?api_key=${config.apiKey}&query=${query}`)
    }else
        return -1
}

exports.getItem = (from, id) =>{
    return _fetch(`${from}/${id}?api_key=${config.apiKey}`)
}


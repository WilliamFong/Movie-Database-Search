const 
    app = require('./app'),
    yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
                    .command({
                        command: 'search',
                        desc: 'search the moviedb api',
                        builder: (yargs) => {
                            return yargs.option('p', {
                                alias: 'person',
                                describe: 'search moviedb base on person search'
                            }).option('t', {
                                alias: 'television',
                                describe: 'search moviedb base on televsion search'
                            }).option('m',{
                                alias: 'movies',
                                describe: 'search moviedb base on movie search'
                            } )
                            .help('h')
                        },
                        //make sure user only search one at a time
                        //handler will use to see what to search if no options are chosen the use multi search
                        handler: (argv) => {

                            //when user just put search <arg>
                            if(argv._.length >1  & argv.p == null & argv.t == null & argv.m ==null){
                                app.getSearch(argv._.slice(1).join('+'))
                            }
                            //implemnt when user puts -tv -p -m 
                            if(argv.t != null & argv.p == null & argv.m ==null){
                                app.getTvSearch(`${argv.t}${argv._.slice(1).join('+')}`)
                            }
                            else if(argv.p != null & argv.t == null & argv.m ==null){
                                app.getPersonSearch(`${argv.p}${argv._.slice(1).join('+')}`)
                            }
                            else if(argv.m != null & argv.p == null & argv.t == null){
                                app.getMovieSearch(`${argv.m}${argv._.slice(1).join('+')}`)
                            }else{
                                yargs.showHelp()
                            }
                        }
                    })
                    .help('help')
                    .argv

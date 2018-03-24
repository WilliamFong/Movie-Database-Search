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
                            if(argv._.length >1){
                                app.getSearch(argv._[1])
                            }
                            //implemnt when user puts -tv -p -m 
                            if(argv.t != null){
                                app.getTvSearch(argv.t)
                            }
                            if(argv.p != null) {
                                app.getPersonSearch(argv.p)
                            }
                        }
                    })
                    .help('help')
                    .argv

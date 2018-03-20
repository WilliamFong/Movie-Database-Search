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
                                describe: 'searcg noviedb base on movie search'
                            } )
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
                                console.log(argv.t)
                            }
                        }
                    })
                    .help('help')
                    .argv

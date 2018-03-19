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
                            }).option('tv', {
                                alias: 'Television',
                                describe: 'search moviedb base on televsion search'
                            }).option('m',{
                                alias: 'Movies',
                                describe: 'searcg noviedb base on movie search'
                            } )
                        },
                        //make sure user only search one at a time
                        //handler will use to see what to search if no options are chosen the use multi search
                        handler: (argv) => { console.log(argv)}
                    })
                    .help('help')
                    .argv

import { Command, Option } from 'commander'

import JokeService from './joke/joke.service'
import {
    printJoke,
    printErrorMessage,
    printLocalJoke,
} from './jokerator.service'

const program = new Command()

program
    .description('Shows a random joke in the selected categories')
    .addOption(
        new Option('-c, --categories [category...]', 'set categories of jokes')
            .default('any', 'random category')
            .choices([
                'any',
                'misc',
                'programming',
                'dark',
                'pun',
                'spooky',
                'christmas',
            ]),
    )
    .showSuggestionAfterError()
    .parse()

const jokeApi = new JokeService(program.getOptionValue('categories'))

jokeApi
    .parseAwait()
    .then((joke) => printJoke(joke))
    .catch((e) => {
        printErrorMessage(e)
        printLocalJoke()
    })

// It also works

// jokeApi
//     .parseThen()
//     .then((joke) => printJoke(joke))
//     .catch((e) => {
//         printErrorMessage(e)
//         printLocalJoke()
//     })

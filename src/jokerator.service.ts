import jokeList from './joke/data/jokes.json'
import JokeType from './joke/enums/joke-type.enum'
import ParseError from './joke/errors/parse.error'
import ResponseError from './joke/errors/response.error'
import Joke from './joke/interfaces/joke.interface'

/**
 * Print a joke
 * @param jokeObject - joke object
 * @returns void
 */
export function printJoke(jokeObject: Joke): void {
    console.log(`The category: ${jokeObject.category}\n`)
    if (jokeObject.type === JokeType.Single) {
        console.log(jokeObject.joke)
    } else {
        console.log(`${jokeObject.setup}\n\n${jokeObject.delivery}`)
    }
}

/**
 * Print an error message
 * @param error - error object
 * @returns void
 */
export function printErrorMessage(error: Error): void {
    if (error instanceof ResponseError) {
        console.log(
            `Oops! ${error.message}.`,
            'Available categories: any, misc, programming, dark, pun, spooky, christmas.',
            "\nBut we won't leave you without a joke ;)\n",
        )
    } else if (error instanceof ParseError) {
        console.log(
            `Oops! ${error.message}, but we won\'t leave you without a joke ;)\n`,
        )
    } else {
        console.log(
            "Oops! Something went wrong, but we won't leave you without a joke ;)\n",
        )
    }
}

/**
 * Print a saved joke
 */
export function printLocalJoke(): void {
    const randomJoke = <Joke>(
        jokeList[Math.floor(Math.random() * jokeList.length)]
    )
    printJoke(randomJoke)
}

import JokeCategory from './joke/enums/category-type.enum'
import Joke from './joke/interfaces/joke.interface'
import JokeService from './joke/joke.service'

// Number of tests
const N = 20

/**
 * Print an error message
 * @param e - error object
 * @returns void
 */
function onError(e: Error): void {
    console.log(`\nOops! Something went wrong.`, `\n${e.message}`)
}

/**
 * Test synchronous get of jokes
 * @async
 * @returns Promise<void>
 */
async function testSync(): Promise<void> {
    console.time('sync parse')
    try {
        for (let i = 0; i < N; i++) {
            await new JokeService(JokeCategory.Any).parseAwait()
        }
    } catch (e) {
        onError(e)
    }
    console.timeEnd('sync parse')
}

/**
 * Test asynchronous get of jokes
 * @async
 * @returns Promise<void>
 */
async function testAsync(): Promise<void> {
    const jokes: Promise<Joke>[] = []

    for (let i = 0; i < N; i++) {
        jokes.push(new JokeService(JokeCategory.Any).parseAwait())
    }

    console.time('async parse')
    await Promise.all(jokes).catch((e) => onError(e))
    console.timeEnd('async parse')
}

console.log(`N = ${N}`)
testAsync()
testSync()

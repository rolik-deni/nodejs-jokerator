import ApiError from './api-error.interface'
import Joke from './joke.interface'

/**
 * API response interface
 */
export default interface JokeResponse extends Joke, ApiError {}

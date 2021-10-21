import CategoryType from '../enums/category-type.enum'
import JokeType from '../enums/joke-type.enum'

/**
 * Joke interface
 */
export default interface Joke {
    category: CategoryType
    type: JokeType
    setup?: string
    delivery?: string
    joke?: string
}

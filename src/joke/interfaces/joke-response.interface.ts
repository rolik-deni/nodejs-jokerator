import CategoryType from '../enums/category-type.enum'
import JokeType from '../enums/joke-type.enum'

/**
 * API response interface
 */
export default interface JokeResponse {
    readonly error: boolean
    readonly category: CategoryType
    readonly code: number
    readonly message: string
    readonly type: JokeType
    readonly joke: string
    readonly setup: string
    readonly delivery: string
}

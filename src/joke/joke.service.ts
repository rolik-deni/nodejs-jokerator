import axios, { AxiosRequestConfig } from 'axios'

import JokeCategory from './enums/category-type.enum'
import JokeType from './enums/joke-type.enum'
import ParseError from './errors/parse.error'
import ResponseError from './errors/response.error'
import JokeResponse from './interfaces/joke-response.interface'
import Joke from './interfaces/joke.interface'

/**
 * Parses jokes from https://v2.jokeapi.dev/
 */
export default class JokeService {
    /**
     * Сreate an api request
     * @static
     * @param categories - list of categories to be searched for
     * @returns void
     */
    protected static generateRequest(
        categories: JokeCategory[] | JokeCategory.Any,
    ): AxiosRequestConfig {
        return {
            url: [categories].join(','),
            method: 'get',
            baseURL: 'https://v2.jokeapi.dev/joke/',
        }
    }

    /**
     * Execute a request to the api. Await version
     * @static
     * @returns Promise<Joke>
     */
    static async parseAwait(
        categories: JokeCategory[] | JokeCategory.Any,
    ): Promise<Joke> {
        const response = await axios.request<JokeResponse>(
            this.generateRequest(categories),
        )
        return this.parse(response.data)
    }

    /**
     * Execute a request to the api. Then version
     * @returns Promise<Joke>
     */
    static parseThen(
        categories: JokeCategory[] | JokeCategory.Any,
    ): Promise<Joke> {
        return axios
            .request<JokeResponse>(this.generateRequest(categories))
            .then((response) => this.parse(response.data))
    }

    /**
     * Parse the api response
     * @protected
     * @static
     * @param data - data returned by the api
     * @returns Joke
     * @throws ResponseError
     * @throws ParseError
     */
    protected static parse(data: JokeResponse): Joke {
        if (data.type === JokeType.Single) {
            return { category: data.category, type: data.type, joke: data.joke }
        } else if (data.type === JokeType.TwoPart) {
            return {
                category: data.category,
                type: data.type,
                setup: data.setup,
                delivery: data.delivery,
            }
        } else if (data.error) {
            throw new ResponseError(data.code, data.message)
        } else {
            throw new ParseError(
                'The joke API joked and returned an unexpected result',
            )
        }
    }
}

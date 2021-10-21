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
    categories: JokeCategory[] | JokeCategory.Any
    request: AxiosRequestConfig

    /**
     * Constructs the JokeService class
     * @param categories - list of categories to be searched for
     * @constructor
     */
    constructor(
        categories: JokeCategory[] | JokeCategory.Any = JokeCategory.Any,
    ) {
        this.categories = categories
        this.generateRequest()
    }

    /**
     * Сreate an api request
     */
    generateRequest(): void {
        this.request = {
            url: [this.categories].join(','),
            method: 'get',
            baseURL: 'https://v2.jokeapi.dev/joke/',
        }
    }

    /**
     * Execute a request to the api. Await version
     * @returns Promise<Joke>
     */
    async parseAwait(): Promise<Joke> {
        const response = await axios.request<JokeResponse>(this.request)
        return this.parse(response.data)
    }

    /**
     * Execute a request to the api. Then version
     * @returns Promise<Joke>
     */
    parseThen(): Promise<Joke> {
        return axios
            .request<JokeResponse>(this.request)
            .then((response) => this.parse(response.data))
    }

    /**
     * Parse the api response
     * @param data - data returned by the api
     * @returns Joke
     * @throws ResponseError
     * @throws ParseError
     */
    parse(data: JokeResponse): Joke {
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

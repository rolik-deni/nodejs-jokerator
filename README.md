# Jokerator

Shows a random joke in the selected categories

## Build application

```bash
$ npm run build
```

## Usage

### Examples
Random category
```bash
$ npm start
```
Or specific categories
```bash
$ npm start -- -c dark programming
```
### Help
```bash
$ npm start -- --help
Usage: jokerator [options]

Shows a random joke in the selected categories

Options:
  -c, --categories [category...]  set categories of jokes (choices: "any", "misc", "programming", "dark", "pun", "spooky", "christmas", default: random category)
  -h, --help                      display help for command
```

## Benchmark

```bash
$ npm run test:benchmark
```
Response example
```
N = 20
async parse: 368.048ms
sync parse: 4.867s
```


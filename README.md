# pick-a-place-to-eat

Node application that helps you find a place to eat when you can't make the decison on your own.

#### Things you will need to run
* Google API key
* node
* git

### How to run

1. Clone the project
2. Go to the cloned folder `cd pick-a-place-to-eat/`
3. Install dependencies with `npm install`
4. Add a file called `config.json` at the root of the project with a google api key like this..
```javascript 
{
    "googleApiKey": "your google api key here"
}
``` 
5. Find a place to eat by running the application with `node app.js` with the appropriate arguments

### Arguments
| Argument | Alias | Required | Default Value | Example |
|:--------:|:-----:|:--------:|:-------------:|:-------------:|
| address  | `-a`  |  `true`  |      N/A      | `node app.js -a 45327`<br/>  `node app.js -a "10202 West Washington Blvd"` |
| radius   | `-r`  |  `false` | 50,000 meters | `node app.js -a 45327 -r 40000` |

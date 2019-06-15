# `pinp`
> `pinp` is not packery


<br>

## Installation

```sh
$ npm install --save pinp
```

## Usage

##### Usage with a module bundler
```js
// using ES6 module
import pinp from 'pinp'

// using CommonJS module
var pinp = require('pinp')
```

##### Usage from a browser

```html
<script src="https://unpkg.com/pinp"></script>
<script>
  window.pinp()
</script>
```

## Development
```console
$ npm install     # install all npm dependencies
$ npm run start   # start the dev server with livereload on the example folder
$ npm run build   # bundle your library in CJS / UMD / ESM
$ npm run deploy  # deploy your example folder on a gh-page branch
$ npm run test    # lint your js inside the src folder
``` 

## License
[MIT.](https://tldrlegal.com/license/mit-license)

# `pinp`
> `pinp` is not packery

<br>

## Usage
##### Import with a module bundler

```console
$ npm install --save pinp
```

```js
// using ES6 module
import pinp from 'pinp'

// using CommonJS module
var pinp = require('pinp')
```

##### Import from a browser

```html
<script src="https://unpkg.com/pinp"></script>
<script>
  // window.pinp is exposed
</script>
```

### Quickstart
```js
import pinp from 'pinp'

const grid = pinp('.pinp-container')

const elements = document.querySelectorAll('.pinp-element')
for (let i = 0; i < elements.length; i++) {
  grid.add(elements[i])
}

grid.update()
```
<sup>See [`example`](example/) for a detailed implementation.</sup>

## API

See [docs/API](docs/API.md).

## Development
```console
$ npm install     # install all npm dependencies
$ npm run start   # start the dev server with livereload on the example folder
$ npm run build   # bundle your library in CJS / UMD / ESM
$ npm run test    # lint your js inside the src folder

$ npm version [major|minor|patch] # bundle, create a new release, publish to npm and deploy example/ to gh-page
``` 

## License
[MIT.](https://tldrlegal.com/license/mit-license)

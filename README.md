# `pinp`
> `pinp` is not packery


<br>

## Installation

```console
$ npm install --save pinp
```

## Usage

##### Import with a module bundler
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

##### API

```js
const options = {
  container: '.pinp-container', // can be HTMLElement or string selector
  debug: false,
  grid: [50, 50],
  maxSolverIterations: 999, 
  noOOB: true,
  pushBehavior: 'both', // 'horizontal', 'vertical' or 'both'
  updateContainerHeight: true,
  updateContainerWidth: true,

  lastDraggedClassname: 'last-dragged',
 
  willUpdate: function () {}, 
  didUpdate: function () {}
}

const grid = pinp(options)

const element = document.getElementById('myElement')
const addtionalDragabillyOptions = { handle: '.handle' }
const box = grid.add(element, addtionalDragabillyOptions)
box.dragInstance.on('dragStart', () => console.log('the box moves'))

grid.update()
grid.remove(box)

console.log(grid.width)
console.log(grid.height)
console.log(grid.boxes.length)
```
<sup>See [`example`](example/) for a detailed implementation.</sup>

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

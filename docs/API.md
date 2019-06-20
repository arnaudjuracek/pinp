# API

## Table of contents
- [`<pinp> = pinp(container, [options])`](#--pinpcontainer-options)
- [`box = <pinp>.add(element, [draggabilyOptions])`](#--addelement-draggabilyoptions)
- [`<pinp>.remove(box)`](#removebox)
- [`<pinp>.update()`](#update)
- [`<pinp>.width`](#width)
- [`<pinp>.height`](#height)
- [`<pinp>.boxes`](#boxes)

<br>

## `<pinp> = pinp(container, [options])`
Sets up a new instance of `pinp`, where `container` is either a [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) or a [`string` selector](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors#Selectors).   
The return value is a `<pinp>` instance.

###### example
```js
import pinp from 'pinp'

const grid = pinp('.pinp-container', {
  grid: [20, 20], 
  boundaries: {
    top: 'hard',
    left: 'soft',
    right: 'soft',
    bottom: 'hard'
  }
})
```

### `options`
All settings are optionnal.

#### `debug` (Boolean)
- Use this to get additional logs and datas during development.
- Default: `false`

#### `grid` (Array)
- `[x,y]` steps of the grid to which the elements will snap to.
- Default: `[0, 0]`

#### `maxSolverIterations` (Number)
- Set the maximum possible iterations for a packing operation.
- Default: `999`

#### `boundaries`  (Object)
- Object describing for each boundaries (`top`, `left`, `right` and `bottom`) its behavior when an element reaches it.
- Available behaviors are:
  - `'none'` (default): the element acts as there is no boundary, and overflow its container.
  - `'soft'`: the boundary follows the element, changing the size of the container if needed.
  - `'hard'`: the element is pushed against the boundary, moving along it naturally.
- Default: `{ top: 'none', left: 'none', right: 'none', bottom: 'none' }`
- Note: use the `'hard'` behavior carefully, as it may causes some packing issues in certain cases.

#### `pushDirection` (String)
- Lock the pushing behavior in a specific direction.
- Possible values: 
  - `'vertical'`: the elements can only move vertically when pushed.
  - `'horizontal'`: the elements can only move horizontally when pushed.
  - `'both'` (default): the elements can be pushed both vertically and horizontally.
- Default: `'both'`

#### `lastDraggedClassname` (String)
- Classname added to the most recent dragged element in the container.
- Default: `'last-dragged'`

#### `willUpdate` (Function)
- Pre-update hook, will be called just before packing.
- Default: `function () {}` 

#### `didUpdate` (Function)
- Post-update hook, will be called just after packing.
- Default: `function () {}` 

<br>

## `<pinp.Box> = <pinp>.add(element, [draggabilyOptions])`
Add a packable element to a `<pinp>` instance, where `element` is either a [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) or a [`string` selector](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors#Selectors).   
A second optional argument can be passed to define specific [**Draggabilly** options](https://github.com/desandro/draggabilly#options).   
The return value is a `<pinp.Box>` instance.

###### example
```js
import pinp from 'pinp'

const grid = pinp('.pinp-container')

const element = document.getElementById('myElement')
const box = grid.add(element, { 
  handle: '.handle' 
})

box.dragInstance.on('dragStart', () => console.log('the box moves'))
box.dragInstance.on('dragEnd', () => console.log('the box has moved'))

```

<br>

## `<pinp>.remove(box)`
Remove a `<pinp.Box>` instance from a `<pinp>` instance, and destroy its draggabilly instance.   
Note that it will not remove the matching `HTMLElement` from the DOM.

###### example
```js
import pinp from 'pinp'

const grid = pinp('.pinp-container')
const box = grid.add('#myElement')
…
grid.remove(box)
```
<br>

## `<pinp>.update()`
Pack the `<pinp>` instance, matching all push and boundaries behaviors and calling `willUpdate` and `didUpdate` hooks.   
Note that `<pinp>.add` and `<pinp>.remove` do not call `<pinp>.update`, so you will need to call it yourself.

###### example
```js
import pinp from 'pinp'

const grid = pinp('.pinp-container')
const box = grid.add('#myElement')
grid.update()
```

<br>

## `<pinp>.width`
Return the total width taken by all the elements of the `<pinp>` instance.

<br>

## `<pinp>.height`
Return the total height taken by all the elements of the `<pinp>` instance.

<br>

## `<pinp>.boxes`
Return an array of all the `<pinp.Box>` instances of the `<pinp>` instance.

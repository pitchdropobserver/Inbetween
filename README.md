# inbtwn

Lightweight tweening engine with embedded clock in plain js. Based on GreenSock's interface.

## Examples

[helvetica](https://pitchdropobserver.github.io/svg-cubic-bezier/helvetica.html).

## Installation

```bash
npm i inbtwn
```

# Usage

```js
Import Tween from 'inbtwn'
const start = { x:0, y: 0 }
const end = { x: 100, y: 100 }

new Tween(start)
    .to(end, 600)
    .easing('InOutCubic')
    .onUpdate(()=>{
        console.log(start.x, start.y)
    })
    .onComplete(()=>{
        console.log('Tween completed!')
    })
    .start()
```


## Methods

Methods you may call:

* `to(end: Object, dur?: number = 1000)` - set initial state and tween duration 
* `delay(dur: number = 0)` - set tween's execution delay
* `easing(type: string = 'InOutCubic')` - set easing function
* `fps(framePerSec: number = 30)` - set frame rate for animation
* `onUpdate(callback: Function)` - set callback invoked on every frame 
* `onComplete(callback: Function)` - set callback invoked tween completion
* `start()` - start tween


# Easing 

Available easing options

* `'Linear'` - no easing, no acceleration
* `'InQuad'` - accelerating from zero velocity
* `'OutQuad'` - decelerating to zero velocity
* `'InOutQuad'` - acceleration util halfway, then deceleration
* `'InCubic'` - accelerating from zero velocity
* `'OutCubic'` - decelerating to zero velocity
* `'InOutCubic'` - acceleration util halfway, then deceleration
* `'InQuart'` - accelerating from zero velocity
* `'OutQuart'` - decelerating to zero velocity
* `'InOutQuart'` - acceleration util halfway, then deceleration
* `'InQuint'` - accelerating from zero velocity
* `'OutQuint'` - decelerating to zero velocity
* `'InOutQuint'` - acceleration util halfway, then deceleration
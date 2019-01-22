import Clock from './Clock'
import { 
	EASE,
	DEFAULT_ANIM_DUR,
	DEFAULT_ANIM_DELAY,
	DEFAULT_FPS,
	DEFAULT_MSFPS,
} from './constants'

export interface ITweenState {
	[index: string]: number
}

let clock: Clock

class Tween {
	// Internal Props...
	private id: string
	private initState: ITweenState // initial animation state
	private userStateObj: ITweenState // state object to be mutated 
	private stateDeltas: ITweenState // state object capture delta between start and end
	// User Props...
	private animDur: number = DEFAULT_ANIM_DUR
	private msDelay: number = DEFAULT_ANIM_DELAY
	private msPerFrame: number = DEFAULT_MSFPS
	private easingFunction: Function = EASE.InOutCubic
	private userOnUpdateCallback: Function
	private userOnCompleteCallback: Function

	constructor(userStateObj: ITweenState) {
		this.initState = Object.assign({}, userStateObj)
		this.userStateObj = userStateObj
		this.update = this.update.bind(this)
		return this
	}

	public to(endState: ITweenState, animDur: number = DEFAULT_ANIM_DUR): Tween {
		const { initState } = this
		this.animDur = animDur
		this.stateDeltas = Object.keys(initState).reduce((prev, key) => {
			prev[key] = (endState[key] - initState[key])
			return prev
		}, {})
		return this
	}

	public fps(framePerSec: number = DEFAULT_FPS): Tween {
		this.msPerFrame = 1000 / framePerSec
		return this
	}

	public delay(milli: number = DEFAULT_ANIM_DELAY): Tween {
		this.msDelay = milli
		return this
	}

	public easing(easeType: string = 'InOutCubic'): Tween {
		this.easingFunction = EASE[easeType]
		return this
	}

	public onUpdate(callback: Function): Tween {
		this.userOnUpdateCallback = callback
		return this
	}

	public onComplete(callback: Function): Tween {
		this.userOnCompleteCallback = callback
		return this
	}

	public start(): Tween {
		const { update, msPerFrame, msDelay } = this
		if (clock === undefined) clock = new Clock()
		clock.subscribe(update, msPerFrame, msDelay)
		return this
	}

	public update(timestamp: DOMHighResTimeStamp, dtSincePrev: number, dtSince1st: number, ): boolean {
		const { animDur, easingFunction, userStateObj, initState, stateDeltas } = this
		const pctTimeElapsed = Math.min(dtSince1st / animDur, 1.0)
		// console.log('pctTimeElapsed', pctTimeElapsed)
		Object.keys(userStateObj).forEach((key) => {
			userStateObj[key] = initState[key] + (stateDeltas[key] * easingFunction(pctTimeElapsed))
		})

		this.userOnUpdateCallback()

		// on animation complete...
		if (pctTimeElapsed === 1.0) {
			const { userOnCompleteCallback: onCompleteCallback } = this
			if (onCompleteCallback !== undefined) {
				onCompleteCallback()
			}
			return true
		}
	}
}

export default Tween
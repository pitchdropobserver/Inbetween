export interface IClockSubscriber {
	onUpdate: Function // update callback
	frequency: number // threshold (ms) to surpass before calling next update
	delay: number // theshold (ms) to surpass before initiating 1st update call
	last: DOMHighResTimeStamp // timestamp on previous frame
	start: DOMHighResTimeStamp // timestamp on 1st frame
}

let dtSince1st: number
let dtSincePrev: number

class Clock {

	private subscribers: Array<IClockSubscriber> = []

	constructor() {
		this.animFrameUpdate = this.animFrameUpdate.bind(this)
	}

	private animFrameUpdate(timeStamp: DOMHighResTimeStamp): void {
		// https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp
		const { subscribers } = this
		subscribers.forEach((s: IClockSubscriber) => {
			if (s.start === undefined) {
				s.start = timeStamp // mark animation start
				s.last = timeStamp
			}
			dtSince1st = timeStamp - s.start
			dtSincePrev = timeStamp - s.last // calculate individual dt's for each subscriber
			if (
				dtSincePrev >= s.frequency
				&& dtSince1st > s.delay
			) {
				const isCompleted = s.onUpdate(
					timeStamp, // current time
					dtSincePrev, // time since last onUpdate call
					dtSince1st - s.delay // time since 1st onUpdate call 
				)
				s.last = timeStamp
				if (isCompleted) {
					this.unsubscribe(s)
				}
			}
		})
		if (this.subscribers.length > 0) {
			// keep animating if still subscribers in queue...
			requestAnimationFrame(this.animFrameUpdate)
		}
	}

	public subscribe(onUpdate: Function, frequency: number, delay: number = 0): number {
		const dup = this.subscribers.find(s => s.onUpdate === onUpdate)
		if (dup === undefined) { // if not already subscribed...
			this.subscribers.push({
				onUpdate,
				frequency,
				delay,
				last: undefined,
				start: undefined,
			})
		}
		if (this.subscribers.length === 1) {
			// kickstart clock again if previous subscriber was the first...
			requestAnimationFrame(this.animFrameUpdate)
		}
		return this.subscribers.length
	}

	private unsubscribe(subscriber: IClockSubscriber): number {
		this.subscribers = this.subscribers.filter(s => s !== subscriber)
		return this.subscribers.length
	}
}


export default Clock
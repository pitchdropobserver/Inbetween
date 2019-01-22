export const EASE: { [index: string]: Function } = {
	// no easing, no acceleration
	Linear: function (t) { return t },
	// accelerating from zero velocity
	InQuad: function (t) { return t * t },
	// decelerating to zero velocity
	OutQuad: function (t) { return t * (2 - t) },
	// acceleration util halfway, then deceleration
	InOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
	// accelerating from zero velocity
	InCubic: function (t) { return t * t * t },
	// decelerating to zero velocity
	OutCubic: function (t) { return (-t) * t * t + 1 },
	// acceleration util halfway, then deceleration
	InOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
	// accelerating from zero velocity
	InQuart: function (t) { return t * t * t * t },
	// decelerating to zero velocity
	OutQuart: function (t) { return 1 - (-t) * t * t * t },
	// acceleration util halfway, then deceleration
	InOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (-t) * t * t * t },
	// accelerating from zero velocity
	InQuint: function (t) { return t * t * t * t * t },
	// decelerating to zero velocity
	OutQuint: function (t) { return 1 + (-t) * t * t * t * t },
	// acceleration util halfway, then deceleration
	InOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (-t) * t * t * t * t }
}

export const DEFAULT_ANIM_DUR = 1000
export const DEFAULT_ANIM_DELAY = 0
export const DEFAULT_FPS = 30
export const DEFAULT_MSFPS = 1000 / DEFAULT_FPS // milliseconds per frame
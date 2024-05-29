class CountingNumber extends HTMLElement {
	static defaults = {
		value: 0,
		targetValue: 0,
		duration: 1000,
		delay: 0,
		decimals: 0,
		culture: 'en'
	}

	constructor() {
		super()
		this.startTime = null
	}

	connectedCallback() {
		const defaults = CountingNumber.defaults

		this.typedValue = this.getAttribute('value') || this.textContent
		this.targetValue = Number(this.typedValue) || defaults.targetValue
		this.duration = Number(this.getAttribute('duration')) || defaults.duration
		this.delay = Number(this.getAttribute('delay')) || defaults.delay
		this.culture = this.getLanguage(defaults.culture)

		this.decimals = CountingNumber.getDecimalCount(this.typedValue) || defaults.decimals
		this.formatter = new Intl.NumberFormat(this.culture, { minimumFractionDigits: this.decimals, maximumFractionDigits: this.decimals })

		// Set starting value
		this.currentValue = 0
		this.updateValue()

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						requestAnimationFrame(this.animateCount.bind(this))
					}, this.delay)

					observer.unobserve(this)
				}
			})
		}, { threshold: 0 })

		observer.observe(this)
	}

	animateCount(timestamp) {
		this.startTime ||= timestamp

		const elapsed = timestamp - this.startTime
		const progress = elapsed / this.duration

		const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
		//const easeInCubic = (t) => t * t * t
		//const easeOutCubic = (t) => --t * t * t + 1
		const easedProgress = easeInOutCubic(progress)

		this.currentValue = Math.min(this.targetValue * easedProgress, this.targetValue)
		this.updateValue()

		if (this.currentValue < this.targetValue) {
			requestAnimationFrame(this.animateCount.bind(this))
		}
	}

	updateValue(value = this.currentValue) {
		this.textContent = this.formatter.format(value)
	}

	getLanguage(defaultLanguage) {
		let language = defaultLanguage

		const decider = this.closest('[lang]')
		if (decider && decider.lang != '') {
			language = decider.lang
		}

		return language
	}

	static getDecimalCount(value) {
		let valueConv = value != null ? value.toString() : '0'

		if (valueConv.indexOf('.') < 0) {
			return 0
		}

		return valueConv.split(".")[1].length || 0
	}
}

export { CountingNumber }

export default function registerElement() {
	customElements.define('counting-number', CountingNumber)
}

class CountingNumber extends HTMLElement {
	static defaults = {
		value: 0,
		targetValue: 0,
		duration: 1000,
		delay: 0,
		decimals: 0,
		culture: 'en-US'
	}

	constructor() {
		super()
		this.startTime = null
	}

	connectedCallback() {
		const defaults = CountingNumber.defaults

		this.targetValue = this.textContent || defaults.targetValue
		this.duration = Number(this.dataset.duration) || defaults.duration
		this.delay = Number(this.dataset.delay) || defaults.delay
		this.culture = this.dataset.culture || defaults.culture

		this.textContent = Intl.NumberFormat(this.culture).format(this.targetValue)
		this.decimals = this.countDecimals(this.targetValue) || defaults.decimals

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
		if (!this.startTime) this.startTime = timestamp
		const elapsed = timestamp - this.startTime
		const progress = elapsed / this.duration

		const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
		//const easeInCubic = (t) => t * t * t
		//const easeOutCubic = (t) => --t * t * t + 1
		const easedProgress = easeInOutCubic(progress)

		this.value = Math.min(this.targetValue * easedProgress, this.targetValue)
		this.textContent = Intl.NumberFormat(this.culture, { minimumfractiondigits: this.decimals }).format(this.value.toFixed(this.decimals))

		if (this.value < this.targetValue) {
			requestAnimationFrame(this.animateCount.bind(this))
		}
	}

	countDecimals(value) {
		var valueConv = value.toString().replace(",", ".")
		if (Math.floor(value) === Number(value)) return 0
		this.targetValue = valueConv

		return valueConv.split(".")[1].length || 0
	}
}

customElements.define('counting-number', CountingNumber)

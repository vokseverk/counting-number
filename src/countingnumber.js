class CountingNumber extends HTMLElement {
    constructor() {
        super()
        this.value = 0
        this.targetValue = 0
        this.duration = 0
        this.delay = 0
        this.startTime = null
        this.decimals = 0
    }

    connectedCallback() {
        this.targetValue = this.textContent
        this.duration = Number(this.dataset.duration)
        this.delay = Number(this.dataset.delay)
        this.culture = this.dataset.culture || 'en-US'
        this.textContent = Intl.NumberFormat(this.culture).format(this.targetValue)
        this.decimals = this.countDecimals(this.targetValue)

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

export default function defineCountingNumber() {
    customElements.define('counting-number', CountingNumber)
}
class CountingNumber extends HTMLElement {
    constructor() {
        super();
        this.value = 0;
        this.targetValue = 0;
        this.duration = 0;
        this.delay = 0;
        this.startTime = null;
    }

    connectedCallback() {
        this.targetValue = Number(this.innerHTML);
        this.duration = Number(this.dataset.duration);
        this.delay = Number(this.dataset.delay);
        this.culture = this.dataset.culture || 'en-US';
        this.textContent = Intl.NumberFormat(this.culture).format(this.targetValue);

        console.log();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        requestAnimationFrame(this.animateCount.bind(this));
                    }, this.delay);
                    
                    observer.unobserve(this);
                }
            });
        }, { threshold: 0 });

        observer.observe(this);
    }

    animateCount(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        const elapsed = timestamp - this.startTime;

        this.value = Math.min(this.targetValue * elapsed / this.duration, this.targetValue);
        this.textContent = Intl.NumberFormat(this.culture).format(Math.floor(this.value));

        if (this.value < this.targetValue) {
            requestAnimationFrame(this.animateCount.bind(this));
        }
    }
}

customElements.define('counting-number', CountingNumber);
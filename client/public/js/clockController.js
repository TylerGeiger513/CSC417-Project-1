document.addEventListener('contentLoaded', (event) => {
    const currentItem = event.detail?.currentItem;

    if (!currentItem) {
        console.error('No currentItem found in event details.');
        return;
    }

    // Initialize Analog Clock
    (function initAnalogClock() {
        const clockContainer = currentItem.querySelector('.clock-container');
        if (!clockContainer) {
            console.warn('Clock container not found.');
            return;
        }

        const hourHand = clockContainer.querySelector('.clock-hour');
        const minuteHand = clockContainer.querySelector('.clock-minute');
        const secondHand = clockContainer.querySelector('.clock-second');

        if (!hourHand || !minuteHand || !secondHand) {
            console.error('Clock hands are missing from the clock container.');
            return;
        }

        const updateAnalogClock = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const milliseconds = now.getMilliseconds();

            const secondAngle = (360 / 60) * (seconds + milliseconds / 1000);
            const minuteAngle = (360 / 60) * (minutes + seconds / 60);
            const hourAngle = (360 / 12) * (hours % 12 + minutes / 60);

            hourHand.style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
            minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
            secondHand.style.transform = `translate(-50%, -85%) rotate(${secondAngle}deg)`;
        };

        setInterval(updateAnalogClock, 1000);
        updateAnalogClock();
    })();

    // Initialize Digital Clock
    (function initDigitalClock() {
        const timeContainer = currentItem.querySelector('.time');
        if (!timeContainer) {
            console.warn('Time container not found.');
            return;
        }

        const digitWrappers = {
            hours: [timeContainer.querySelector('.time-hour0'), timeContainer.querySelector('.time-hour1')],
            minutes: [timeContainer.querySelector('.time-minute0'), timeContainer.querySelector('.time-minute1')],
            seconds: [timeContainer.querySelector('.time-second0'), timeContainer.querySelector('.time-second1')],
        };

        const animateDigit = (wrapper, newDigit) => {
            const oldDigit = wrapper.querySelector('.digit');

            if (oldDigit && oldDigit.textContent === newDigit) return;

            wrapper.dataset.animating = "true";

            // Create a new digit element
            const newDigitElement = document.createElement('div');
            newDigitElement.className = 'digit digit-enter';
            newDigitElement.textContent = newDigit;

            wrapper.appendChild(newDigitElement);

            // Trigger the animation for the entering digit
            requestAnimationFrame(() => {
                newDigitElement.classList.add('digit-enter-active');
                if (oldDigit) {
                    oldDigit.classList.add('digit-exit-active');
                }
            });

            // Cleanup after animation
            setTimeout(() => {
                if (oldDigit && wrapper.contains(oldDigit)) {
                    wrapper.removeChild(oldDigit);
                }
                wrapper.dataset.animating = "false";
            }, 300); 
        };


        const updateDigitalClock = () => {
            const now = new Date();
            const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            [hours, minutes, seconds].forEach((timePart, index) => {
                timePart.split('').forEach((digit, digitIndex) => {
                    animateDigit(digitWrappers[Object.keys(digitWrappers)[index]][digitIndex], digit);
                });
            });
        };

        setInterval(updateDigitalClock, 1000);
        updateDigitalClock();
    })();
});

// Typing Effect
const text = "Building Secure & Scalable Enterprise IT Ecosystems";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
    }
}
typeEffect();


// Animated Counter
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / 200;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target + "+";
        }
    };
    updateCount();
});


// Dark / Light Toggle
document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
});


// Particles
tsParticles.load("particles-js", {
    particles: {
        number: { value: 50 },
        color: { value: "#3b82f6" },
        links: {
            enable: true,
            color: "#3b82f6",
            opacity: 0.2
        },
        move: { enable: true, speed: 1 },
        size: { value: 2 }
    }
});

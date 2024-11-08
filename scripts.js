// JavaScript for the responsive menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

// JavaScript for scroll-based active link highlighting
const sections = document.querySelectorAll("section");
const navLinkItems = document.querySelectorAll(".nav-link");

function activateNavLink() {
    const scrollPosition = window.scrollY;
    const offsetThreshold = 150; // Adjust this value as needed

    let activeIndex = 0; // Default to "Home" as the active section

    // Loop through sections to find the one currently in view
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if the scroll position is within the section bounds
        if (scrollPosition >= sectionTop - offsetThreshold && scrollPosition < sectionTop + sectionHeight - offsetThreshold) {
            activeIndex = index;
        }
    });

    // Remove active class from all links, then add to the current section link
    navLinkItems.forEach(link => link.classList.remove("active"));
    navLinkItems[activeIndex].classList.add("active");

    // Debugging output to verify the active section
    console.log(`Active section: ${sections[activeIndex].id}`);
}

// Listen for scroll events to update active link
window.addEventListener("scroll", activateNavLink);

// Set "Home" as the default active link on page load
document.addEventListener("DOMContentLoaded", () => {
    navLinkItems.forEach(link => link.classList.remove("active"));
    navLinkItems[0].classList.add("active"); // Set the "Home" link as active
    activateNavLink(); // Call function to check if another section should be active based on scroll
});

function sendMessage() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    if (name && email && message) {
        const phoneNumber = "212629422435"; // WhatsApp number
        const whatsappMessage = `Hello, I am ${name}.\n\nEmail: ${email}\nMessage: ${message}`;
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Redirect to WhatsApp
        console.log("WhatsApp Link:", whatsappLink);
        window.open(whatsappLink, "_blank");
    } else {
        alert("Please fill out all fields.");
    }
}

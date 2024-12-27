// Get DOM elements
const educationSection = document.querySelector('#education');
const skillsSection = document.querySelector('#skills');
const projectsSection = document.querySelector('#projects');

// Add event listener to toggle sections
educationSection.addEventListener('click', () => {
    educationSection.classList.toggle('active');
});

skillsSection.addEventListener('click', () => {
    skillsSection.classList.toggle('active');
});

projectsSection.addEventListener('click', () => {
    projectsSection.classList.toggle('active');
});
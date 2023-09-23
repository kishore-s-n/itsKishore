function setActiveSection(name) {
    const activeSection = document.querySelector(name);
    activeSection.classList.add('active');
}
function closeSection(name) {
    const currentSection = document.querySelector(name);
    currentSection.classList.remove('active');
}

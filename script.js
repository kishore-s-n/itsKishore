function setActiveSection(sectionId) {
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}
function closeSection(sectionId) {
    const currentSection = document.getElementById(sectionId);
    currentSection.classList.remove('active');
}

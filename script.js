function setActiveSection(sectionId) {
    // Find the section with the given ID and add the 'active' class
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}
  
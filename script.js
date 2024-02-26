function setActiveSection(name) {
  const activeSection = document.querySelector(name);
  activeSection.classList.add('active');
}



function closeSection(name) {
  const currentSection = document.querySelector(name);
  currentSection.classList.remove('active');
}



function setActiveTab(tab, contentId) {

  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => link.classList.remove('active-tab'));

  tab.classList.add('active-tab');

  const content = document.querySelectorAll('.tab-contents');
  content.forEach(link => link.classList.remove('active-content'));

  const activeContent = document.getElementById(contentId);
  activeContent.classList.add('active-content')
}

function setActiveServiceTab(title, content) {
  title.classList.toggle("active-listing");

  const activeContent = document.getElementById(content);
  activeContent.classList.toggle('active-content');
}



document.addEventListener("DOMContentLoaded", function () {
  const pullableWord = document.getElementById('pullableWord');
  let isDragging = false;

  pullableWord.addEventListener('mousedown', startDragging);

  function startDragging(e) {
    e.preventDefault();
    isDragging = true;

    const initialY = e.clientY;

    function dragMove(e) {
      if (!isDragging) return;

      const deltaY = e.clientY - initialY;
      const translateY = Math.min(Math.max(0, deltaY), 100);

      pullableWord.style.transform = `translateY(${translateY}px)`;

      if (translateY === 100) {
        onPullReached();
      }
    }

    function dragEnd() {
      isDragging = false;

      if (parseInt(pullableWord.style.transform.slice(11)) >= 100) {
        pullableWord.style.transition = 'transform 0.5s ease-in-out';
        pullableWord.style.transform = 'translateY(0)';
        setTimeout(() => {
          pullableWord.style.transition = '';
        }, 500);
      }

      document.removeEventListener('mousemove', dragMove);
      document.removeEventListener('mouseup', dragEnd);
    }

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
  }

  function onPullReached() {
    console.log('it works')
    reveals = document.querySelectorAll('.details, .revealedmyself, .introforreveal');
    reveals.forEach(reveal => {
      reveal.classList.add('revealed');
    })
  }
});


function form_submit() {
  const form = document.getElementById('form');
  const formData = new FormData(form);
  console.log(formData);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://formspree.io/f/moqgwqlv');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      form.reset();
      alert('Thank you for your message. We will get back to you as soon as possible.');
    } else {
      alert('There was a problem with your submission. Please try again.');
    }
  };
  xhr.send(formData);
}

const wordContainer = document.getElementById('wordContainer');

function createFloatingWord(word) {
  const wordElement = document.createElement('div');
  wordElement.textContent = word;
  wordElement.className = 'floatingWord';
  wordContainer.appendChild(wordElement);

  // Random background color
  const randomColor = getRandomColor();
  wordElement.style.backgroundColor = randomColor;

  // Set font color based on background brightness
  const fontColor = getFontColor(randomColor);
  wordElement.style.color = fontColor;

  let x = Math.random() * (wordContainer.clientWidth - wordElement.clientWidth);
  let y = Math.random() * (wordContainer.clientHeight - wordElement.clientHeight);

  wordElement.style.left = `${x}px`;
  wordElement.style.top = `${y}px`;

  animateWord(wordElement, x, y);
}

function animateWord(wordElement, x, y) {
  const speed = 1 + Math.random() * 2; // Random speed between 1 and 3
  const angle = Math.random() * 2 * Math.PI;

  function moveWord() {
    x = x + speed * Math.cos(angle);
    y = y + speed * Math.sin(angle);

    if (x < 0 || x > (wordContainer.clientWidth - wordElement.clientWidth) || y < 0 || y > (wordContainer.clientHeight - wordElement.clientHeight)) {
      x = Math.random() * (wordContainer.clientWidth - wordElement.clientWidth);
      y = Math.random() * (wordContainer.clientHeight - wordElement.clientHeight);
    }

    wordElement.style.left = `${x}px`;
    wordElement.style.top = `${y}px`;

    requestAnimationFrame(moveWord);
  }

  moveWord();
}

function getRandomColor() {
  const colorVariables = ['--c1', '--c2', '--c3', '--c4'];
  const randomColorVar = colorVariables[Math.floor(Math.random() * colorVariables.length)];
  return getComputedStyle(document.documentElement).getPropertyValue(randomColorVar);
}

function getFontColor(backgroundColor) {
  // Calculate the brightness of the background color
  const rgb = backgroundColor.match(/\d+/g);
  const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;

  // Use white or black font color based on brightness
  return brightness > 128 ? '#000000' : '#ffffff';
}

// Add your web development-related words here
const webDevelopmentWords = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Responsive Design', 'API', 'Database'];

// Create floating words
webDevelopmentWords.forEach(word => createFloatingWord(word));

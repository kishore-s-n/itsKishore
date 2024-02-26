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


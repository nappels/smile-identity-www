//
// Main JavaScript file
// --------------------------------------------------------

// Header Scroll
// -------------------------------------------
function setHeader() {
  if (window.scrollY > 100) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
}

window.addEventListener("scroll", function(evt) {
  setHeader();
});


// Form submit
// -------------------------------------------

document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var email = document.querySelector('.email-input').value;

  if (!email) return false;

  fetch('https://formspree.io/info@smileidentity.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email
    })
  }).then(function(resp) {
    return resp.json();
  }).then(function(json) {
    document.querySelector('.form-wrapper').classList.add('success');
  }).catch(function(err) {
    console.log('error!', err)
  });
});

// Scrolling
// -------------------------------------------


function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

// Scroll main section down on arrow click
document.querySelector('.main-section-arrow').addEventListener('click', function(e) {
  e.preventDefault();
  var missionSection = document.querySelector('#mission');
  scrollTo(document.body, missionSection.offsetTop - 82, 400);
});

// Scroll to join section on join us nav click
document.querySelector('.nav-join').addEventListener('click', function(e) {
  e.preventDefault();
  var joinSection = document.querySelector('#join');
  scrollTo(document.body, joinSection.offsetTop - 82, 400);
});

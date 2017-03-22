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

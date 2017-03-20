//
// Main JavaScript file
// --------------------------------------------------------

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

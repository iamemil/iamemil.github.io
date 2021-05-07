$(document).ready(function () {
  // Can also be included with a regular script tag
  var typed = new Typed('.typed', {
    strings: ["ASP.NET Developer<span style='color:#00ff88'>.</span>", "Web Developer<span style='color:#00ff88'>.</span>", "C# Developer<span style='color:#00ff88'>.</span>"],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 2000,
    loop: true
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("fixed-top");
    } else {
      $(".navbar").removeClass("fixed-top");
    }
  });

  const speed = 500;
  
  $('a[href*="#"]')
    .filter((i, a) => a.getAttribute('href').startsWith('#') || a.href.startsWith(`${location.href}#`))
    .unbind('click.smoothScroll')
    .bind('click.smoothScroll', event => {
      const targetId = event.currentTarget.getAttribute('href').split('#')[1];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: $(targetElement).offset().top - 56 }, speed);
      }
    });

});
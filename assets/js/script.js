$(document).ready(function () {
  // Can also be included with a regular script tag
  var typed = new Typed('.typed', {
    strings: ["emil<b>ismayilzada</b>", "emlsm<b>.</b>tech"],
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


  // Portfolio Carousel
  if ($("#portfolio-carousel").length) {
    $("#portfolio-carousel").owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      smartSpeed: 700,
      autoplayHoverPause:true,
      autoplay: 3000,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        800: {
          items: 2
        },
        1024: {
          items: 3
        },
        1200: {
          items: 3
        },
        1600: {
          items: 4
        }
      }
    });
  }
  // Portfolio Carousel
  if ($("#services-carousel").length) {
    $("#services-carousel").owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      smartSpeed: 700,
      autoplayHoverPause: true,
      autoplay: 3000,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        800: {
          items: 2
        },
        1024: {
          items: 3
        },
        1200: {
          items: 3
        },
        1600: {
          items: 4
        }
      }
    });
  }

  });

$(document).ready(function() {
    // Smooth scroll for anchor links - fast and smooth
    $('a[href^="#"]').on('click', function(e) {
        var href = this.getAttribute('href');

        // Skip if just "#"
        if (href === '#') return;

        var target = $(href);

        if (target.length) {
            e.preventDefault();

            var headerHeight = $('.header').outerHeight() || 70;
            var targetPosition = target.offset().top - headerHeight;

            // Use native smooth scroll (faster)
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });

    // Header scroll effect
    var header = $('.header');
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    });

    // Currency selector
    $('.currency-btn').on('click', function() {
        var $card = $(this).closest('.tariff-card');
        $card.find('.currency-btn').removeClass('active');
        $(this).addClass('active');

        var currency = $(this).text().trim();
        var $oldPrice = $card.find('.old-price');
        var $newPrice = $card.find('.new-price');

        var baseOldPrice = parseFloat($card.data('old-price'));
        var baseNewPrice = parseFloat($card.data('new-price'));

        var rates = {
            '₽': 1,
            '₴': 0.45,
            '$': 0.011,
            '€': 0.010
        };

        var rate = rates[currency] || 1;
        var oldConverted = Math.round(baseOldPrice * rate);
        var newConverted = Math.round(baseNewPrice * rate);

        $oldPrice.text(oldConverted.toLocaleString('ru-RU') + ' ' + currency);
        $newPrice.text(newConverted.toLocaleString('ru-RU') + ' ' + currency);
    });

    // Set base prices as data attributes
    $('.tariff-card').each(function(index) {
        var prices = [
            { old: 7990, new: 4990 },
            { old: 9990, new: 5990 },
            { old: 22980, new: 15990 }
        ];
        if (prices[index]) {
            $(this).data('old-price', prices[index].old);
            $(this).data('new-price', prices[index].new);
        }
    });

    // FAQ accordion - rotate icon
    $('.faq-question').on('click', function() {
        var $icon = $(this).find('i');
        var isExpanded = $(this).attr('aria-expanded') === 'true';

        if (!isExpanded) {
            $icon.css('transform', 'rotate(180deg)');
        } else {
            $icon.css('transform', 'rotate(0deg)');
        }
    });

    // Close mobile menu on link click
    $('.navbar-nav .nav-link').on('click', function() {
        var $collapse = $('.navbar-collapse');
        if ($collapse.hasClass('show')) {
            $collapse.collapse('hide');
        }
    });

    // Active nav link on scroll (throttled)
    var sections = $('section[id]');
    var navLinks = $('.nav-link');
    var scrollTimeout;

    $(window).on('scroll', function() {
        if (scrollTimeout) return;

        scrollTimeout = setTimeout(function() {
            var scrollPos = $(window).scrollTop() + 100;

            sections.each(function() {
                var top = $(this).offset().top;
                var bottom = top + $(this).outerHeight();
                var id = $(this).attr('id');

                if (scrollPos >= top && scrollPos < bottom) {
                    navLinks.removeClass('active');
                    navLinks.filter('[href="#' + id + '"]').addClass('active');
                }
            });

            scrollTimeout = null;
        }, 100);
    });

    // Animate elements on scroll (throttled)
    var animateElements = $('.info-card, .tariff-card, .faq-item, .material-block');
    var animateTimeout;

    function animateOnScroll() {
        if (animateTimeout) return;

        animateTimeout = setTimeout(function() {
            var windowBottom = $(window).scrollTop() + $(window).height();

            animateElements.each(function() {
                if (!$(this).hasClass('animated')) {
                    var elementTop = $(this).offset().top;
                    if (elementTop < windowBottom - 50) {
                        $(this).addClass('animated');
                    }
                }
            });

            animateTimeout = null;
        }, 50);
    }

    $(window).on('scroll', animateOnScroll);
    animateOnScroll();
});

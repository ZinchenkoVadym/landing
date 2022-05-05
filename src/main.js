import './styles/styles.scss';
import * as $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';


$(document).ready(function () {
    $('.preloader').delay(500).fadeOut();
    // Top
    const form = document.querySelector('.one-section__block-form')
    const headers = document.querySelectorAll('.header-section')
    const tabsButtons = document.querySelector('.tabs__buttons')

    // Left
    const tabsItems = document.querySelectorAll('.tabs__item')
    const blockPhotoOne = document.querySelector('.interesting-one__block-text')
    const blockPhotoTwo = document.querySelector('.interesting-two__block-info')

    const translateLeftObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('key__opacity-translate-left')
                }
            }
        )
    }, {threshold: 0.2});

    const translateTopObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('key__opacity-translate-top')
                }
            }
        )
    }, {threshold: 0.2});

    tabsItems.forEach((item) => translateLeftObserver.observe(item))
    translateLeftObserver.observe(blockPhotoOne)
    translateLeftObserver.observe(blockPhotoTwo)


    translateTopObserver.observe(form)
    translateTopObserver.observe(tabsButtons)
    headers.forEach((header) => translateTopObserver.observe(header))




    $('ul.tabs__buttons').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs__body').find('li.tabs__item').removeClass('active').eq($(this).index()).addClass('active');
    });


    $('.service-price__item').hover(function () {
        $(this).find('div.price-item__hover').addClass('active')
    }, function () {
        $(this).find('div.price-item__hover').removeClass('active')
    });

    $('.burger').on('click', function () {
        $('.span_burger').toggleClass('active_burger')
        $('.header__menu').toggleClass('active')
        $('body').toggleClass('lock')
    });


    $("nav ul li a").click(function () {
        let elementClick = $(this).attr("href");
        let destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination }, 300);
        $('.header__menu').removeClass('active')
        $('.span_burger').removeClass('active_burger')
        $('body').removeClass('lock')
    });

    $(".owl-carousel").owlCarousel({
        loop: true,
        dots: false,
        nav: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            500: {
                items: 2
            },
            800: {
                items: 3
            }
        }
    })
});



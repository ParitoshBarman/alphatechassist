(function ($) {
	"use strict";
	/**
	 * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */
	// Make sure you run this code under Elementor.
	$(window).on("elementor/frontend/init", function () {
		// tj-header
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-header.default",

			function ($scope, $) {
				let headerArea = $scope.find(".tj-header-area");
				let menuArea = $scope.find(".tj-menu-area");
				let mobileMenuArea = $scope.find(".mobile-navbar-menu");

				if (headerArea.length > 0) {
					var Width = $(document).width();

					if ($("body").scrollTop() > 250 || $("html").scrollTop() > 250) {
						$(".header-sticky").addClass("sticky");
					} else {
						$(".header-sticky").removeClass("sticky");
					}

					//Canvas sidebar js
					var menuBar = $(".menuBar");
					if (menuBar.length > 0) {
						$(".menuBar, #menuClose, #tjMenuOverlay").on("click", function (e) {
							e.preventDefault();
							$("body").toggleClass("canvas_expanded");
						});
					}

					// Mobile Menu js
					let menuId = menuArea.attr("id");
					let mobileMenuId = mobileMenuArea.attr("id");

					$(`#${menuId}`).meanmenu({
						meanMenuContainer: `#${mobileMenuId}`,
						meanScreenWidth: "991",
						meanExpand: [
							"<i class='fa-light fa-plus'></i> <i class='fa-light fa-minus'></i>",
						],
					});
				}
			}
		);

		// tj-page-header
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-page-header.default",

			function ($scope, $) {
				let headerBg = $scope.find(".breadcrumb-wrapper");

				if (headerBg.length > 0) {
					let dataImage = headerBg.attr("data-bg-image");

					if (dataImage.length < 0) {
						return;
					}

					headerBg.each(function () {
						$(this).css(
							"background-image",
							"url( " + $(this).attr("data-bg-image") + "  )"
						);
					});
				}
			}
		);

		// tj-hero-banner
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-hero-banner.default",

			function ($scope, $) {
				// hero image
				var $heroImage = $scope.find(".heroImage");
				if ($heroImage.length > 0) {
					var $imageData = $heroImage.attr("data-bg-image");

					if (!$imageData) {
						return;
					}

					if ($imageData.length > 0) {
						$heroImage.each(function () {
							$(this).css(
								"background-image",
								"url( " + $(this).attr("data-bg-image") + "  )"
							);
						});
					}
				}
			}
		);

		// tj-hero-slider
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-hero-slider.default",

			function ($scope, $) {
				let wrap = $scope.find(".heroSliderWrap");

				var loop = wrap.attr("data-loop") == "yes" ? true : false;
				var dots = wrap.attr("data-dots") == "yes" ? true : false;
				var autoplay = wrap.attr("data-autoplay") == "yes" ? true : false;
				var delay = wrap.attr("data-delay") ? wrap.attr("data-delay") : "5000";

				let heroSlider = $scope.find(".tj-hero-slider.swiper");

				if (heroSlider.length > 0) {
					let sliderId = heroSlider.attr("id");

					if (!sliderId.length) {
						return;
					}
					var slider = new Swiper(`#${sliderId}`, {
						slidesPerView: 1,
						spaceBetween: 10,
						effect: "fade",
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),

						...(dots
							? {
									pagination: {
										el: ".swiper-pagination",
										clickable: true,
									},
							  }
							: {}),
						loop: loop,
					});
				}

				// slider image
				var $sliderImage = $scope.find(".sliderImage");
				if ($sliderImage.length > 0) {
					var $imageData = $sliderImage.attr("data-bg-image");

					if (!$imageData.length) {
						return;
					}

					if ($imageData.length > 0) {
						$sliderImage.each(function () {
							$(this).css(
								"background-image",
								"url( " + $(this).attr("data-bg-image") + "  )"
							);
						});
					}
				}
			}
		);

		// tj-counter
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-counter.default",

			function ($scope, $) {
				var $counterItem = $scope.find(".tj-counter");

				if ($counterItem.length > 0) {
					var $counter = $counterItem.find(".odometer");

					if ($counter.length > 0) {
						$counter.appear(function () {
							var odo = $counter;
							odo.each(function () {
								var countNumber = $(this).attr("data-count");
								$(this).html(countNumber);
							});
						});
					}
				}
			}
		);

		// tj-testimonials
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-testimonials.default",

			function ($scope, $) {
				let wrap = $scope.find(".carouselWrap");

				var loop = wrap.attr("data-loop") == "yes" ? true : false;
				var dots = wrap.attr("data-dot") == "yes" ? true : false;
				var nav = wrap.attr("data-nav") == "yes" ? true : false;
				var autoplay = wrap.attr("data-autoplay") == "yes" ? true : false;
				var delay = wrap.attr("data-delay") ? wrap.attr("data-delay") : "5000";

				let testimonialCarousel = $scope.find(".tj-testimonial-slider");

				if (testimonialCarousel.length > 0) {
					let carouselId = testimonialCarousel.attr("id");

					if (carouselId.length < 0) {
						return;
					}

					var testimonial = new Swiper(`#${carouselId}`, {
						loop: loop,
						spaceBetween: 30,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),

						...(dots
							? {
									pagination: {
										el: ".swiper-pagination",
										clickable: true,
									},
							  }
							: {}),

						breakpoints: {
							320: {
								slidesPerView: 1,
							},
							640: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 2,
							},
							992: {
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 3,
							},
						},
					});

					var star_rating_width = $(".fill-ratings span").width();
					$(".star-ratings").width(star_rating_width);
				}

				// testimonial 2
				let testimonial2Carousel = $scope.find(".tj-testimonial-slider2");

				if (testimonial2Carousel.length > 0) {
					let carousel2Id = testimonial2Carousel.attr("id");

					if (carousel2Id.length < 0) {
						return;
					}

					var testimonial2 = new Swiper(`#${carousel2Id}`, {
						slidesPerView: 1,
						spaceBetween: 27,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),

						...(dots
							? {
									pagination: {
										el: ".swiper-pagination",
										clickable: true,
									},
							  }
							: {}),
						loop: loop,
					});

					var star_rating_width = $(".fill-ratings span").width();
					$(".star-ratings").width(star_rating_width);
				}

				// testimonial 3
				let testimonial3Carousel = $scope.find(".tj-testimonial-slider3");
				let testimonial3CarouselThumb = $scope.find(
					".tj-testimonial-slider3-thumb"
				);

				if (testimonial3Carousel.length > 0) {
					let carousel3Id = testimonial3Carousel.attr("id");
					let carousel3ThumbId = testimonial3CarouselThumb.attr("id");

					if (carousel3Id.length < 0) {
						return;
					}

					var slider3 = new Swiper(`#${carousel3Id}`, {
						spaceBetween: 0,
						slidesPerView: 1,
						centeredSlides: true,
						loopedSlides: 4,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),

						...(nav
							? {
									navigation: {
										nextEl: ".swiper-button-next",
										prevEl: ".swiper-button-prev",
									},
							  }
							: {}),
						loop: loop,
					});

					var slider3Thumb = new Swiper(`#${carousel3ThumbId}`, {
						spaceBetween: 1,
						slidesPerView: "3",
						centeredSlides: true,
						loop: loop,
						loopedSlides: 4,
						roundLengths: true,
						slideToClickedSlide: true,
					});
					slider3.controller.control = slider3Thumb;
					slider3Thumb.controller.control = slider3;
				}

				// testimonial 4
				let testimonial4Carousel = $scope.find(".tj-testimonial-slider4");

				if (testimonial4Carousel.length > 0) {
					let carousel4Id = testimonial4Carousel.attr("id");

					if (carousel4Id.length < 0) {
						return;
					}

					var testimonial4 = new Swiper(`#${carousel4Id}`, {
						loop: loop,
						spaceBetween: 30,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),

						...(dots
							? {
									pagination: {
										el: ".swiper-pagination",
										clickable: true,
									},
							  }
							: {}),
						breakpoints: {
							320: {
								slidesPerView: 1,
							},
							640: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 1,
							},
							992: {
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 2,
							},
						},
					});

					var star_rating_width = $(".fill-ratings span").width();
					$(".star-ratings").width(star_rating_width);
				}

				// testimonial 5
				let testimonial5Carousel = $scope.find(".tj-testimonial-slider5");

				if (testimonial5Carousel.length > 0) {
					let carousel5Id = testimonial5Carousel.attr("id");

					if (carousel5Id.length < 0) {
						return;
					}

					var testimonial5 = new Swiper(`#${carousel5Id}`, {
						slidesPerView: 1,
						loop: loop,
						spaceBetween: 30,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),

						...(dots
							? {
									pagination: {
										el: ".swiper-pagination",
										clickable: true,
									},
							  }
							: {}),
						breakpoints: {
							320: {
								slidesPerView: 1,
							},
							640: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 1,
							},
							992: {
								slidesPerView: 2,
							},
							1200: {
								slidesPerView: 2,
							},
							1400: {
								slidesPerView: 3,
							},
						},
					});

					var star_rating_width = $(".fill-ratings span").width();
					$(".star-ratings").width(star_rating_width);
				}

				// testimonial 6
				let testimonial6Carousel = $scope.find(".tj-testimonial-slider8");

				if (testimonial6Carousel.length > 0) {
					let carousel6Id = testimonial6Carousel.attr("id");

					if (carousel6Id.length < 0) {
						return;
					}

					var testimonial6 = new Swiper(`#${carousel6Id}`, {
						slidesPerView: 1,
						spaceBetween: 30,
						loop: loop,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),

						...(dots
							? {
									pagination: {
										el: ".testimonial8-pagination",
										clickable: true,
									},
							  }
							: {}),
						breakpoints: {
							320: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 2,
							},
							1200: {
								slidesPerView: 3,
							},
						},
					});

					var star_rating_width = $(".fill-ratings span").width();
					$(".star-ratings").width(star_rating_width);
				}

				// testimonial 7
				let testimonial7Carousel = $scope.find(".testimonial-carousel9");

				if (testimonial7Carousel.length > 0) {
					let carousel7Id = testimonial7Carousel.attr("id");

					if (carousel7Id.length < 0) {
						return;
					}

					$(`#${carousel7Id}`).owlCarousel({
						center: true,
						items: 3,
						loop: loop,
						margin: 24,
						autoWidth: true,
						dots: dots,
						autoplay: autoplay,
						autoplayTimeout: delay,
					});

					var star_rating_width = $(".fill-ratings span").width();
					$(".star-ratings").width(star_rating_width);
				}
			}
		);

		// tj-accordion
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-accordion.default",

			function ($scope, $) {
				var $accordionItem = $scope.find(".accordion-item");

				if ($accordionItem.length > 0) {
					var accordionHeader = $accordionItem.find(".accordion-header");

					accordionHeader.on("click", function () {
						$(this).parent().siblings().removeClass("active");
						$(this).parent().addClass("active");
					});
				}
			}
		);

		// tj-progress-bar
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-progress-bar.default",

			function ($scope, $) {
				let skills = $scope.find(".skills");

				if (skills.length > 0) {
					startAnimation();
					function startAnimation() {
						skills.each(function () {
							$(this)
								.find(".skillbar")
								.animate(
									{
										width: $(this).attr("data-percent"),
									},
									1000
								);
						});
					}
				}
			}
		);

		// tj-video
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-video.default",

			function ($scope, $) {
				let videoPlay = $scope.find(".popup-videos-button");

				if (videoPlay.length > 0) {
					if (videoPlay.length < 0) {
						return;
					}

					videoPlay.magnificPopup({
						disableOn: 10,
						type: "iframe",
						mainClass: "mfp-fade",
						removalDelay: 160,
						preloader: false,
						fixedContentPos: false,
					});
				}

				// slider image
				var $videoImage = $scope.find(".videoImage");
				if ($videoImage.length > 0) {
					var $imageData = $videoImage.attr("data-bg-image");

					if (!$imageData.length) {
						return;
					}

					if ($imageData.length > 0) {
						$videoImage.each(function () {
							$(this).css(
								"background-image",
								"url( " + $(this).attr("data-bg-image") + "  )"
							);
						});
					}
				}
			}
		);

		// tj-portfolios
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-portfolios.default",

			function ($scope, $) {
				let filterItem = $scope.find(".filter-menu button");
				let filterItems = $scope.find(".portfolio-items");

				if (filterItems.length > 0) {
					if (filterItems.length < 0) {
						return;
					}

					filterItems.imagesLoaded(function () {
						// Add isotope click function
						filterItem.on("click", function () {
							filterItem.removeClass("active");
							$(this).addClass("active");

							var filterValue = $(this).attr("data-filter");
							filterItems.isotope({
								filter: filterValue,
								animationOptions: {
									duration: 750,
									easing: "linear",
									queue: false,
								},
							});
							return false;
						});

						filterItems.isotope({
							itemSelector: ".portfolio-single-item",
							percentPosition: true,
							masonry: {
								columnWidth: ".portfolio-single-item",
							},
						});
					});
				}
			}
		);

		// tj-portfolios-carousel
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-portfolios-carousel.default",

			function ($scope, $) {
				let wrap = $scope.find(".carouselWrap");

				var loop = wrap.attr("data-loop") == "yes" ? true : false;
				var dot = wrap.attr("data-dot") == "yes" ? true : false;
				var nav = wrap.attr("data-nav") == "yes" ? true : false;
				var autoplay = wrap.attr("data-autoplay") == "yes" ? true : false;
				var delay = wrap.attr("data-delay") ? wrap.attr("data-delay") : "5000";

				// carousel 1
				let portfolioCarousel = $scope.find(".tj-portfolio-slider");

				if (portfolioCarousel.length > 0) {
					let carouselId = portfolioCarousel.attr("id");

					if (carouselId.length < 0) {
						return;
					}

					var portfolio = new Swiper(`#${carouselId}`, {
						grabCursor: true,
						slidesPerView: "auto",
						loop: loop,
						spaceBetween: 30,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),
						...(nav
							? {
									navigation: {
										nextEl: ".portfolio_next",
										prevEl: ".portfolio_prev",
									},
							  }
							: {}),
					});
				}

				// carousel 2
				let portfolio2Carousel = $scope.find(".tj-portfolio-slider2");

				if (portfolio2Carousel.length > 0) {
					let carouse2lId = portfolio2Carousel.attr("id");

					if (carouse2lId.length < 0) {
						return;
					}

					var portfolio2 = new Swiper(`#${carouse2lId}`, {
						slidesPerView: "auto",
						spaceBetween: 30,
						loop: loop,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),
						...(dot
							? {
									pagination: {
										el: ".portfolio-pagination",
										clickable: true,
									},
							  }
							: {}),
					});
				}

				// carousel 3
				let portfolio3Carousel = $scope.find(".portfolio_carousel.style-6");

				if (portfolio3Carousel.length > 0) {
					let carouse3lId = portfolio3Carousel.attr("id");

					if (carouse3lId.length < 0) {
						return;
					}

					var portfolio3 = new Swiper(`#${carouse3lId}`, {
						slidesPerView: 1,
						spaceBetween: 30,

						loop: loop,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),
						...(dot
							? {
									pagination: {
										el: ".portfolio_pagination",
										clickable: true,
									},
							  }
							: {}),
						breakpoints: {
							768: {
								slidesPerView: 2,
							},
							992: {
								slidesPerView: 2,
							},
							1200: {
								slidesPerView: 3,
							},
						},
					});
				}

				// carousel 4
				let portfolio4Carousel = $scope.find(".tj-portfolio-slider5");

				if (portfolio4Carousel.length > 0) {
					let carouse4lId = portfolio4Carousel.attr("id");

					if (carouse4lId.length < 0) {
						return;
					}

					var portfolio4 = new Swiper(`#${carouse4lId}`, {
						slidesPerView: "auto",
						spaceBetween: 20,
						loop: loop,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),
						...(dot
							? {
									pagination: {
										el: ".portfolio_pagination",
										clickable: true,
									},
							  }
							: {}),
						breakpoints: {
							992: {
								centeredSlides: true,
								slidesPerView: 3,
								spaceBetween: 30,
							},
							1600: {
								centeredSlides: true,
								slidesPerView: 5,
								spaceBetween: 30,
							},
						},
					});
				}

				// carousel 5
				let portfolio5Carousel = $scope.find(".portfolio-carousel7");

				if (portfolio5Carousel.length > 0) {
					let carouse5lId = portfolio5Carousel.attr("id");

					if (carouse5lId.length < 0) {
						return;
					}

					var portfolio5 = new Swiper(`#${carouse5lId}`, {
						slidesPerView: "auto",
						spaceBetween: 24,
						centeredSlides: true,
						loop: loop,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),
						...(dot
							? {
									pagination: {
										el: ".portfolio_pagination",
										clickable: true,
									},
							  }
							: {}),
						breakpoints: {
							576: {
								spaceBetween: 25,
							},
						},
					});
				}
			}
		);

		// tj-services-carousel
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-services-carousel.default",

			function ($scope, $) {
				let wrap = $scope.find(".carouselWrap");

				var loop = wrap.attr("data-loop") == "yes" ? true : false;
				var dot = wrap.attr("data-dot") == "yes" ? true : false;
				var nav = wrap.attr("data-nav") == "yes" ? true : false;
				var autoplay = wrap.attr("data-autoplay") == "yes" ? true : false;
				var delay = wrap.attr("data-delay") ? wrap.attr("data-delay") : "5000";

				// carousel 1
				let serviceCarousel = $scope.find(".services_carousel.style-6");

				if (serviceCarousel.length > 0) {
					let carouselId = serviceCarousel.attr("id");

					if (carouselId.length < 0) {
						return;
					}

					var services1 = new Swiper(`#${carouselId}`, {
						slidesPerView: 1,
						spaceBetween: 30,
						loop: loop,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),
						...(dot
							? {
									pagination: {
										el: ".services_pagination",
										clickable: true,
									},
							  }
							: {}),
						breakpoints: {
							768: {
								slidesPerView: 2,
							},
							992: {
								slidesPerView: 3,
							},
							1200: {
								slidesPerView: 4,
							},
						},
					});
				}

				// carousel 2
				let service1Carousel = $scope.find(".tj-service-slider2");

				if (service1Carousel.length > 0) {
					let carouselId = service1Carousel.attr("id");

					if (carouselId.length < 0) {
						return;
					}

					var services1 = new Swiper(`#${carouselId}`, {
						slidesPerView: "auto",
						spaceBetween: 20,
						loop: loop,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),
						...(dot
							? {
									pagination: {
										el: ".services_pagination",
										clickable: true,
									},
							  }
							: {}),
						breakpoints: {
							576: {
								spaceBetween: 30,
							},
						},
					});
				}

				// carousel 3
				let service2Carousel = $scope.find(".services_carousel.style-7");

				if (service2Carousel.length > 0) {
					let carouselId = service2Carousel.attr("id");

					if (carouselId.length < 0) {
						return;
					}

					var services3 = new Swiper(`#${carouselId}`, {
						slidesPerView: 1,
						spaceBetween: 30,
						loop: loop,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),
						...(dot
							? {
									pagination: {
										el: ".services_pagination",
										clickable: true,
									},
							  }
							: {}),
						breakpoints: {
							768: {
								slidesPerView: 2,
							},
							992: {
								slidesPerView: 3,
							},
							1200: {
								slidesPerView: 4,
							},
						},
					});
				}

				var $serviceImage = $scope.find(".serviceImage");
				if ($serviceImage.length > 0) {
					var $imageData = $serviceImage.attr("data-bg-image");

					if (!$imageData) {
						return;
					}

					if ($imageData.length > 0) {
						$serviceImage.each(function () {
							$(this).css(
								"background-image",
								"url( " + $(this).attr("data-bg-image") + "  )"
							);
						});
					}
				}
			}
		);

		// tj-teams-carousel
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-teams-carousel.default",

			function ($scope, $) {
				let wrap = $scope.find(".carouselWrap");

				var loop = wrap.attr("data-loop") == "yes" ? true : false;
				var dot = wrap.attr("data-dot") == "yes" ? true : false;
				var nav = wrap.attr("data-nav") == "yes" ? true : false;
				var autoplay = wrap.attr("data-autoplay") == "yes" ? true : false;
				var delay = wrap.attr("data-delay") ? wrap.attr("data-delay") : "5000";

				// carousel 1
				let teamsCarousel = $scope.find(".tj-team-slider");

				if (teamsCarousel.length > 0) {
					let carouselId = teamsCarousel.attr("id");

					if (carouselId.length < 0) {
						return;
					}

					var teams1 = new Swiper(`#${carouselId}`, {
						slidesPerView: "auto",
						spaceBetween: 20,
						loop: loop,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),
						...(dot
							? {
									pagination: {
										el: ".teams_pagination",
										clickable: true,
									},
							  }
							: {}),

						breakpoints: {
							576: {
								spaceBetween: 30,
							},
						},
					});
				}

				// carousel 2
				let teams2Carousel = $scope.find(".tj-team-slider7");

				if (teams2Carousel.length > 0) {
					let carousel2Id = teams2Carousel.attr("id");

					if (carousel2Id.length < 0) {
						return;
					}

					var teams2 = new Swiper(`#${carousel2Id}`, {
						slidesPerView: "auto",
						spaceBetween: 30,
						loop: loop,
						...(autoplay
							? {
									autoplay: {
										delay: delay,
									},
							  }
							: {}),
						...(nav
							? {
									navigation: {
										nextEl: ".slider-next",
										prevEl: ".slider-prev",
									},
							  }
							: {}),
						breakpoints: {
							1200: {
								slidesPerView: 4,
							},
							1400: {
								slidesPerView: 4,
							},
						},
					});
				}
			}
		);

		// tj-footer-gallery
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tj-footer-gallery.default",

			function ($scope, $) {
				let footerGallery = $scope.find(".popup-gallery");

				if (footerGallery.length > 0) {
					footerGallery.magnificPopup({
						delegate: "a",
						type: "image",
						mainClass: "mfp-fade",
						gallery: {
							enabled: true,
						},
					});
				}

				// slider image
				var $galleryImage = $scope.find(".gallery_item");
				if ($galleryImage.length > 0) {
					var $imageData = $galleryImage.attr("data-bg-image");

					if (!$imageData.length) {
						return;
					}

					if ($imageData.length > 0) {
						$galleryImage.each(function () {
							$(this).css(
								"background-image",
								"url( " + $(this).attr("data-bg-image") + "  )"
							);
						});
					}
				}
			}
		);
	});
})(jQuery);

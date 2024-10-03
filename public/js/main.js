/***************************************************
==================== JS INDEX ======================
****************************************************
Mobile Menu Js


****************************************************/

(function ($) {
	"use strict";

	var windowOn = $(window);

	////////////////////////////////////////////////////
	// Data CSS Js
	$("[data-bg-image]").each(function () {
		var $this = $(this),
			$image = $this.data("bg-image");
		$this.css("background-image", "url(" + $image + ")");
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	////////////////////////////////////////////////////
	// Nice Select Js
	$("select").niceSelect();

	////////////////////////////////////////////////////
	// Preloader js
	function loading() {
		document.querySelectorAll(".bar").forEach(function (current) {
			let startWidth = 0;
			const endWidth = current.dataset.size;
			const interval = setInterval(frame, 20);
			function frame() {
				if (startWidth >= endWidth) {
					clearInterval(interval);
				} else {
					startWidth++;
					current.style.width = `${endWidth}%`;
					current.firstElementChild.innerText = `${startWidth}%`;
				}
			}
		});
	}
	setTimeout(loading, 1000);
	$(window).on("load", function () {
		$("#preloader").fadeOut(500);
	});
	if ($("#preloader").length > 0) {
		$(".tj-cancel-btn").each(function () {
			$(this).on("click", function (e) {
				e.preventDefault();
				$("#preloader").fadeOut(500);
			});
		});
	}

	////////////////////////////////////////////////////
	// Sticky js
	$(window).scroll(function () {
		var Width = $(document).width();

		if ($("body").scrollTop() > 250 || $("html").scrollTop() > 250) {
			$(".header-sticky").addClass("sticky");
		} else {
			$(".header-sticky").removeClass("sticky");
		}
	});

	////////////////////////////////////////////////////
	// blog gallery slider
	if ($(".tj-post__gallery").length > 0) {
		$(".tj-post__gallery").owlCarousel({
			items: 1,
			loop: false,
			margin: 0,
			nav: true,
			dots: false,
			navText: [
				'<i class="fal fa-arrow-left"></i>',
				'<i class="fal fa-arrow-right"></i>',
			],
			autoplay: false,
			smartSpeed: 1000,
			autoplayTimeout: 3000,
		});
	}

	// Mobile Menu js
	$("#main-menu").meanmenu({
		meanMenuContainer: "#mobile-navbar-menu",
		meanScreenWidth: "991",
		meanExpand: [
			"<i class='fa-light fa-plus'></i> <i class='fa-light fa-minus'></i>",
		],
	});

	//Canvas sidebar js
	var canva_expander = $(".canva_expander");
	if (canva_expander.length) {
		$(".canva_expander, #canva_close, #tj-overlay-bg2").on(
			"click",
			function (e) {
				e.preventDefault();
				$("body").toggleClass("canvas_expanded");
			}
		);
	}

	// Popup js
	$(document).ready(function () {
		$(".popup-gallery").magnificPopup({
			delegate: "a",
			type: "image",
			mainClass: "mfp-fade",
			gallery: {
				enabled: true,
			},
		});
	});

	// Video js
	var popupvideos = $(".popup-videos-button");
	if (popupvideos.length) {
		$(".popup-videos-button").magnificPopup({
			disableOn: 10,
			type: "iframe",
			mainClass: "mfp-fade",
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false,
		});
	}

	// ScrollTop js
	var webencyScrollTop = document.querySelector(".webency-scroll-top");
	if (webencyScrollTop != null) {
		var scrollProgressPatch = document.querySelector(
			".webency-scroll-top path"
		);
		var pathLength = scrollProgressPatch.getTotalLength();
		var offset = 50;
		scrollProgressPatch.style.transition =
			scrollProgressPatch.style.WebkitTransition = "none";
		scrollProgressPatch.style.strokeDasharray = pathLength + " " + pathLength;
		scrollProgressPatch.style.strokeDashoffset = pathLength;
		scrollProgressPatch.getBoundingClientRect();
		scrollProgressPatch.style.transition =
			scrollProgressPatch.style.WebkitTransition =
				"stroke-dashoffset 10ms linear";
		window.addEventListener("scroll", function (event) {
			var scroll =
				document.body.scrollTop || document.documentElement.scrollTop;
			var height =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			var progress = pathLength - (scroll * pathLength) / height;
			scrollProgressPatch.style.strokeDashoffset = progress;
			var scrollElementPos =
				document.body.scrollTop || document.documentElement.scrollTop;
			if (scrollElementPos >= offset) {
				webencyScrollTop.classList.add("progress-done");
			} else {
				webencyScrollTop.classList.remove("progress-done");
			}
		});
		webencyScrollTop.addEventListener("click", function (e) {
			e.preventDefault();
			window.scroll({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
		});
	}

	// WOW
	$(window).on("load", function () {
		var wow = new WOW({
			boxClass: "wow", // default
			animateClass: "animated", // default
			offset: 0, // default
			mobile: true, // default
			live: true, // default
		});
		wow.init();
	});
})(jQuery);

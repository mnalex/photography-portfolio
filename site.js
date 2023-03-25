$.noConflict();

(function ($){
	let format;
	let currentScrollY;

	//#region Mobile Event Handlers
	function handleMobileScroll() {
		// Handle instance where we jump into the webpage, we want to see the header
		if (!currentScrollY) {
			currentScrollY = window.scrollY;
			return;
		}

		// Otherwise, show the header if we are scrolling up or hide if we are scrolling down
		const mobileHeader = $('#mbHeader');
		const mobileMenu = $('#mbMenu');
		const newScrollY = window.scrollY;

		if (mobileMenu.hasClass('opened')) {
			return;
		}

		if (newScrollY > currentScrollY) {
			if (newScrollY > 80) { // 80px is the header height
				if (!mobileHeader.hasClass('hidden')) {
					mobileHeader.addClass('hidden');
				}
			}
		} else {
			if (mobileHeader.hasClass('hidden')) {
				mobileHeader.removeClass('hidden');
			}
		}

		currentScrollY = window.scrollY;
	}

	function toggleMobileMenu() {
		const mbMenuToggle = $('#mobileMenuButton');
		const mbMenu = $('#mbMenu');

		if (mbMenuToggle.hasClass("opened")) {
			mbMenuToggle.removeClass("opened");
		} else {
			mbMenuToggle.addClass("opened");
		}

		if (mbMenu.hasClass("opened")) {
			mbMenu.removeClass("opened");
		} else {
			mbMenu.addClass("opened");
		}
	}

	function registerMobileEventHandlers() {
		$(window).on('scroll', handleMobileScroll);
		$('#mobileMenuButton').on('click', toggleMobileMenu);
	}

	function unregisterMobileEventHandlers() {
		$(window).off('scroll', handleMobileScroll);
		$('#mobileMenuButton').off('click', toggleMobileMenu);
	}

	//#endregion

	function handleWindowResize() {
		const newViewportWidth = window.innerWidth;
		if (newViewportWidth <= 600) {
			if (format === 'mobile') {
				return;
			}
			registerMobileEventHandlers();
			if (!format || format === 'desktop') {
				// unregister desktop EH
			}
			format = 'mobile';
		} else {
			if (format === 'desktop') {
				return;
			}
			// register desktop EH
			if (!format || format === 'mobile') {
				unregisterMobileEventHandlers();
			}
			format = 'desktop';
		}
	}

	function setupResponsiveEvents() {
		$(window).on('resize', handleWindowResize);
		handleWindowResize();
	}

	// load images
	/*const imageGalleryDiv = document.getElementById("images");
	for (let row = 0; row < 9; row++) {
		const newDiv = document.createElement("div");
		newDiv.style.position = "absolute"
		newDiv.style.backgroundColor = "#f1f1f1";
		newDiv.style.height = "35vh";
		newDiv.style.width = "49vw";
		newDiv.style.left = "0vw";
		newDiv.style.top = ((row*35) + row) + "vh";

		imageGalleryDiv.appendChild(newDiv);

		const secDiv = document.createElement("div");
		secDiv.style.position = "absolute"
		secDiv.style.backgroundColor = "#f1f1f1";
		secDiv.style.width = "49vw";
		secDiv.style.height = "35vh";
		secDiv.style.top = ((row*35) + row) + "vh";
		secDiv.style.right = "0vw";

		imageGalleryDiv.appendChild(secDiv);
	}*/

	setupResponsiveEvents();
})(jQuery);
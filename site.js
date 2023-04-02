$.noConflict();

(async function ($){
	let format;
	let currentScrollY;
	let isClosing = false, isScrollLocked = false;

	//#region Image Gallery
	async function loadImagesFromGallery() {
		const images = [
			'./images/album/portrait/p1.png',
			'./images/album/portrait/p2.png',
			'./images/album/portrait/p3.png',
			'./images/album/portrait/p4.png',
			'./images/album/portrait/p5.png',
			'./images/album/portrait/p6.png',
			'./images/album/portrait/p7.png',
			'./images/album/portrait/p8.png',
		];
		for (let index in images)
		{
			const imageWrapper = document.createElement('div');
			imageWrapper.classList.add('image-asset');

			if (index == 3 || index == 5)
			{
				imageWrapper.classList.add('large');
			}

			const newImg = new Image();
			newImg.src = images[index];
			newImg.onload = async () => {
				await new Promise(resolve => setTimeout(resolve, 250));
				imageWrapper.classList.add('loaded');
			}

			imageWrapper.append(newImg);
			$('#gallery').append(imageWrapper);

			await new Promise(resolve => setTimeout(resolve, 250));

			if (index == images.length-1) {
				$('#ftr').removeClass('hide');
			}
		}
	}
	//#endregion

	//#region Mobile Event Handlers
	function handleMobileScroll() {
		// Handle instance where we jump into the webpage, we want to see the header
		if (!currentScrollY) {
			currentScrollY = window.scrollY;
			return;
		}

		// Otherwise, show the header if we are scrolling up or hide if we are scrolling down
		const mobileHeader = $('#mbHeader');
		const newScrollY = window.scrollY;

		if (mobileHeader.hasClass('opened') || isScrollLocked === true) {
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
		if (!!isClosing) {
			return;
		}

		const mbMenuToggle = $('#mobileMenuButton');
		const mbMenu = $('#mbMenu');
		const body = $('body');

		if (mbMenuToggle.hasClass("opened")) {
			mbMenuToggle.removeClass("opened");
		} else {
			mbMenuToggle.addClass("opened");
		}

		if (mbMenu.hasClass("opened")) {
			isClosing = true;
			mbMenu.addClass("closing");
			mbMenu.removeClass("opened");
			setTimeout(() => {
				mbMenu.removeClass("closing");
				body.removeClass("scroll-locked");
				isClosing = false;
				isScrollLocked = false;
			}, 200);
		} else {
			mbMenu.addClass("opened");
			body.addClass("scroll-locked");
			isScrollLocked = true;
		}
	}

	function registerMobileEventHandlers() {
		$(window).on('scroll', handleMobileScroll);
		$('#mobileMenuButton').on('click', toggleMobileMenu);
		$('#tempBtn').on('click', toggleMobileMenu); // temp
	}

	function unregisterMobileEventHandlers() {
		$(window).off('scroll', handleMobileScroll);
		$('#mobileMenuButton').off('click', toggleMobileMenu);
		$('#tempBtn').off('click', toggleMobileMenu); // temp
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
		// reformat images
	}

	function setupResponsiveEvents() {
		$(window).on('resize', handleWindowResize);
		handleWindowResize();
	}

	setupResponsiveEvents();
	await loadImagesFromGallery();
})(jQuery);
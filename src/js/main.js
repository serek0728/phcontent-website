const navBtn = document.querySelector('.hamburger')
const navMobile = document.querySelector('.nav-mobile')
const allNavItems = document.querySelectorAll('.nav__link')

const navDesktop = document.querySelector('.nav-desktop')

const boxes = document.querySelectorAll('.cooperation__box')
const section = document.querySelector('.cooperation')
const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: window.innerWidth >= 992 ? 0.3 : 0.2,
}

const msgStatus = document.querySelector('.msg-status')

const footerYear = document.querySelector('.footer__year')

// Funkcje

const handleNav = () => {
	navBtn.classList.toggle('is-active')
	navMobile.classList.toggle('nav-mobile--active')
}

allNavItems.forEach(item => {
	item.addEventListener('click', () => {
		navMobile.classList.remove('nav-mobile--active')
		navBtn.classList.remove('is-active')
	})
})

const closeNav = () => {
	if (!navMobile.classList.contains('nav-mobile--active')) return

	navMobile.classList.remove('nav-mobile--active')
	navBtn.classList.remove('is-active')
}

const navShrink = () => {
	if (window.scrollY > 50) {
		navDesktop.classList.add('nav-desktop-shrink')
	} else {
		navDesktop.classList.remove('nav-desktop-shrink')
	}
}

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			// animacja sekwencyjna dla każdego boxa
			boxes.forEach((box, index) => {
				setTimeout(() => {
					box.classList.add('cooperation__box-show')
				}, index * 800) // opóźnienia między boxami
			})
			observer.unobserve(entry.target) // przestajemy obserwować po pierwszym wejściu
		}
	})
}, observerOptions)

//

console.log(document.location.search)

if (document.location.search === '?mail_status=sent') {
	msgStatus.classList.add('success')
	msgStatus.textContent = 'Wiadomość wysłana!'

	setTimeout(() => {
		msgStatus.classList.remove('success')
	}, 3000)
}

if (document.location.search === '?mail_status=error') {
	msgStatus.classList.add('error')
	msgStatus.textContent = 'Wystąpił błąd.'

	setTimeout(() => {
		msgStatus.classList.remove('error')
	}, 3000)
}

//
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

// LISTENERY

navBtn.addEventListener('click', handleNav)
window.addEventListener('scroll', navShrink)
window.addEventListener('scroll', closeNav)
window.addEventListener('touchmove', closeNav)
observer.observe(section)
handleCurrentYear()

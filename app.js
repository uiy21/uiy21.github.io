document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const contactButton = document.getElementById('contact-button');
    const contactButtonMobile = document.getElementById('contact-button-mobile');
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeContactModal');
    const preloader = document.getElementById('preloader');
    const scrollTopButton = document.getElementById('scrollTopButton');
    const closeModal = document.getElementById('closeModal');
    const progressBar = document.getElementById('progress-bar');
    const promoModal = document.getElementById('promoModal');
    const promoCodeElement = document.getElementById('promoCode');
    const closePromoModal = document.getElementById('closePromoModal');
    const noPrizeModal = document.getElementById('noPrizeModal');
    const closeNoPrizeModal = document.getElementById('closeNoPrizeModal');
    const mobileBanner = document.getElementById('mobile-banner');
    const copyLinkButton = document.getElementById('copy-link-button');
    const closeBannerButton = document.getElementById('close-banner-button');

    // Прелоадер
    window.addEventListener('load', () => {
        preloader.style.display = 'none';
    });

    // Индикатор прокрутки страницы
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${progress}%`;

        // Плавная прокрутка вверх
        if (scrollTop > 300) {
            scrollTopButton.classList.remove('hidden');
        } else {
            scrollTopButton.classList.add('hidden');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    contactButton.addEventListener('click', () => {
        contactModal.classList.remove('hidden');
        contactModal.classList.add('show');
    });

    contactButtonMobile.addEventListener('click', () => {
        contactModal.classList.remove('hidden');
        contactModal.classList.add('show');
    });

    closeContactModal.addEventListener('click', () => {
        contactModal.classList.add('hidden');
        contactModal.classList.remove('show');
    });

    const container = document.getElementById('casino-grid');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    function renderCasinos(casinos) {
        container.innerHTML = '';
        casinos.forEach(casino => {
            const casinoElement = document.createElement('div');
            casinoElement.classList.add('bg-gray-800', 'p-6', 'rounded-lg', 'shadow-lg', 'transition', 'transform', 'hover:scale-105', 'hover:shadow-2xl', 'hover:border-green-500', 'border-4', 'border-transparent', 'card', 'animate-fade-in');

            casinoElement.innerHTML = `
                <img src="${casino.image}" alt="${casino.name}" class="w-full h-48 object-cover object-center mb-4 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                    <h2 class="text-2xl font-bold text-white">${casino.name}</h2>
                    <div class="text-gray-400 flex items-center space-x-2">
                        <div class="flex items-center gift-info">
                            <i class="fas fa-gift text-green-400"></i>
                            <span class="ml-1">${casino.giftText}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-400"></i>
                            <span class="ml-1">${casino.starRating}</span>
                        </div>
                    </div>
                </div>
                <p class="text-gray-400 mb-4">${casino.description}</p>
                <div class="flex flex-col space-y-2">
                    <button onclick="showModal('${casino.name}', '${casino.description}')" class="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 shadow-lg transition-transform transform hover:scale-105">Подробнее</button>
                    <a href="${casino.url}" class="inline-block px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 shadow-lg transition-transform transform hover:scale-105 text-center">Перейти</a>
                </div>
            `;

            container.appendChild(casinoElement);
        });
        container.classList.add('casino-list');
        updateCardVisibility(); // Ensure visibility settings are applied after rendering
    }

    window.showModal = function (title, description) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.classList.remove('hidden');
        modal.classList.add('show');
    }

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('show');
    });

    document.getElementById('sortDropdown').addEventListener('change', (event) => {
        const value = event.target.value;
        let sortedCasinos;
        if (value === 'name') {
            sortedCasinos = [...casinos].sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === 'bonus') {
            sortedCasinos = [...casinos].sort((a, b) => b.bonus - a.bonus);
        } else if (value === 'novelty') {
            sortedCasinos = [...casinos].sort((a, b) => b.novelty - a.novelty);
        }
        renderCasinos(sortedCasinos);
    });

    document.getElementById('randomCasino').addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * casinos.length);
        renderCasinos([casinos[randomIndex]]);
    });

    renderCasinos(casinos);

    // Раздача бездепов
    const playButton = document.getElementById('play-button');
    const cardsContainer = document.getElementById('cards-container');
    const cards = Array.from(document.querySelectorAll('.card-item'));
    const promoCodes = ['PROMOCODE1', 'PROMOCODE2', 'PROMOCODE3', 'PROMOCODE4', 'PROMOCODE5'];

    playButton.addEventListener('click', () => {
        cards.forEach(card => {
            card.innerText = '???';
            card.classList.remove('revealed', 'selected');
            card.classList.add('clickable');
        });

        setTimeout(() => {
            shuffleCards();
            cards.forEach(card => {
                card.classList.add('shuffled');
            });
        }, 500);
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('shuffled') && card.classList.contains('clickable')) {
                card.classList.remove('clickable');
                const isWin = checkWin(card.dataset.value);
                if (isWin) {
                    const promoCode = promoCodes[Math.floor(Math.random() * promoCodes.length)];
                    card.dataset.value = '5$'; // Update the card value to ensure it displays correctly
                    revealCard(card);
                    promoCodeElement.innerText = promoCode;
                    promoModal.classList.remove('hidden');
                    promoModal.classList.add('show');
                } else {
                    card.dataset.value = 'Ничего'; // Update the card value to ensure it displays correctly
                    revealCard(card);
                    noPrizeModal.classList.remove('hidden');
                    noPrizeModal.classList.add('show');
                }
                card.classList.add('selected');
                cards.forEach(card => {
                    if (!card.classList.contains('selected')) {
                        revealCard(card);
                        card.classList.remove('clickable'); // Make other cards unclickable
                    }
                });
            }
        });
    });

    closePromoModal.addEventListener('click', () => {
        promoModal.classList.add('hidden');
        promoModal.classList.remove('show');
    });

    closeNoPrizeModal.addEventListener('click', () => {
        noPrizeModal.classList.add('hidden');
        noPrizeModal.classList.remove('show');
    });

    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i].dataset.value, cards[j].dataset.value] = [cards[j].dataset.value, cards[i].dataset.value];
        }
    }

    function revealCard(card) {
        card.innerText = card.dataset.value;
        card.classList.add('revealed');
    }

    function checkWin(value) {
        if (value === '5$') {
            return Math.random() < 0.5;
        } else if (value === 'Ничего') {
            return Math.random() < 0.5;
        } else {
            return false;
        }
    }

    // Показать баннер для мобильных пользователей раз в сутки
    const lastBannerDisplay = localStorage.getItem('lastBannerDisplay');
    const now = new Date().getTime();

    if (!lastBannerDisplay || now - lastBannerDisplay > 24 * 60 * 60 * 1000) {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            mobileBanner.classList.remove('hidden');
        }
    }

    copyLinkButton.addEventListener('click', () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link).then(() => {
            localStorage.setItem('lastBannerDisplay', new Date().getTime());
            mobileBanner.classList.add('hidden');
        });
    });

    closeBannerButton.addEventListener('click', () => {
        localStorage.setItem('lastBannerDisplay', new Date().getTime());
        mobileBanner.classList.add('hidden');
    });

    // Функция для скрытия или показа элементов в зависимости от ширины экрана
    function updateCardVisibility() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const giftTextElement = card.querySelector('.gift-info span');
            const giftIconElement = card.querySelector('.gift-info i');

            if (isMobile) {
                if (giftTextElement) {
                    giftTextElement.style.display = 'none';
                }
                if (giftIconElement) {
                    giftIconElement.style.display = 'none';
                }
            } else {
                if (giftTextElement) {
                    giftTextElement.style.display = 'inline';
                }
                if (giftIconElement) {
                    giftIconElement.style.display = 'inline';
                }
            }
        });
    }

    // Запускаем функцию при загрузке страницы и при изменении размера окна
    updateCardVisibility();
    window.addEventListener('resize', updateCardVisibility);
});

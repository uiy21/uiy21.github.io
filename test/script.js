// script.js

// Проверка, что массив casinos загружен
if (typeof casinos === 'undefined') {
    console.error("Массив 'casinos' не определён. Убедитесь, что 'casinos.js' подключён правильно и содержит массив 'casinos'.");
}

// Получение элементов из DOM
const casinoList = document.getElementById("casinoList");
const searchInput = document.getElementById("searchInput");
const backToTopBtn = document.getElementById("backToTop");
const loadingSpinner = document.getElementById("loadingSpinner");
const noResults = document.querySelector(".no-results");
const sortButtons = document.querySelectorAll(".sort-btn");

let filteredCasinos = [...casinos];
let currentSort = "new"; // По умолчанию сортировка по новизне

let animationInterval = null;
let animationTimeout = null;

// Функция для отображения спиннера
const showSpinner = () => {
    loadingSpinner.classList.remove('hide');
    loadingSpinner.classList.add('show');
}

// Функция для скрытия спиннера
const hideSpinner = () => {
    loadingSpinner.classList.remove('show');
    loadingSpinner.classList.add('hide');
}

// Получение избранных из localStorage
const getFavorites = () => new Set(JSON.parse(localStorage.getItem("favorites")) || []);

// Сохранение избранных в localStorage
const saveFavorites = (favorites) => localStorage.setItem("favorites", JSON.stringify([...favorites]));

// Функция для сортировки казино
const sortCasinos = (criteria, list) => {
    const sorted = [...list];
    switch(criteria) {
        case "bonus":
            sorted.sort((a, b) => b.bonus - a.bonus);
            break;
        case "rating":
            sorted.sort((a, b) => b.starRating - a.starRating);
            break;
        case "likes":
            sorted.sort((a, b) => b.totalLikes - a.totalLikes);
            break;
        case "new":
        default:
            sorted.sort((a, b) => b.novelty - a.novelty);
    }
    return sorted;
}

// Детерминированная функция для генерации псевдослучайного числа на основе строки
const pseudoRandom = (str) => {
    let hash = 0;
    for(let i =0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }
    const rand = Math.abs(Math.sin(hash)) * 10000;
    return rand - Math.floor(rand);
}

// Функция для генерации псевдослучайного увеличения лайков от 1 до 15
const getLikesIncrement = (casinoName, dayIndex) => {
    const seed = `${casinoName}-${dayIndex}`;
    const rand = pseudoRandom(seed);
    return Math.floor(rand * 15) + 1; // 1-15
}

// Функция для расчета текущих лайков
const calculateCurrentLikes = (casino) => {
    const currentDate = new Date();
    const startDate = new Date(casino.startDate);
    const timeDiff = currentDate - startDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysPassed < 0) return casino.baseLikes;

    let totalLikes = casino.baseLikes;

    // Учитываем новизну: чем меньше новизна, тем меньше лайков
    // Например, можем уменьшить количество дней для генерации лайков
    const adjustedDays = Math.max(daysPassed - (20 - casino.novelty), 0); // Пример регулировки
    const actualDays = adjustedDays < daysPassed ? adjustedDays : daysPassed;

    for(let i =1; i<=actualDays; i++) {
        totalLikes += getLikesIncrement(casino.name, i);
    }

    return totalLikes;
}

// Функция для рендеринга казино
const renderCasinos = (list) => {
    showSpinner();
    casinoList.innerHTML = "";
    noResults.classList.add('hide');

    if (list.length === 0) {
        noResults.classList.remove('hide');
        hideSpinner();
        return;
    }

    const fragment = document.createDocumentFragment();
    const favorites = getFavorites();

    list.forEach(casino => {
        const currentLikes = calculateCurrentLikes(casino);
        const userLiked = favorites.has(casino.name);
        const totalLikes = userLiked ? currentLikes + 1 : currentLikes;

        // Добавляем свойство totalLikes для сортировки
        casino.totalLikes = totalLikes;

        const card = document.createElement("div");
        card.className = "casino-card";
        card.innerHTML = `
            <button class="favorite-btn" data-name="${casino.name}" aria-label="Добавить в избранное">
                <i class="fas fa-heart"></i>
            </button>
            <div class="like-container" data-tooltip="Нравится" aria-label="Количество лайков">
                <i class="fas fa-thumbs-up"></i>
                <span class="like-count">${totalLikes}</span>
            </div>
            <img src="${casino.image}" alt="${casino.name}" loading="lazy">
            <div class="content">
                <h2>${casino.name}</h2>
                <p class="description">${casino.description}</p>
                <p class="starRating" aria-label="Рейтинг ${casino.starRating} из 5">${casino.starRating} <i class="fas fa-star"></i></p>
                <a href="${casino.url}" target="_blank" rel="noopener noreferrer">Перейти</a>
            </div>
        `;

        if (favorites.has(casino.name)) {
            card.querySelector(".favorite-btn").classList.add("active");
        }

        fragment.appendChild(card);
    });

    casinoList.appendChild(fragment);

    // Добавление анимации появления карточек
    requestAnimationFrame(() => {
        document.querySelectorAll(".casino-card").forEach(card => {
            setTimeout(() => {
                card.classList.add("visible");
            }, 50);
        });
    });

    hideSpinner();

    // Инициализация тултипов
    if (typeof tippy !== 'undefined') {
        tippy('.like-container', {
            content: 'Нравится',
            placement: 'top',
            animation: 'scale',
            theme: 'light',
        });

        tippy('.starRating', {
            content: 'Это средний рейтинг казино',
            placement: 'top',
            animation: 'scale',
            theme: 'light',
        });
    }
}

// Фильтрация казино по поисковому запросу
const filterCasinos = () => {
    const query = searchInput.value.toLowerCase();
    filteredCasinos = casinos.filter(casino => casino.name.toLowerCase().includes(query));
    renderCasinos(sortCasinos(currentSort, filteredCasinos));
}

// Debounce функция для оптимизации поиска
const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    }
}

// Обработчик ввода в поле поиска с debounce
searchInput.addEventListener("input", debounce(filterCasinos, 300));

// Обработчики сортировки
sortButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const sortType = btn.dataset.sort;

        // Удаляем класс 'active' у всех кнопок
        sortButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentSort = sortType;

        if (sortType === "random") {
            triggerRandomSelection();
        } else {
            renderCasinos(sortCasinos(currentSort, filteredCasinos));
        }
    });
});

// Функция для анимации выбора случайного казино
const triggerRandomSelection = () => {
    const casinoCards = document.querySelectorAll(".casino-card");
    if (casinoCards.length === 0) return;

    let currentIndex = 0;

    // Очищаем предыдущие анимации, если они есть
    clearInterval(animationInterval);
    clearTimeout(animationTimeout);

    // Удаляем все выделения
    casinoCards.forEach(card => {
        card.classList.remove("highlighted", "animating");
    });

    // Запускаем анимацию мигания
    animationInterval = setInterval(() => {
        casinoCards.forEach(card => card.classList.remove("animating"));
        casinoCards[currentIndex].classList.add("animating");
        currentIndex = (currentIndex + 1) % casinoCards.length;
    }, 100); // Меняем карточку каждые 100 мс

    // После 3 секунд останавливаем анимацию и выбираем случайное казино
    animationTimeout = setTimeout(() => {
        clearInterval(animationInterval);
        casinoCards.forEach(card => card.classList.remove("animating"));

        // Выбираем случайный индекс
        const randomIndex = Math.floor(Math.random() * casinoCards.length);
        const selectedCard = casinoCards[randomIndex];

        // Добавляем класс выделения
        selectedCard.classList.add("highlighted");

        // Прокручиваем до выбранной карточки
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Убираем выделение через несколько секунд
        setTimeout(() => {
            selectedCard.classList.remove("highlighted");
        }, 3000); // 3 секунды
    }, 3000); // Общая длительность анимации 3 секунды
}

// Делегирование событий для кнопок "Избранное"
casinoList.addEventListener("click", (e) => {
    const favBtn = e.target.closest(".favorite-btn");
    if (favBtn) {
        const casinoName = favBtn.dataset.name;
        const favorites = getFavorites();

        if (favorites.has(casinoName)) {
            favorites.delete(casinoName);
            favBtn.classList.remove("active");
            // Уменьшаем количество лайков
            const card = favBtn.closest(".casino-card");
            const likeCount = card.querySelector(".like-count");
            likeCount.textContent = Math.max(0, parseInt(likeCount.textContent) - 1);
            // Уменьшаем totalLikes в объекте казино
            const casino = casinos.find(c => c.name === casinoName);
            if (casino) {
                casino.totalLikes = Math.max(0, casino.totalLikes - 1);
            }
        } else {
            favorites.add(casinoName);
            favBtn.classList.add("active");
            // Увеличиваем количество лайков
            const card = favBtn.closest(".casino-card");
            const likeCount = card.querySelector(".like-count");
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
            // Увеличиваем totalLikes в объекте казино
            const casino = casinos.find(c => c.name === casinoName);
            if (casino) {
                casino.totalLikes += 1;
            }
        }

        saveFavorites(favorites);
    }
});

// Функционал "Наверх"
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
    } else {
        backToTopBtn.classList.remove("visible");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Изначальный рендеринг казино при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    renderCasinos(sortCasinos(currentSort, filteredCasinos));
});

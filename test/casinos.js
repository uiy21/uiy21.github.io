// casinos.js

const casinos = [
    {
        name: "1GO",
        image: "images/1go.jpg",
        bonus: 100000,
        novelty: 12,
        url: "https://bit.ly/48jpChA",
        description: "125 фриспинов и +150% за первые депозиты",
        giftText: "Специальный бонус",
        starRating: 4.5,
        baseLikes: 18, // (12 * 1.5)
        startDate: "2024-11-04", // Текущая дата (2024-12-16) минус novelty (12 дней)
        likesPerDay: 1.5
    },
    {
        name: "DRIP",
        image: "images/drip.jpg",
        bonus: 100000,
        novelty: 7,
        url: "https://bit.ly/3VjbgdS",
        description: "200 фриспинов и +325% за первые депозиты",
        giftText: "Большой бонус",
        starRating: 4.7,
        baseLikes: 10, // (7 * 1.5)
        startDate: "2024-12-09",
        likesPerDay: 1.5
    },
    {
        name: "GAMA",
        image: "images/gama.jpg",
        bonus: 1000,
        novelty: 6,
        url: "https://bit.ly/3YU10L3",
        description: "+200% к первому депозиту и 200 фриспинов",
        giftText: "Эксклюзивный бонус",
        starRating: 4.2,
        baseLikes: 9, // (6 * 1.5)
        startDate: "2024-12-10",
        likesPerDay: 1.5
    },
    {
        name: "STARDA",
        image: "images/starda.jpg",
        bonus: 100,
        novelty: 5,
        url: "https://bit.ly/3juckvm",
        description: "+100% к первому депозиту и до 500 фриспинов",
        giftText: "Сюрприз бонус",
        starRating: 4.0,
        baseLikes: 7, // (5 * 1.5)
        startDate: "2024-12-11",
        likesPerDay: 1.5
    },
    {
        name: "ROX",
        image: "images/rox.jpg",
        bonus: 200,
        novelty: 3,
        url: "https://bit.ly/3sKDIGg",
        description: "250 фриспинов и +200% к первому депозиту",
        giftText: "Роскошный бонус",
        starRating: 4.3,
        baseLikes: 4, // (3 * 1.5)
        startDate: "2024-12-13",
        likesPerDay: 1.5
    },
    {
        name: "LEGZO",
        image: "images/legzo.jpg",
        bonus: 200,
        novelty: 2,
        url: "https://bit.ly/3NwJ1CY",
        description: "500 фриспинов и +100% к первому депозиту",
        giftText: "Легендарный бонус",
        starRating: 4.1,
        baseLikes: 3, // (2 * 1.5)
        startDate: "2024-12-14",
        likesPerDay: 1.5
    },
    {
        name: "CAT CASINO",
        image: "images/cat.jpg",
        bonus: 100,
        novelty: 4,
        url: "https://bit.ly/3fNw4YQ",
        description: "200 фриспинов и +325% за первые депозиты",
        giftText: "Бонус для котиков",
        starRating: 4.4,
        baseLikes: 6, // (4 * 1.5)
        startDate: "2024-12-12",
        likesPerDay: 1.5
    },
    {
        name: "MONRO",
        image: "images/monro.jpg",
        bonus: 100000000,
        novelty: 8,
        url: "https://bit.ly/3tHGwba",
        description: "10% кэшбэк и +150% к первому депозиту",
        giftText: "Мега бонус",
        starRating: 4.8,
        baseLikes: 12, // (8 * 1.5)
        startDate: "2024-12-08",
        likesPerDay: 1.5
    },
    {
        name: "DADDY",
        image: "images/daddy.jpg",
        bonus: 10000000,
        novelty: 9,
        url: "https://bit.ly/3yK9ZDC",
        description: "10% кэшбэк и +150% к первому депозиту",
        giftText: "Папин бонус",
        starRating: 4.6,
        baseLikes: 13, // (9 * 1.5)
        startDate: "2024-12-07",
        likesPerDay: 1.5
    },
    {
        name: "LEX",
        image: "images/lex.jpg",
        bonus: 1000000000000,
        novelty: 14,
        url: "https://bit.ly/3KiyZEr",
        description: "400 фриспинов и +225% к первому депозиту",
        giftText: "Топ бонус",
        starRating: 4.9,
        baseLikes: 21, // (14 * 1.5)
        startDate: "2024-11-30", // Дата с учетом текущей даты 2024-12-16 минус 14 дней
        likesPerDay: 1.5
    },
    {
        name: "GIZBO",
        image: "images/gizby.jpg",
        bonus: 10000000000,
        novelty: 10,
        url: "https://bit.ly/40KLBxz",
        description: "225% и +600% к первому депозиту",
        giftText: "Топ бонус",
        starRating: 4.9,
        baseLikes: 15, // (10 * 1.5)
        startDate: "2024-12-06",
        likesPerDay: 1.5
    },
    {
        name: "KOMETA",
        image: "images/kometa.jpg",
        bonus: 10000000000,
        novelty: 19,
        url: "https://bit.ly/40RfHPY",
        description: "225% и +500FS к первому депозиту",
        giftText: "Крутой бонус",
        starRating: 4.6,
        baseLikes: 28, // (19 * 1.5)
        startDate: "2024-11-27",
        likesPerDay: 1.5
    },
    {
        name: "R7",
        image: "images/r7.jpg",
        bonus: 100000000000,
        novelty: 18,
        url: "https://bit.ly/4fN7iBF",
        description: "275% и +210FS к первому депозиту",
        giftText: "Классный бонус",
        starRating: 4.8,
        baseLikes: 27, // (18 * 1.5)
        startDate: "2024-11-28",
        likesPerDay: 1.5
    },
    {
        name: "KENT",
        image: "images/kent.jpg",
        bonus: 10000000000000,
        novelty: 17,
        url: "https://bit.ly/4eqpNKV",
        description: "275% и +200FS к первому депозиту",
        giftText: "Супер бонус",
        starRating: 5,
        baseLikes: 25, // (17 * 1.5)
        startDate: "2024-11-29",
        likesPerDay: 1.5
    },
];

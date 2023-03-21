const promoCodes = [
    "PROMO1",
    "PROMO2",
    "PROMO3",
    // ... add other promo codes here
];

const casinos = [
    {
        name: "Cat Casino",
        image: "images/cat.jpg",
        bonus: 100,
        novelty: 5,
        url: "https://bit.ly/3fNw4YQ",
        description: "A cat-themed casino with various games and promotions."
    },
    {
        name: "Gama",
        image: "images/gama.jpg",
        bonus: 1000,
        novelty: 6,
        url: "hhttps://bit.ly/3YHRase",
        description: "A cat-themed casino with various games and promotions."
    },
    {
        name: "Rox",
        image: "images/rox.jpg",
        bonus: 200,
        novelty: 1,
        url: "https://bit.ly/3sKDIGg",
        description: "A cat-themed casino with various games and promotions."
    },
    {
        name: "Starda",
        image: "images/starda.jpg",
        bonus: 100,
        novelty: 1,
        url: "https://bit.ly/3juckvm",
        description: "A cat-themed casino with various games and promotions."
    }
    // ... add other casino objects here
];

const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.textContent = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Promo code copied to clipboard!");
};

const spinWheel = () => {
    const wheel = $("#wheel");
    const spinDegrees = 360 * (5 + Math.floor(Math.random() * 5));
    wheel.css("transform", `rotate(${spinDegrees}deg)`);

    $("#spin-wheel").addClass("inactive");

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * promoCodes.length);
        const randomPromoCode = promoCodes[randomIndex];
        $("#spin-wheel").fadeOut(() => {
            $("#spin-wheel").html(`<span>${randomPromoCode}</span>`).fadeIn();
            $("#spin-wheel").removeClass("inactive").addClass("promo-code");
        });
    }, 5000);
};

$(document).ready(function () {
    $("#spin-wheel").click(() => spinWheel());

    const createCasinoBlock = (casino) => {
        return `
            <div class="casino-item">
                <a href="${casino.url}" target="_blank">
                    <img src="${casino.image}" alt="${casino.name}">
                    <h2>${casino.name}</h2>
                    <p>${casino.description}</p>
                </a>
            </div>
        `;
    };

    const renderCasinos = (casinos) => {
        const casinoList = $(".casino-list");
        casinoList.empty();

        casinos.forEach((casino) => {
            const casinoBlock = createCasinoBlock(casino);
            casinoList.append(casinoBlock);
        });

        $(".casino-item").hide().fadeIn(1000);
    };

    renderCasinos(casinos);

    const setActiveButton = (buttonId) => {
        $(".sort-controls button").removeClass("active");
        $(buttonId).addClass("active");
    };

    $("#sort-alpha").click(() => {
        const sortedCasinos = casinos.sort((a, b) => a.name.localeCompare(b.name));
        renderCasinos(sortedCasinos);
        setActiveButton("#sort-alpha");
    });

    $("#sort-bonus").click(() => {
        const sortedCasinos = casinos.sort((a, b) => b.bonus - a.bonus);
        renderCasinos(sortedCasinos);
        setActiveButton("#sort-bonus");
    });

    $("#sort-novelty").click(() => {
        const sortedCasinos = casinos.sort((a, b) => b.novelty - a.novelty);
        renderCasinos(sortedCasinos);
        setActiveButton("#sort-novelty");
    });

    const highlightCasino = (index) => {
        $(".casino-item").css("box-shadow", "0 4px 6px rgba(0, 0, 0, 0.1)");

        $(".casino-item").eq(index).css("box-shadow", "0 4px 6px rgba(0, 255, 0, 0.7)");
    };

    const randomSelect = () => {
        const casinoCount = casinos.length;
        let currentIndex = 0;
        let startTime = Date.now();
        let intervalDuration = 100;
        let intervalId;

        const updateInterval = () => {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                const timeElapsed = Date.now() - startTime;
                if (timeElapsed > 5000) {
                    clearInterval(intervalId);
                } else {
                    highlightCasino(currentIndex);
                    currentIndex = (currentIndex + 1) % casinoCount;
                    if (timeElapsed > 4000) {
                        intervalDuration += 50;
                    } else if (timeElapsed > 3000) {
                        intervalDuration += 20;
                    } else if (timeElapsed > 2000) {
                        intervalDuration += 10;
                    }
                    updateInterval();
                }
            }, intervalDuration);
        };

        updateInterval();
    };

    $("#random-select").click(() => {
        randomSelect();
    });

    $(".sort-controls button").on("mouseover", function () {
        $(this).stop().animate({ backgroundColor: "#555" }, 300);
    }).on("mouseout", function () {
        $(this).stop().animate({ backgroundColor: "#333" }, 300);
    });
    $("#spin-wheel").off("click").on("click", function () {
        if ($(this).hasClass("promo-code")) {
            const promoCode = $(this).text();
            copyToClipboard(promoCode);
            // Reset the button to its initial state
            $(this).text("🎡 Spin the Wheel").removeClass("promo-code");
            hideClickToCopy();
        } else if (!$(this).hasClass("inactive")) {
            spinWheel();
            showClickToCopy();
        }
    });

    const showClickToCopy = () => {
        const clickToCopy = $('<span class="click-to-copy">Click to copy</span>');
        $("#spin-wheel").after(clickToCopy.hide());
        clickToCopy.fadeIn();
    };
    
    const hideClickToCopy = () => {
        $(".click-to-copy").fadeOut(() => {
            $(".click-to-copy").remove();
        });
    };
});
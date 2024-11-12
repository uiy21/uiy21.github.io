const promoCodes = [
    "GAMX5PWPXP93",
    "Попробуй ещё раз",
    "GAMD66G3EN1O",
    "GAMC6MZGVKTP",
    "Попробуй ещё раз"
    // ... add other promo codes here
];

const casinos = [
    {
        name: "1GO",
        image: "images/1go.jpg",
        bonus: 100000,
        novelty: 12,
        url: "https://bit.ly/48jpChA",
        description: "125 фриспинов и +150% за первые депозиты"
    },
    {
        name: "DRIP",
        image: "images/drip.jpg",
        bonus: 100000,
        novelty: 7,
        url: "https://bit.ly/42hK7rV",
        description: "200 фриспинов и +325% за первые депозиты"
    },
    {
        name: "GAMA",
        image: "images/gama.jpg",
        bonus: 1000,
        novelty: 6,
        url: "https://bit.ly/3YHRase",
        description: "+200% к первому депозиту и 200 фриспинов"
    },
    {
        name: "STARDA",
        image: "images/starda.jpg",
        bonus: 100,
        novelty: 5,
        url: "https://bit.ly/3juckvm",
        description: "+100% к первому депозиту и до 500 фриспинов"
    },
    {
        name: "ROX",
        image: "images/rox.jpg",
        bonus: 200,
        novelty: 3,
        url: "https://bit.ly/3sKDIGg",
        description: "250 фриспинов и +200% к первому депозиту"
    },
    {
        name: "LEGZO",
        image: "images/legzo.jpg",
        bonus: 200,
        novelty: 2,
        url: "https://bit.ly/3NwJ1CY",
        description: "500 фриспинов и +100% к первому депозиту"
    },
    {
        name: "CAT CASINO",
        image: "images/cat.jpg",
        bonus: 100,
        novelty: 4,
        url: "https://bit.ly/3fNw4YQ",
        description: "200 фриспинов и +325% за первые депозиты"
    },
    {
        name: "MONRO",
        image: "images/monro.jpg",
        bonus: 100000000,
        novelty: 8,
        url: "https://bit.ly/3tHGwba",
        description: "10% кэшбэк и +150% к первому депозиту"
    },
	{
        name: "DADDY",
        image: "images/daddy.jpg",
        bonus: 10000000,
        novelty: 9,
        url: "http://bit.ly/3OMILkl",
        description: "10% кэшбэк и +150% к первому депозиту"
    },
		{
        name: "GIZBO",
        image: "images/gizbo.jpg",
        bonus: 10000000000,
        novelty: 10,
        url: "https://bit.ly/40KLBxz",
        description: "225% и +600% к первому депозиту"
    },
    // ... add other casino objects here
];

const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.textContent = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
};

const showPromoCodeModal = (promoCode) => {
    const promoCodeModal = $("#promo-code-modal");
    promoCodeModal.fadeIn();

    $("#promo-code-text").text(promoCode);

    // Check if the promo code is not "Попробуй ещё раз"
    if (promoCode !== "Попробуй ещё раз") {
        // Show the copy button
        $("#promo-code-copy").show();
        document.getElementById("spin-wheel").removeEventListener("click", spinWheel);

        // Add click event listener for copy button
        $("#promo-code-copy").click(() => {
            copyToClipboard(promoCode);
            promoCodeModal.fadeOut();
        });
    } else {
        // Hide the copy button
        $("#promo-code-copy").hide();
        $("#spin-wheel").removeClass("promo-code")
        document.getElementById("spin-wheel").addEventListener("click", spinWheel);
    }

    // Add click event listener for cancel button
    $("#promo-code-cancel").click(() => {
        promoCodeModal.fadeOut();
    });
};


const spinWheel = () => {
    const wheel = $("#wheel");
    const spinDegrees = 360 * (5 + Math.floor(Math.random() * 5));
    wheel.css("transition", "transform 5s ease-out");
    wheel.css("transform", `rotate(${spinDegrees}deg)`);

    $("#spin-wheel").addClass("inactive");

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * promoCodes.length);
        const randomPromoCode = promoCodes[randomIndex];
        $("#spin-wheel").fadeOut(() => {
            $("#spin-wheel").html(`<span>${randomPromoCode}</span>`).fadeIn();
            $("#spin-wheel").removeClass("inactive").addClass("promo-code");
        });
        showPromoCodeModal(randomPromoCode);
    }, 5000);

    // Reset the wheel rotation
    setTimeout(() => {
        wheel.css("transition", "none");
        wheel.css("transform", "rotate(0deg)");
    }, 5100);
};


$(document).ready(function () {
const btnBezdep = document.getElementById("bezdep-promo");
const wheelOfLuck = document.querySelector(".wheel-of-luck");

btnBezdep.addEventListener("click", () => {
  wheelOfLuck.scrollIntoView({ behavior: "smooth" });
});

    
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

        $(".casino-item").eq(index).css("box-shadow", "0 4px 6px rgba(0, 200, 200, 0.7)");
    };

    const randomSelect = () => {
        const casinoCount = casinos.length;
        let selectedIndex = 0;
        let startTime = Date.now();
        let intervalDuration = 100;
        let intervalId;
    
        const getRandomIndex = () => {
            const randomValue = Math.random() * casinoCount;
            return Math.floor(randomValue);
        };
    
        const updateInterval = () => {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                const timeElapsed = Date.now() - startTime;
                if (timeElapsed > 5000) {
                    clearInterval(intervalId);
                    showModal(selectedIndex);
                } else {
                    selectedIndex = getRandomIndex();
                    highlightCasino(selectedIndex);
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
    
    
    const showModal = (selectedIndex) => {
        const modal = $("#modal");
        modal.fadeIn();
    
        const casino = casinos[selectedIndex];
        $("#modal-go").attr("href", casino.url);
    
        // Update the modal with the selected casino's information and description
        $("#modal-casino-name").text(casino.name);
        $("#modal-casino-image").attr("src", casino.image);
        $("#modal-casino-image").attr("alt", casino.name);
        $("#modal-casino-description").text(casino.description);
    
        $("#modal-cancel").click(() => {
            modal.fadeOut();
        });
    };
    
    $("#random-select").click(() => {
        randomSelect();
    });
    
    

    const copyWebsiteLink = () => {
        const websiteLink = window.location.href;
        const textarea = document.createElement("textarea");
        textarea.textContent = websiteLink;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        hideNotificationBarFor24Hours();
    };
    
    const closeNotificationBar = () => {
        hideNotificationBarFor24Hours();
    };
    
    const hideNotificationBarFor24Hours = () => {
        const notificationBar = document.getElementById("notification-bar");
        notificationBar.style.display = "none";
        const hideTime = new Date().getTime();
        localStorage.setItem("notificationBarHidden", hideTime); // сохраняем время скрытия окна уведомления в localStorage
    };
    
    // проверяем, было ли окно уведомления скрыто ранее и прошло ли 24 часа с момента скрытия
    const hiddenTime = localStorage.getItem("notificationBarHidden");
    if (hiddenTime) {
        const currentTime = new Date().getTime();
        const timePassed = currentTime - hiddenTime;
        const hoursPassed = timePassed / (1000 * 60 * 60);
    
        if (hoursPassed < 24) {
            const notificationBar = document.getElementById("notification-bar");
            notificationBar.style.display = "none";
        }
    }
    
      
      document.getElementById("copy-link").addEventListener("click", copyWebsiteLink);
      
      document.getElementById("close-notification").addEventListener("click", closeNotificationBar);
      
      // проверяем, было ли окно уведомления скрыто ранее

      

    $(".sort-controls button").on("mouseover", function () {
        $(this).stop().animate({ backgroundColor: "#555" }, 300);
    }).on("mouseout", function () {
        $(this).stop().animate({ backgroundColor: "#333" }, 300);
    });
    $("#spin-wheel").off("click").on("click", function () {
        if ($(this).hasClass("promo-code")) {
            const promoCode = $(this).text();
            // Reset the button to its initial state
            $(this).text("🎡 Крутить колесо").removeClass("promo-code");
            hideClickToCopy();
        } else if (!$(this).hasClass("inactive")) {
            spinWheel();
            showClickToCopy();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".quiz-slide");
    const progress = document.querySelector(".progress-bar");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const submitButton = document.querySelector(".submit");
    const resultDiv = document.querySelector(".result");
    const scoreSpan = document.querySelector("#score");

    let currentSlide = 0;
    let score = 0;

    function showSlide(n) {
        slides[currentSlide].classList.remove("active");
        slides[n].classList.add("active");
        currentSlide = n;

        if (currentSlide === 0) {
            prevButton.style.display = "none";
            progress.style.border = "none";
        } else {
            prevButton.style.display = "inline-block";
            progress.style.border = "1px solid black";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }

        updateProgressBar();
    }

    function updateProgressBar() {
        const percent = (currentSlide / (slides.length - 1)) * 100;
        progress.style.width = percent + "%";
    }

    function calculateScore() {
        for (let i = 0; i < slides.length; i++) {
            const currentQuestion = slides[i];
            const selectedChoice = currentQuestion.querySelector(
                'input[name="q' + (i + 1) + '"]:checked'
            );

            if (selectedChoice) {
                const selectedValue = selectedChoice.value;
                if (i === 0 && selectedValue === "choice1") {
                    score++;
                } else if (i === 1 && selectedValue === "choice2") {
                    score++;
                } else if (i === 2 && selectedValue === "choice1") {
                    score++;
                } else if (i === 3 && selectedValue === "choice3") {
                    score++;
                } else if (i === 4 && selectedValue === "choice3") {
                    score++;
                }
            }
        }
    }

    function showResult() {
        calculateScore();
        resultDiv.style.display = "block";
        if ((score / 5) * 100 >= 60) {
            scoreSpan.textContent = (score / 5) * 100 + "% 🥳" ;
        } else {
            scoreSpan.textContent = (score / 5) * 100 + "% 😥";
        }
        score = 0;
    }

    function handlePrevClick() {
        showSlide(currentSlide - 1);
    }

    function handleNextClick() {
        showSlide(currentSlide + 1);
    }

    function handleSubmitClick() {
        showResult();
    }

    prevButton.addEventListener("click", handlePrevClick);
    nextButton.addEventListener("click", handleNextClick);
    submitButton.addEventListener("click", handleSubmitClick);

    showSlide(currentSlide);
});

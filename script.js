document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const calcContainer = document.querySelector(".bg-white");

    // Smart input handler
    function appendToDisplay(value) {
        const lastChar = display.value.slice(-1);

        // Avoid multiple operators or dots
        if (
            (["+","-","*","/","."].includes(value) && ["+","-","*","/","."].includes(lastChar)) ||
            (value === "." && display.value.split(/[\+\-\*\/]/).pop().includes("."))
        ) return;

        display.value += value;
    }

    function clearDisplay() {
        display.value = "";
    }

    function deleteLast() {
        display.value = display.value.slice(0, -1);
    }

    function calculate() {
        try {
            const result = Function('"use strict";return (' + display.value + ")")();
            display.value = result;
        } catch (error) {
            display.value = "Error";
        }
    }

    // Handle button clicks
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function () {
            const value = this.innerText;
            if (value === "=") calculate();
            else if (value === "C") clearDisplay();
            else if (value === "⌫") deleteLast();
            else appendToDisplay(value);
        });
    });

    // Handle keyboard input
    document.addEventListener("keydown", (event) => {
        const key = event.key;

        if (!isNaN(key) || "+-*/.".includes(key)) {
            appendToDisplay(key);
        } else if (key === "Enter") {
            calculate();
        } else if (key === "Backspace") {
            deleteLast();
        } else if (key === "Escape") {
            clearDisplay();
        } else if (event.ctrlKey && key === "Enter") {
            calculate();
        }
    });

    // Theme toggle
    themeToggle.addEventListener("click", () => {
        const isLight = body.classList.contains("bg-blue-100");

        body.classList.replace(isLight ? "bg-blue-100" : "bg-gray-900", isLight ? "bg-gray-900" : "bg-blue-100");
        calcContainer.classList.replace(isLight ? "bg-white" : "bg-gray-800", isLight ? "bg-gray-800" : "bg-white");
        calcContainer.classList.replace(isLight ? "border-blue-200" : "border-gray-600", isLight ? "border-gray-600" : "border-blue-200");
        display.classList.replace(isLight ? "bg-blue-50" : "bg-gray-700", isLight ? "bg-gray-700" : "bg-blue-50");
        display.classList.replace(isLight ? "text-gray-700" : "text-white", isLight ? "text-white" : "text-gray-700");
        themeToggle.innerHTML = isLight ? "☀️ Light Mode" : "🌙 Dark Mode";
        themeToggle.classList.replace(isLight ? "bg-gray-300" : "bg-gray-700", isLight ? "bg-gray-700" : "bg-gray-300");
        themeToggle.classList.replace(isLight ? "text-gray-700" : "text-white", isLight ? "text-white" : "text-gray-700");
    });
});

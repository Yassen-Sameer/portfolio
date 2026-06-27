"use strict";

// ^ global elements
const html = document.querySelector("html");
const body = document.querySelector("body");

// ^ Nav
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinksContainer = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll("nav a ");

mobileMenuBtn.addEventListener("click", function () {
  navLinksContainer.classList.toggle("active");
});

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navLinksContainer.classList.remove("active");
  });
}

// ^ Theme Button
const themeBtn = document.querySelector("nav #theme-toggle-button");

let isOn;
JSON.parse(localStorage.getItem("theme")) === null
  ? (isOn = true)
  : (isOn = JSON.parse(localStorage.getItem("theme")));

isOn ? html.classList.add("dark") : html.classList.remove("dark");

themeBtn.addEventListener("click", function () {
  isOn = !isOn;
  localStorage.setItem("theme", JSON.stringify(isOn));
  isOn ? html.classList.add("dark") : html.classList.remove("dark");
});

// ^ sidebar
const sideBar = document.querySelector("#settings-sidebar");
// & Gear Button
const gearBtn = document.querySelector("#settings-toggle");

gearBtn.addEventListener("click", function () {
  sideBar.classList.remove("translate-x-full");
  sideBar.classList.add("translate-x-0");

  gearBtn.removeAttribute("style", "transform: translatey(-50%)");
  gearBtn.setAttribute("style", "transform: translate(-665% , -50%)");
});

// & close Button
const closeSideBar = document.querySelector("#close-settings");

closeSideBar.addEventListener("click", function () {
  sideBar.classList.add("translate-x-full");
  sideBar.classList.remove("translate-x-0");

  gearBtn.setAttribute("style", "transform: translatey(-50%)");
  gearBtn.removeAttribute("style", "transform: translate(-665% , -50%)");
});

// & fonts buttons

const alexFontBtn = document.querySelector(".alex-btn");
const cairoFontBtn = document.querySelector(".cairo-btn");
const tajawalFontBtn = document.querySelector(".tajawal-btn");

alexFontBtn.addEventListener("click", function () {
  body.classList.remove("font-tajawal", "font-cairo");
  body.classList.add("font-alexandria");
  alexFontBtn.classList.add("active");
  cairoFontBtn.classList.remove("active");
  tajawalFontBtn.classList.remove("active");
  localStorage.setItem("activeBtn", "alexFontBtn");
  localStorage.setItem("font", "font-alexandria");
});

cairoFontBtn.addEventListener("click", function () {
  body.classList.remove("font-tajawal", "font-alexandria");
  body.classList.add("font-cairo");
  alexFontBtn.classList.remove("active");
  cairoFontBtn.classList.add("active");
  tajawalFontBtn.classList.remove("active");
  localStorage.setItem("activeBtn", "cairoFontBtn");
  localStorage.setItem("font", "font-cairo");
});

tajawalFontBtn.addEventListener("click", tajawal);

function tajawal() {
  body.classList.remove("font-alexandria", "font-cairo");
  body.classList.add("font-tajawal");
  alexFontBtn.classList.remove("active");
  cairoFontBtn.classList.remove("active");
  tajawalFontBtn.classList.add("active");
  localStorage.setItem("activeBtn", "tajawalFontBtn");
  localStorage.setItem("font", "font-tajawal");
}

const savedFont = localStorage.getItem("font");
if (savedFont) {
  body.classList.remove("font-tajawal", "font-cairo", "font-alexandria");
  body.classList.add(savedFont);
}

const activeBtn = localStorage.getItem("activeBtn");

if (activeBtn === "alexFontBtn") {
  alexFontBtn.classList.add("active");
  cairoFontBtn.classList.remove("active");
  tajawalFontBtn.classList.remove("active");
} else if (activeBtn === "cairoFontBtn") {
  alexFontBtn.classList.remove("active");
  cairoFontBtn.classList.add("active");
  tajawalFontBtn.classList.remove("active");
} else if (activeBtn === "tajawalFontBtn") {
  alexFontBtn.classList.remove("active");
  cairoFontBtn.classList.remove("active");
  tajawalFontBtn.classList.add("active");
}

// & color buttons
const colorBtns = document.querySelectorAll("#theme-colors-grid button");

for (let i = 0; i < colorBtns.length; i++) {
  colorBtns[i].addEventListener("click", function (e) {
    let colorBtn = e.currentTarget;
    localStorage.setItem("activeColor", i);
    e.stopPropagation();

    let primary = colorBtn.getAttribute("data-primary");
    let secondary = colorBtn.getAttribute("data-secondary");
    let accent = colorBtn.getAttribute("data-accent");

    for (let j = 0; j < colorBtns.length; j++) {
      colorBtns[j].classList.remove(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    }

    colorBtn.classList.add(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );

    document.documentElement.style.removeProperty("--color-primary");
    document.documentElement.style.removeProperty("--color-secondary");
    document.documentElement.style.removeProperty("--color-accent");

    document.documentElement.style.setProperty("--color-primary", primary);
    document.documentElement.style.setProperty("--color-secondary", secondary);
    document.documentElement.style.setProperty("--color-accent", accent);
  });
}

const savedIndex = localStorage.getItem("activeColor");

if (savedIndex !== null) {
  let colorBtn = colorBtns[savedIndex];

  let primary = colorBtn.getAttribute("data-primary");
  let secondary = colorBtn.getAttribute("data-secondary");
  let accent = colorBtn.getAttribute("data-accent");

  for (let j = 0; j < colorBtns.length; j++) {
    colorBtns[j].classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );
  }

  colorBtn.classList.add(
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
  );

  document.documentElement.style.removeProperty("--color-primary");
  document.documentElement.style.removeProperty("--color-secondary");
  document.documentElement.style.removeProperty("--color-accent");

  document.documentElement.style.setProperty("--color-primary", primary);
  document.documentElement.style.setProperty("--color-secondary", secondary);
  document.documentElement.style.setProperty("--color-accent", accent);
}

// & reset button

const resetBtn = document.querySelector("#reset-settings");

resetBtn.addEventListener("click", function () {
  localStorage.clear();
  tajawal();
  document.documentElement.style.setProperty("--color-primary", "#6366f1");
  document.documentElement.style.setProperty("--color-secondary", "#8b5cf6");
  document.documentElement.style.setProperty("--color-accent", "#ec4899");

  for (let j = 0; j < colorBtns.length; j++) {
    colorBtns[j].classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );
  }

  colorBtns[0].classList.add(
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
  );
});

// ^ gallary section

const gallaryBtns = document.querySelectorAll("#portfolio-filters button");
const gallaryCards = document.querySelectorAll("#portfolio-grid .portfolio-item");

function switchGallaryTabs(btnIndex, firstCard, endCard) {
  // تغيير شكل الأزرار
  for (let i = 0; i < gallaryBtns.length; i++) {
    gallaryBtns[i].classList.remove(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "hover:shadow-lg",
      "hover:shadow-primary/50",
    );

    gallaryBtns[i].classList.add(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "hover:bg-slate-100",
      "dark:hover:bg-slate-700",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
  }

  gallaryBtns[btnIndex].classList.add(
    "active",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "text-white",
    "hover:shadow-lg",
    "hover:shadow-primary/50",
  );

  gallaryBtns[btnIndex].classList.remove(
    "bg-white",
    "dark:bg-slate-800",
    "text-slate-600",
    "dark:text-slate-300",
    "hover:bg-slate-100",
    "dark:hover:bg-slate-700",
    "border",
    "border-slate-300",
    "dark:border-slate-700",
  );

  for (let i = 0; i < gallaryCards.length; i++) {
    gallaryCards[i].classList.remove("opacity-100");
    gallaryCards[i].classList.add("opacity-0");

    setTimeout(function () {
      gallaryCards[i].classList.add("hidden");
    }, 500);
  }

  setTimeout(function () {
    for (let i = firstCard; i <= endCard; i++) {
      gallaryCards[i].classList.remove("hidden");

      setTimeout(function () {
        gallaryCards[i].classList.remove("opacity-0");
        gallaryCards[i].classList.add("opacity-100");
      }, 10);
    }
  }, 500);
}

gallaryBtns[0].addEventListener("click", function () {
  switchGallaryTabs(0, 0, 8);
});

gallaryBtns[1].addEventListener("click", function () {
  switchGallaryTabs(1, 0, 2);
});

gallaryBtns[2].addEventListener("click", function () {
  switchGallaryTabs(2, 3, 5);
});

gallaryBtns[3].addEventListener("click", function () {
  switchGallaryTabs(3, 6, 7);
});

gallaryBtns[4].addEventListener("click", function () {
  switchGallaryTabs(4, 8, 8);
});

// ^ testimonials carousel

const testimonialsCarousel = document.querySelector("#testimonials-carousel");
const nextTestimonial = document.querySelector("#next-testimonial");
const prevTestimonial = document.querySelector("#prev-testimonial");
const carouselIndicatorContainer = document.querySelectorAll(
  ".carousel-indicator-container button",
);

let currentSlide = 0;
let motionRange = 33.33;
let translateValue;

nextTestimonial.addEventListener("click", function () {
  if (currentSlide === 3) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  translateValue = motionRange * currentSlide;

  testimonialsCarousel.style.transform = `translateX(${translateValue}%)`;

  handelCarouselIndicator(currentSlide);
});

prevTestimonial.addEventListener("click", function () {
  if (currentSlide === 0) {
    currentSlide = 3;
  } else {
    currentSlide--;
  }

  translateValue = motionRange * currentSlide;

  testimonialsCarousel.style.transform = `translateX(${translateValue}%)`;

  handelCarouselIndicator(currentSlide);
});

for (let i = 0; i < carouselIndicatorContainer.length; i++) {
  carouselIndicatorContainer[i].addEventListener("click", function () {
    selectCaruselPage(i);
  });
}

function selectCaruselPage(index) {
  currentSlide = index;

  testimonialsCarousel.style.transform = `translateX(calc(33.33% * ${index}))`;

  handelCarouselIndicator(index);
}

function handelCarouselIndicator(index) {
  for (let i = 0; i < carouselIndicatorContainer.length; i++) {
    carouselIndicatorContainer[i].classList.remove("bg-linear-to-br", "from-primary", "to-secondary");
    carouselIndicatorContainer[i].classList.add("dark:bg-slate-600");
  }

  carouselIndicatorContainer[index].classList.add("bg-linear-to-br", "from-primary", "to-secondary");
  carouselIndicatorContainer[index].classList.remove("dark:bg-slate-600");
}

// ^form

const form = document.querySelector("#form");
const fullNameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
let descriptionInput = document.querySelector("#project-details");
const sendBtn = document.querySelector(".send-data");

const inputs = form.querySelectorAll("input, textarea");

const fullNameRegex = /^[\u0600-\u06FFa-zA-Z]{3,}(?: [\u0600-\u06FFa-zA-Z]+)+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const descriptionRegex = /^.{10,}$/s;

function isValid(regex, input) {
  const emptyMessage = input.nextElementSibling;
  const invalidMessage = emptyMessage.nextElementSibling;

  if (input.value.trim() === "") {
    emptyMessage.classList.remove("hidden");
    invalidMessage.classList.add("hidden");
    return false;
  }

  if (!regex.test(input.value.trim())) {
    emptyMessage.classList.add("hidden");
    invalidMessage.classList.remove("hidden");
    return false;
  }

  emptyMessage.classList.add("hidden");
  invalidMessage.classList.add("hidden");
  return true;
}

sendBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const fullNameValid = isValid(fullNameRegex, fullNameInput);
  const emailValid = isValid(emailRegex, emailInput);
  const descriptionValid = isValid(descriptionRegex, descriptionInput);

  if (fullNameValid && emailValid && descriptionValid) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }

    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim();
    const isDark = document.documentElement.classList.contains("dark");

    Swal.fire({
      title: "تم إرسال رسالتك بنجاح!",
      text: "شكراً لتواصلك، سأرد عليك في أقرب وقت ممكن.",
      icon: "success",
      confirmButtonText: "حسناً",
      confirmButtonColor: primaryColor,
      iconColor: primaryColor,
      background: isDark ? "#1a1f2e" : "#fff",
      color: isDark ? "#fff" : "#000",
    });
  }
});

// ^ scroll to top button

const scrollToTopBtn = document.querySelector("#scroll-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 1000) {
    scrollToTopBtn.classList.remove("opacity-0", "invisible");
  } else {
    scrollToTopBtn.classList.add("opacity-0", "invisible");
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

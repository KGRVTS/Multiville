"use strict"

const DELAY = 150;
var scroll_up = 0;
var scroll_down = 0;
var direction = 0;
var drop = false;
var timeout = false;
var pageY = window.scrollY; 
var dropdown_nav = document.getElementById("dropdown_nav");
var details_dropdown = document.getElementById('details_dropdown');
var details_nav = document.getElementById('details_nav');

function getDirection() {
    if(pageY > window.scrollY) {
        direction = 0;
        pageY = window.scrollY;
    }
    else if (pageY < window.scrollY) {
        direction = 1;
        pageY = window.scrollY;
    }
}

function getHeaderHeight() {
    var header = document.getElementById('header');
    return header.offsetHeight;
}

function scrollUpDelay() {
    if (direction) {
        scroll_up = window.scrollY;
    }
    if (!direction && (scroll_up - DELAY) > window.scrollY && drop) {
        return true;
    }
    return false;
}

function scrollDownDelay() {
    if(!direction) {
        scroll_down = window.scrollY;
    }
    if (direction && (scroll_down + DELAY) < window.scrollY && !drop) {
        return true;
    }
    return false;
}

function dropdown() {
    details_nav.removeAttribute("open");
    details_nav.setAttribute("onclick", "return false");
    dropdown_nav.style.animation = "0.5s nav-drop";
    dropdown_nav.style.display = "grid";
    setTimeout(() => {
        drop = false;
        dropdown_nav.style.animation = "null";
        timeout = false;
    }, 450);
}

function getup() {
    details_dropdown.removeAttribute("open");
    details_nav.removeAttribute("onclick");
    dropdown_nav.style.animation = "0.35s reverse nav-drop";
    setTimeout(() => {
        drop = true;
        dropdown_nav.style.display = "none";
        dropdown_nav.style.animation = "null";
        timeout = false;
    }, 310);
}

window.addEventListener("scroll", function dropDownNav() {
    getDirection();
    if (scrollUpDelay() && window.scrollY > getHeaderHeight() && !timeout) {
        timeout = true;
        dropdown();
    }
    else if (scrollDownDelay() && !timeout) {
        timeout = true;
        getup();
    }
    if(window.scrollY <= getHeaderHeight() && getComputedStyle(dropdown_nav).display === 'grid') {
        dropdown_nav.style.display = "none";
        details_nav.removeAttribute("onclick");
    }
});

var height = document.body.offsetHeight;

/* The MIT License (MIT)
 *
 * Copyright (c) 2016 Cyril Schumacher.fr
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * @summary Shows the menu.
 */
const _show_menu = () => {
    _toggle_menu();

    document.getElementById("top").addEventListener("click", _hide_menu, false);
    document.getElementById("hamburger").addEventListener("click", _hide_menu, false);
    document.getElementById("hamburger").removeEventListener("click", _show_menu, false);
};

/**
 * @summary Shows or hides the menu.
 */
function _toggle_menu() {
    document.body.classList.toggle("sidenav-active");
}

/**
 * @summary Hides the menu.
 */
function _hide_menu() {
    _toggle_menu();

    document.getElementById("top").removeEventListener("click", _hide_menu, false);
    document.getElementById("hamburger").addEventListener("click", _show_menu, false);
    document.getElementById("hamburger").removeEventListener("click", _hide_menu, false);
}

document.getElementById("hamburger").addEventListener("click", _show_menu, false);
document.getElementById("close-hamburger").addEventListener("click", _hide_menu, false);
var className = document.getElementsByClassName("l-nav__menu__item__link");
for (var i = 0; i < className.length; i++) {
    className[i].addEventListener("click", _hide_menu, false);
}

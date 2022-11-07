// Import style
import '../sass/ap_theme.scss';

// Import JS
import f_modal from "./franco/components/modal";
require("./libraries/multistepsForm");

/**
 * Add modal to window
 *
 * @param {*}
 */
 (function (window) {
    const _init = (params) => {
        f_modal.generate(params);
    }
    window.f_modal = {
        init: _init
    }
})(window);


// var ap_list_case_type = document.querySelectorAll(".ap_card_selectable");

// ap_list_case_type.forEach(function(element){
//   element.addEventListener("click", function(e){
//     var ap_ct_radio = e.target.querySelector("input.ap_card_selectable__radio");
//     ap_ct_radio.checked = true;
//   });
// });
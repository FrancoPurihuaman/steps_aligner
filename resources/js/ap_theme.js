// Import style
import '../sass/ap_theme.scss';

// Import JS
import f_modal from "./franco/components/modal";
import MultistepsForm from "./libraries/multistepsForm";

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


/**==========================================================================================
 * Init multisteps
 ============================================================================================*/

var stepsAlingOptions = new MultistepsForm(
    document.querySelector(".ap_steps_content[data-steps='main-panels']"),
    document.querySelector(".ap_steps_indicator[data-steps='main-indicators']")
);


var stepsAlingOptions1 = new MultistepsForm(
    document.querySelector("[data-steps='align-panels']")
);

/**
 * Function for render steps
 *
 * @param {string} stepsToRender | Steps to render
 */
function renderStepsAgain(stepsToRender){
    var panelsContainer = document.querySelector(".ap_steps_content[data-steps='main-panels']");
    var tabsContainer = document.querySelector(".ap_steps_indicator[data-steps='main-indicators']");

    var panels = panelsContainer.querySelectorAll(":scope > [data-step-include]");
    panels.forEach(function(panel){
        var _dataset = panel.dataset.stepInclude;
        if(_dataset.includes(stepsToRender)){
            panel.classList.add("ap_step__panel");
        }else{
            panel.classList.remove("ap_step__panel");
            panel.classList.add("ap_hide");
        }
        
    });

    var tabs = tabsContainer.querySelectorAll(":scope > [data-step-include]");
    tabs.forEach(function(tab){
        var _dataset = tab.dataset.stepInclude;
        if(_dataset.includes(stepsToRender)){
            tab.classList.add("ap_step__tab");
        }else{
            tab.classList.remove("ap_step__tab");
            tab.classList.add("ap_hide");
        }
        
    });
    var activeTabs = tabsContainer.querySelectorAll(".ap_step__tab");
    var lastTab = activeTabs[activeTabs.length - 1];
    lastTab.classList.add("lastTab");

    stepsAlingOptions = new MultistepsForm(
        document.querySelector(".ap_steps_content[data-steps='main-panels']"),
        document.querySelector(".ap_steps_indicator[data-steps='main-indicators']")
    );
}

renderStepsAgain("ref");


/**==========================================================================================
 * Events next step
 ============================================================================================*/

 /**
  * Aling step 1
  */
var alingStep1 = document.querySelector("[data-steps='align-panels'] .ap_step__btn_next");
alingStep1.addEventListener("click", function(event){
    if (_default) {stepsAlingOptions1.nextPanel(event)} 
});

/**==========================================================================================
 * Functions validations steps
 ============================================================================================*/

 function _default(){
    return true;
 }
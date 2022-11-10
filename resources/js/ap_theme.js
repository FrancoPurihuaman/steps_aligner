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

var configurationSteps = {
    newCase : {
        steps : ["caseType", "casePreferences", "selectTooth", "uploadFiles", "finish"]
    },
    otherCase : {
        steps : ["caseType","details", "finish"],
        functionSteps : ["caseType","details", "finish"]
    }
}

var stepsAlingOptions = new MultistepsForm(
    document.querySelector(".ap_steps_content[data-steps='main-panels']"),
    document.querySelector(".ap_steps_indicator[data-steps='main-indicators']")
);


var stepsAlingOptions1 = new MultistepsForm(
    document.querySelector("[data-steps='align-panels']")
);


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
 * Functions for validations steps
 ============================================================================================*/

 function _default(){
    return true;
 }
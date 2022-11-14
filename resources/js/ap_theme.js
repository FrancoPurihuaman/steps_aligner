// Import style
import '../sass/ap_theme.scss';

// Import JS
import f_modal from "./franco/components/modal";
import f_alert from "./franco/components/alert";
import MultistepsForm from "./libraries/multistepsForm";
import formSerialize from "./libraries/formSerialize";
import { createCase, caseDetails, correctRequestName } from "./requestPayload";

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

var stepsAlignOptions = new MultistepsForm(
    document.querySelector(".ap_steps_content[data-steps='main-panels']"),
    document.querySelector(".ap_steps_indicator[data-steps='main-indicators']")
);


var stepsCaseTypeOptions = new MultistepsForm(
    document.querySelector("[data-steps='casetype-panels']")
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
            panel.classList.remove("ap_hide");
        }else{
            panel.classList.add("ap_hide");
            panel.classList.remove("ap_step__panel");
        }
        
    });

    var tabs = tabsContainer.querySelectorAll(":scope > [data-step-include]");
    tabs.forEach(function(tab){
        var _dataset = tab.dataset.stepInclude;
        if(_dataset.includes(stepsToRender)){
            tab.classList.add("ap_step__tab");
            tab.classList.remove("ap_hide");
        }else{
            tab.classList.add("ap_hide");
            tab.classList.remove("ap_step__tab");
        }
        
    });
    var activeTabs = tabsContainer.querySelectorAll(":scope > .ap_step__tab");
    var lastTab = activeTabs[activeTabs.length - 1];
    lastTab.classList.add("lastTab");

    stepsAlignOptions = new MultistepsForm(
        document.querySelector(".ap_steps_content[data-steps='main-panels']"),
        document.querySelector(".ap_steps_indicator[data-steps='main-indicators']")
    );
}

renderStepsAgain("mid-co");


/**==========================================================================================
 * Configuration step - case type
 ============================================================================================*/

/**
 * Align - case type - event next panel
 */
var caseTypeForm = document.querySelector("#caseType");
caseTypeForm.addEventListener("submit", function(event){event.preventDefault()});

var caseTypeBtn = caseTypeForm.querySelector("button.ap_step__btn_next");
caseTypeBtn.addEventListener("click", function(event){
    var formData = formSerialize(caseTypeForm, {hash: true});

    if(caseTypeValidation(formData)){
        switch(formData.casetype){
            case "1":
                stepsCaseTypeOptions.nextPanel(event);
                break;
            case "2":
                renderStepsAgain("ret-only");
                stepsAlignOptions.nextPanel(event, 1);
                break;
        }
        
    }
});


function caseTypeValidation(formData){
    var success = false;

    if(formData.casetype != null){
        console.log(formData);
        success = true;
    }

    return success;
}

/**==========================================================================================
 * Configuration step - plan type
 ============================================================================================*/

/**
 * Align - plan type - event next panel
 */
var planTypeForm = document.querySelector("#planType");
planTypeForm.addEventListener("submit", function(event){event.preventDefault()});

var planTypeBtn = planTypeForm.querySelector(".ap_step__btn_next");
planTypeBtn.addEventListener("click", function(event){
    var formData = formSerialize(planTypeForm, {hash: true});

    if(planTypeValidation(formData)){
        switch(formData.plantype){
            case "1":
                renderStepsAgain("new-c");
                break;
            case "2":
                renderStepsAgain("mid-co");
                break;
            case "3":
                renderStepsAgain("ref");
        }
        stepsAlignOptions.nextPanel(event, 1);
    }
});


function planTypeValidation(formData){
    var success = false;
    
    if(formData.plantype != null){
        console.log(formData);
        success = true;
    }

    return success;
}


/**==========================================================================================
 * Configuration step - retainer only
 ============================================================================================*/

/**
 * Align - retainer only - event next panel
 */
var retainerOnlyForm = document.querySelector("#retainerOnly");
retainerOnlyForm.addEventListener("submit", function(event){event.preventDefault()});

var retainerOnlyBtn = retainerOnlyForm.querySelector(".ap_step__btn_next");
retainerOnlyBtn.addEventListener("click", function(event){
    var formData = formSerialize(retainerOnlyForm, {hash: true});

    if(retainerOnlyValidation(formData)){
        stepsAlignOptions.nextPanel(event);
    }
});


function retainerOnlyValidation(formData){
    var success = false;
    
    if(formData != null){
        console.log(formData);
        success = true;
    }

    return success;
}


/**==========================================================================================
 * Configuration step - midcourse correction
 ============================================================================================*/

/**
 * Align - midcourse correction - event next panel
 */
var midcourseCorrectionForm = document.querySelector("#midcourseCorrection");
midcourseCorrectionForm.addEventListener("submit", function(event){event.preventDefault()});

var midcourseCorrectionBtn = midcourseCorrectionForm.querySelector(".ap_step__btn_next");
midcourseCorrectionBtn.addEventListener("click", function(event){
    var formData = formSerialize(midcourseCorrectionForm, {hash: true});
    
    if(midcourseCorrectionValidation(formData)){
        stepsAlignOptions.nextPanel(event);
    }
});


function midcourseCorrectionValidation(formData){
    var success = false;
    
    if(formData != null){
        console.log(formData);
        success = true;
    }

    return success;
}


/**==========================================================================================
 * Configuration step - refinements
 ============================================================================================*/

/**
 * Align - refinements - event next panel
 */
var refinementsForm = document.querySelector("#refinements");
refinementsForm.addEventListener("submit", function(event){event.preventDefault()});

var refinementsBtn = refinementsForm.querySelector(".ap_step__btn_next");
refinementsBtn.addEventListener("click", function(event){
    var formData = formSerialize(refinementsForm, {hash: true});
    
    if(refinementsValidation(formData)){
        stepsAlignOptions.nextPanel(event);
    }
});


function refinementsValidation(formData){
    var success = false;
    
    if(formData != null){
        console.log(formData);
        success = true;
    }

    return success;
}


/**==========================================================================================
 * Configuration step - case preferences
 ============================================================================================*/

/**
 * Align - case preferences - event next panel
 */
var casePreferencesForm = document.querySelector("#casePreferences");
casePreferencesForm.addEventListener("submit", function(event){event.preventDefault()});

var casePreferencesBtn = casePreferencesForm.querySelector(".ap_step__btn_next");
casePreferencesBtn.addEventListener("click", function(event){
    var formData = formSerialize(casePreferencesForm, {hash: true});
    
    if(casePreferencesValidation(formData)){
        stepsAlignOptions.nextPanel(event);
    }
});


function casePreferencesValidation(formData){
    var success = false;
    
    if(formData != null){
        console.log(formData);
        success = true;
    }

    return success;
}

/**==========================================================================================
 * Configuration step - select tooh
 ============================================================================================*/

/**
 * Align - select tooh - event next panel
 */
var selectToohForm = document.querySelector("#selectTooh");
selectToohForm.addEventListener("submit", function(event){event.preventDefault()});

var selectToohBtn = selectToohForm.querySelector(".ap_step__btn_next");
selectToohBtn.addEventListener("click", function(event){
    var formData = formSerialize(selectToohForm, {hash: true});
    
    if(selectToohValidation(formData)){
        stepsAlignOptions.nextPanel(event);
    }
});


function selectToohValidation(formData){
    var success = false;
    
    if(formData != null){
        console.log(formData);
        success = true;
    }

    return success;
}


/**==========================================================================================
 * Configuration step - upload files
 ============================================================================================*/

/**
 * Align - upload files - event next panel
 */
var uploadFilesForm = document.querySelector("#uploadFiles");
uploadFilesForm.addEventListener("submit", function(event){event.preventDefault()});

var uploadFilesBtn = uploadFilesForm.querySelector(".ap_step__btn_next");
uploadFilesBtn.addEventListener("click", function(event){
    var formData = formSerialize(uploadFilesForm, {hash: true});
    
    if(uploadFilesValidation(formData)){
        stepsAlignOptions.nextPanel(event);
    }
});


function uploadFilesValidation(formData){
    var success = false;
    
    if(formData != null){
        console.log(formData);
        success = true;
    }

    return success;
}


/**==========================================================================================
 * Configuration step - special instructions
 ============================================================================================*/

/**
 * Align - special instructions - event next panel
 */
var specialInstructionsForm = document.querySelector("#specialInstructions");
specialInstructionsForm.addEventListener("submit", function(event){event.preventDefault()});

var specialInstructionsBtn = specialInstructionsForm.querySelector(".ap_step__btn_next");
specialInstructionsBtn.addEventListener("click", function(event){
    var formData = formSerialize(specialInstructionsForm, {hash: true});
    
    if(specialInstructionsValidation(formData)){
        console.log("exit");
    }
});


function specialInstructionsValidation(formData){
    var success = false;
    
    if(formData != null){
        console.log(formData);
        success = true;
    }

    return success;
}

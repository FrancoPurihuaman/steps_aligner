// Import style
import '../sass/ap_theme.scss';

// Import JS
import f_modal from "./franco/components/modal";
import f_alert from "./franco/components/alert";
import MultistepsForm from "./libraries/multistepsForm";
import formSerialize from "./libraries/formSerialize";
import * as aFields from "./ap_aligner_fields";


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

/**
 * Add alert to window
 *
 * @param {*}
 */
 (function (window) {
    const _init = (params) => {
        f_alert.generate(params);
    }
    window.f_alert = {
        init: _init
    }
})(window);

/**==========================================================================================
 * Init vars
 ============================================================================================*/

var objRequestPayload = {
    caseType : null,
    plantType : null,
    patientDetails : null,

    retainerOnly : {
        detailsCase : null,
        uploadFiles : []
    },
    newCase : {
        casePreferences : null,
        selectTooth : null,
        uploadFiles : [],
        specialInstructions : ''
    },
    midcourseCorrection : {
        detailsCase : null,
        uploadFiles : []
    },
    refinements : {
        detailsCase : null,
        uploadFiles : []
    }
}


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

renderStepsAgain("ret-only");


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
        objRequestPayload.caseType = formData.casetype;

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
        switch(formData.casetype){
            case "1":
            case "2":
                success = true;
                break;
            default:
                success = false;
        }
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
        objRequestPayload.plantType = formData.plantype;

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
        switch(formData.plantype){
            case "1":
            case "2":
            case "3":
                success = true;
                break;
            default:
                success = false;
        }
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
    var formData = formSerialize(retainerOnlyForm, {hash: true, empty: true});

    if(retainerOnlyValidation(formData)){
        objRequestPayload.retainerOnly.detailsCase = formData;
        objRequestPayload.retainerOnly.uploadFiles = window.oD_uf_retainer_only;
        fillResumeRetainerOnly(formData);
    }
});


function retainerOnlyValidation(formData){
    var success = true;
    
    if(formData != null){
        if(formData.ro_d_arch == -1){
            success = false;
            f_alert.generate({type: "danger", message: "Arch to be treated is required!"});
        }if(success && !(formData.ro_d_delivery_date)){
            success = false;
            f_alert.generate({type: "danger", message: "Delivery date is required!"});
        }if(success && formData.ro_d_impression_type == -1){
            success = false;
            f_alert.generate({type: "danger", message: "Impression Type is required!"});
        }if(success && (formData.ro_d_arch == 1 || formData.ro_d_arch == 3) && !formData.ro_d_re_upper_from){
            success = false;
            f_alert.generate({type: "danger", message: "Retainer extent is required!"});
        }if(success && (formData.ro_d_arch == 1 || formData.ro_d_arch == 3) && !formData.ro_d_re_upper_to){
            success = false;
            f_alert.generate({type: "danger", message: "Retainer extent is required!"});
        }if(success && (formData.ro_d_arch == 2 || formData.ro_d_arch == 3) && !formData.ro_d_re_lower_from){
            success = false;
            f_alert.generate({type: "danger", message: "Retainer extent is required!"});
        }if(success && (formData.ro_d_arch == 2 || formData.ro_d_arch == 3) && !formData.ro_d_re_lower_to){
            success = false;
            f_alert.generate({type: "danger", message: "Retainer extent is required!"});
        }if(success && window.oD_uf_retainer_only.files.length == 0){
            success = false;
            f_alert.generate({type: "danger", message: "Atleast one file is required"});
        }
    }else{success = false;}

    return success;
}


function fillResumeRetainerOnly(formData){
    var modal = document.querySelector("#modalRetainerOnlyResume");
    if(modal){
        modal.querySelector('[data-ret-only-resume="Office"]').innerHTML = '';
        modal.querySelector('[data-ret-only-resume="doctor"]').innerHTML = '';
        modal.querySelector('[data-ret-only-resume="caseType"]').innerHTML = aFields.getCaseType(objRequestPayload.caseType);
        modal.querySelector('[data-ret-only-resume="planType"]').innerHTML = aFields.getPlanType(objRequestPayload.plantType);
        modal.querySelector('[data-ret-only-resume="firstName"]').innerHTML = '';
        modal.querySelector('[data-ret-only-resume="lastName"]').innerHTML = '';
        modal.querySelector('[data-ret-only-resume="archToBeTreated"]').innerHTML = aFields.getArchToBeTreated(formData.ro_d_arch);
        modal.querySelector('[data-ret-only-resume="deliveryDate"]').innerHTML = aFields.convertDateFormat(formData.ro_d_delivery_date);
        modal.querySelector('[data-ret-only-resume="impression"]').innerHTML = aFields.getImpressionType(formData.ro_d_impression_type);
        modal.querySelector('[data-ret-only-resume="jobDesign"]').innerHTML = aFields.getImpressionLocation(formData.ro_d_location);
        modal.querySelector('[data-ret-only-resume="upperRetainer"]').innerHTML = aFields.showFiled(formData.ro_d_re_upper_from) + " To " + aFields.showFiled(formData.ro_d_re_upper_to);
        modal.querySelector('[data-ret-only-resume="lowerRetainer"]').innerHTML = aFields.showFiled(formData.ro_d_re_lower_from) + " To " + aFields.showFiled(formData.ro_d_re_lower_to);
        modal.querySelector('[data-ret-only-resume="reason"]').innerHTML = aFields.showFiled(formData.ro_d_instructions);
        var roFiles = modal.querySelector('[data-ret-only-resume="files"]');
        roFiles.innerHTML = '';
        for (var i = 0; i < window.oD_uf_retainer_only.files.length; i++) {
            var newElement = document.createElement("p");
            newElement.innerHTML = window.oD_uf_retainer_only.files[i].name;
            roFiles.appendChild(newElement);
        }

        modal.style.display = "block";
        

    }else{console.error("modal not found: resume retainer only");}
}


/**
 * Event change arch to be treated 
 */
document.querySelector('#ro_d_arch').addEventListener("change", function(event){

    if(event.target.value == 1){
        document.querySelector('#ro_d_re_upper_form').disabled = false;
        document.querySelector('#ro_d_re_upper_to').disabled = false;
        document.querySelector('#ro_d_re_lower_form').disabled = true;
        document.querySelector('#ro_d_re_lower_to').disabled = true;
    }else if(event.target.value == 2){
        document.querySelector('#ro_d_re_upper_form').disabled = true;
        document.querySelector('#ro_d_re_upper_to').disabled = true;
        document.querySelector('#ro_d_re_lower_form').disabled = false;
        document.querySelector('#ro_d_re_lower_to').disabled = false;
    }else if(event.target.value == 3){
        document.querySelector('#ro_d_re_upper_form').disabled = false;
        document.querySelector('#ro_d_re_upper_to').disabled = false;
        document.querySelector('#ro_d_re_lower_form').disabled = false;
        document.querySelector('#ro_d_re_lower_to').disabled = false;
    }
})



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
    var formData = formSerialize(midcourseCorrectionForm, {hash: true, empty: true});
    
    if(midcourseCorrectionValidation(formData)){
        objRequestPayload.midcourseCorrection.detailsCase = formData;
        objRequestPayload.midcourseCorrection.uploadFiles = window.oD_uf_midcourse_correction;
        fillResumeMidcourseCorrections(formData)
    }
});


function midcourseCorrectionValidation(formData){
    var success = true;
    
    if(formData != null){
        if(formData.dmc_d_arch == -1){
            success = false;
            f_alert.generate({type: "danger", message: "Arch to be treated is required!"});
        }if(success && formData.dmc_d_impression_type == -1){
            success = false;
            f_alert.generate({type: "danger", message: "Imprssion Type is required!"});
        }if(success && formData.dr_d_instructions == ''){
            success = false;
            f_alert.generate({type: "danger", message: "Reason for Correction is required!"});
        }if(success && window.oD_uf_midcourse_correction.files.length == 0){
            success = false;
            f_alert.generate({type: "danger", message: "Atleast one file is required"});
        }
    }else{success = false;}
    
    return success;
}


function fillResumeMidcourseCorrections(formData){
    var modal = document.querySelector("#modalMidcourseCorrectionsResume");
    if(modal){
        modal.querySelector('[data-mid-co-resume="Office"]').innerHTML = '';
        modal.querySelector('[data-mid-co-resume="doctor"]').innerHTML = '';
        modal.querySelector('[data-mid-co-resume="caseType"]').innerHTML = aFields.getCaseType(objRequestPayload.caseType);
        modal.querySelector('[data-mid-co-resume="planType"]').innerHTML = aFields.getPlanType(objRequestPayload.plantType);
        modal.querySelector('[data-mid-co-resume="patientNo"]').innerHTML = '';
        modal.querySelector('[data-mid-co-resume="archToBeTreated"]').innerHTML = aFields.getArchToBeTreated(formData.dmc_d_arch);
        modal.querySelector('[data-mid-co-resume="impression"]').innerHTML = aFields.getImpressionType(formData.dmc_d_impression_type);
        modal.querySelector('[data-mid-co-resume="jobDesign"]').innerHTML = aFields.getImpressionLocation(formData.dmc_d_location);
        modal.querySelector('[data-mid-co-resume="reason"]').innerHTML = formData.dr_d_instructions;
        var mcFiles = modal.querySelector('[data-mid-co-resume="files"]');
        mcFiles.innerHTML = '';
        for (var i = 0; i < window.oD_uf_midcourse_correction.files.length; i++) {
            var newElement = document.createElement("p");
            newElement.innerHTML = window.oD_uf_midcourse_correction.files[i].name;
            mcFiles.appendChild(newElement);
        }

        modal.style.display = "block";
        

    }else{console.error("modal not found: resume retainer only");}
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
        objRequestPayload.refinements.detailsCase = formData;
        objRequestPayload.refinements.uploadFiles = window.oD_uf_refinements;
    }
});


function refinementsValidation(formData){
    var success = true;
    
    if(formData != null){
        if(formData.dr_d_arch == -1){
            success = false;
            f_alert.generate({type: "danger", message: "Arch to be treated is required!"});
        }if(success && formData.dr_d_impression_type == -1){
            success = false;
            f_alert.generate({type: "danger", message: "Imprssion Type is required!"});
        }
    }else{success = false;}

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
        objRequestPayload.newCase.casePreferences = formData;
        stepsAlignOptions.nextPanel(event);
    }
});

/**
 * Function for validation form case preferences
 */
function casePreferencesValidation(formData){
    var success = true;
    
    if(formData != null){
        if(!(formData.cp_arch_treated)){
            success = false;
            f_alert.generate({type: "danger", message: "Arch To be Treated is required!"});
        }if(success && !(formData.cp_arch_correction)){
            success = false;
            f_alert.generate({type: "danger", message: "Arch Correction is required!"});
        }if(success && !(formData.cp_overject)){
            success = false;
            f_alert.generate({type: "danger", message: "Overject is required!"});
        }if(success && !(formData.cp_overbite)){
            success = false;
            f_alert.generate({type: "danger", message: "Overbite is required!"});
        }if(success && !(formData.cp_medline)){
            success = false;
            f_alert.generate({type: "danger", message: "Medline is required!"});
        }if(success && (formData.cp_space_alteration == "create-space-to" && !formData.cp_create_space_to)){
            success = false;
            f_alert.generate({type: "danger", message: "Pleace Provide Create space for"});
        }if(success && (formData.cp_space_alteration == "leave-space-distal-to" && !formData.cp_leave_space_distal_to)){
            success = false;
            f_alert.generate({type: "danger", message: "Pleace Provide Leave space distal to"});
        }if(success && (formData.cp_sgp == 0 && formData.cp_arch_treated == 1 && !formData.cp_location_upper)){
            success = false;
            f_alert.generate({type: "danger", message: "Please Select Upper Values"});
        }if(success && (formData.cp_sgp == 0 && formData.cp_arch_treated == 2 && !formData.cp_location_lower)){
            success = false;
            f_alert.generate({type: "danger", message: "Please Select Lower Values"});
        }if(success && (formData.cp_sgp == 0  && formData.cp_arch_treated == 3 && (!formData.cp_location_upper || !formData.cp_location_lower))){
            success = false;
            f_alert.generate({type: "danger", message: "Please select values for both Upper and Lower"});
        }
    }else{success = false;}

    return success;
}


/**
 * Events to set lower and upper as required
 */
var cp_at_upper = document.querySelector("#cp_at_upper");
var cp_at_lower = document.querySelector("#cp_at_lower");
var cp_at_both = document.querySelector("#cp_at_both");
var cp_sgp_ipr = document.querySelector("#cp_sgp_ipr");

cp_at_upper.addEventListener("change", function(){ requiredLowerAndUperCP();});
cp_at_lower.addEventListener("change", function(){ requiredLowerAndUperCP();});
cp_at_both.addEventListener("change", function(){ requiredLowerAndUperCP();});

document.querySelectorAll('#casePreferences input[name="cp_sgp"]').forEach(element => {
    element.addEventListener("change", function(){ requiredLowerAndUperCP();});
});

function requiredLowerAndUperCP(){
    var cp_row_span_req_upper = document.querySelector("#cp_row_span_req_upper");
    var cp_row_span_req_lower = document.querySelector("#cp_row_span_req_lower");

    if(cp_sgp_ipr.checked){
        if(cp_at_upper.checked){
            cp_row_span_req_upper.classList.remove("ap_hide");
            cp_row_span_req_lower.classList.add("ap_hide");
        }else if(cp_at_lower.checked){
            cp_row_span_req_upper.classList.add("ap_hide");
            cp_row_span_req_lower.classList.remove("ap_hide");
        }else if(cp_at_both.checked){
            cp_row_span_req_upper.classList.remove("ap_hide");
            cp_row_span_req_lower.classList.remove("ap_hide");
        }
    }else{
        cp_row_span_req_upper.classList.add("ap_hide");
        cp_row_span_req_lower.classList.add("ap_hide");
    }
}

/**
 * Events to set space number as required
 */
var cp_sa_createspacefor = document.querySelector("#cp_sa_createspacefor");
var cp_sa_leavespacedistalto = document.querySelector("#cp_sa_leavespacedistalto");

document.querySelectorAll('#casePreferences input[name="cp_space_alteration"]').forEach(element => {
    element.addEventListener("change", function(){ requiredSpaceCP();});
});

function requiredSpaceCP(){
    var cp_sa_createspacefor_num = document.querySelector("#cp_sa_createspacefor_num");
    var cp_sa_leavespacedistalto_num = document.querySelector("#cp_sa_leavespacedistalto_num");

    if(cp_sa_createspacefor.checked){
        cp_sa_createspacefor_num.disabled = false;
        cp_sa_createspacefor_num.parentNode.classList.remove("ap_hide");
        cp_sa_leavespacedistalto_num.disabled = true;
        cp_sa_leavespacedistalto_num.parentNode.classList.add("ap_hide");

    }else if(cp_sa_leavespacedistalto.checked){
        cp_sa_leavespacedistalto_num.disabled = false;
        cp_sa_leavespacedistalto_num.parentNode.classList.remove("ap_hide");
        cp_sa_createspacefor_num.disabled = true;
        cp_sa_createspacefor_num.parentNode.classList.add("ap_hide");
    }else{
        cp_sa_createspacefor_num.disabled = false;
        cp_sa_createspacefor_num.parentNode.classList.add("ap_hide");
        cp_sa_leavespacedistalto_num.disabled = false;
        cp_sa_leavespacedistalto_num.parentNode.classList.add("ap_hide");
    }
}

/**==========================================================================================
 * Configuration step - select tooth
 ============================================================================================*/

/**
 * Align - select tooth - event next panel
 */
var selectToohForm = document.querySelector("#selectTooth");
selectToohForm.addEventListener("submit", function(event){event.preventDefault()});

var selectToohBtn = selectToohForm.querySelector(".ap_step__btn_next");
selectToohBtn.addEventListener("click", function(event){
    var formData = formSerialize(selectToohForm, {hash: true});
    
    if(selectToohValidation(formData)){
        objRequestPayload.newCase.selectTooth = formData;
        stepsAlignOptions.nextPanel(event);
    }
});

/**
 * Function for validation form select tooth
 */
function selectToohValidation(formData){
    var success = true;
    
    if(formData != null){
        if(formData.st_impression_type == -1){
            success = false;
            f_alert.generate({type: "danger", message: "Imprssion Type is required!"});
        }
    }else{success = false;}

    return success;
}

/**
 * Events to select tooth
 */
document.querySelectorAll('#selectTooth .ap_check_tooth input[type="checkbox"]').forEach(input => {
    input.addEventListener("change", function(event){setToohSelected(event.target)});
});

function setToohSelected(input){
    if(input.checked){
        input.parentNode.parentNode.classList.add("checked");
    }else{
        input.parentNode.parentNode.classList.remove("checked");
    }
}

/**
 * Event to select teeth all
 */
document.querySelector("#st_a_select_all").addEventListener("change", function(event){
    if(event.target.checked){
        document.querySelectorAll('#selectTooth .st_attachment .ap_check_tooth input[type="checkbox"]').forEach(input => {
            input.checked = true;
            input.parentNode.parentNode.classList.add("checked");
        });
    }else{
        document.querySelectorAll('#selectTooth .st_attachment .ap_check_tooth input[type="checkbox"]').forEach(input => {
            input.checked = false;
            input.parentNode.parentNode.classList.remove("checked");
        });
    }
});


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
        objRequestPayload.newCase.uploadFiles[0] = window.oD_uf_io_left_occlusion;
        objRequestPayload.newCase.uploadFiles[1] = window.oD_uf_io_front_occlusion;
        objRequestPayload.newCase.uploadFiles[2] = window.oD_uf_io_right_occlusion;
        objRequestPayload.newCase.uploadFiles[3] = window.oD_uf_io_maxillary_occlusal;
        objRequestPayload.newCase.uploadFiles[4] = window.oD_uf_io_madibular_occlusal;
        objRequestPayload.newCase.uploadFiles[5] = window.oD_uf_eo_profile;
        objRequestPayload.newCase.uploadFiles[6] = window.oD_uf_eo_frontal;
        objRequestPayload.newCase.uploadFiles[7] = window.oD_uf_eo_frontal_dynamic;
        objRequestPayload.newCase.uploadFiles[8] = window.oD_uf_radiographs_opg;
        objRequestPayload.newCase.uploadFiles[9] = window.oD_uf_radiographs_lateral_ceph;
        objRequestPayload.newCase.uploadFiles[10] = window.oD_uf_radiograps_other_records;
        objRequestPayload.newCase.uploadFiles[11] = window.oD_uf_stl_files;
        stepsAlignOptions.nextPanel(event);
    }
});

/**
 * Function for validation form upload files
 */
function uploadFilesValidation(formData){
    var success = true;
    
    if(formData != null){
        if(formData.is_photos_options == "now"){
            if(window.oD_uf_io_left_occlusion.files.length == 0){success = false;}
            if(window.oD_uf_io_front_occlusion.files.length == 0){success = false;}
            if(window.oD_uf_io_right_occlusion.files.length == 0){success = false;}
            if(window.oD_uf_io_maxillary_occlusal.files.length == 0){success = false;}
            if(window.oD_uf_io_madibular_occlusal.files.length == 0){success = false;}

            if(window.oD_uf_eo_profile.files.length == 0){success = false;}
            if(window.oD_uf_eo_frontal.files.length == 0){success = false;}
            if(window.oD_uf_eo_frontal_dynamic.files.length == 0){success = false;}

            if(!success){f_alert.generate({type: "danger", message: "Please Select All Required Values"});}

        }if(success && formData.is_radiographs_options == "now"){
            if(window.oD_uf_radiographs_opg.files.length == 0){success = false;}

            if(!success){f_alert.generate({type: "danger", message: "Please Select All Required Values"});}
        }
    }else{success = false;}

    return success;
}

/**
 * Event to show or hide STL Files
 */
var impressionTypeST = document.querySelector('#selectTooth select[name="st_impression_type"]');
impressionTypeST.addEventListener("change", function(event){
    if(impressionTypeST.value == "digital_scan"){
        document.querySelector('#is_sc_stl_files').style.display = "none";
        document.querySelector('#is_sc_information').style.display = "block";
    }else{
        document.querySelector('#is_sc_stl_files').style.display = "block";
        document.querySelector('#is_sc_information').style.display = "none";
    }
});


/**
 * Event show or hide required fiels
 */
document.querySelectorAll("#is_sc_photos_options input[name='is_photos_options']").forEach(function(input){
    input.addEventListener("change", function(event){
        if(event.target.value == "now"){
            document.querySelector("#is_sc_io_title .ap_required").classList.remove("ap_hide");
            document.querySelector("#is_sc_eo_title .ap_required").classList.remove("ap_hide");
        }else{
            document.querySelector("#is_sc_io_title .ap_required").classList.add("ap_hide");
            document.querySelector("#is_sc_eo_title .ap_required").classList.add("ap_hide");
        }
    });
});

document.querySelectorAll("#is_sc_radiographs input[name='is_radiographs_options']").forEach(function(input){
    input.addEventListener("change", function(event){
        if(event.target.value == "now"){
            document.querySelector("#is_sc_radiographs_opg .ap_required").classList.remove("ap_hide");
        }else{
            document.querySelector("#is_sc_radiographs_opg .ap_required").classList.add("ap_hide");
        }
    });
});



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
        objRequestPayload.newCase.specialInstructions = formData.si_instructions;
    }
});


function specialInstructionsValidation(formData){
    var success = true;
    
    if(formData == null){
        success = false;
    }

    return success;
}

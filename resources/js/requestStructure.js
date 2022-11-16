export var createCase = {
    branchid: "",
    doctorid: "",
    casetype: "",
    plantype: "",
    customercode: ""
};


export var caseDetails = `{
    "orderid": "",
    "PlanTypeName": "",
    "CaseTypeName": "",
    "RxFormsID": "",
    "PatientReferenceID": "",
    "LoginUserID": "",
    "CustomerID": "",
    "patientdetails": {
        "FirstName": "",
        "LastName": "",
        "Age": "",
        "Gender": "",
        "PatientTypeID": "",
        "due-date": ""
    },
    "shippingaddress": {
        "streetaddress": "",
        "city": "",
        "country": "",
        "state": "",
        "zipcode": ""
    },
    "casepreferences": {
        "ArchID": "",
        "ArchCollectionID": "",
        "OverjetID": "",
        "OverbiteID": "",
        "MidlineID": "",
        "CaninerelationID": "",
        "molar-relation": "",
        "SpaceGainingForIPRUpperID": "",
        "SpaceGainingForIPRLowerID": ""
    },
    "teeth-movements": {
        "EnclosedWithID": "",
        "JobDesignID": "",
        "ToothMovementID": "",
        "UploadProfillePhotosOptionID": "",
        "UploadRadiographsOptionID": "",
        "impression-instructions": "",
        "crown_Tooths_obj": {
            "crown_lower_left": [],
            "crown_lower_right": [],
            "crown_upper_left": [],
            "crown_upper_right": [],
            "implant-crown": [],
            "attachment": ""
        }
    },
    "patientfiles": {
        "intra-oral": {
            "left-occlusion": "",
            "front-occlusion": "",
            "right-occlusion": "",
            "maxillary-occlusion": "",
            "mandibular-occlusion": ""
        },
        "extra-oral": {
            "profile": "",
            "frontal": "",
            "frontal - dynamic": ""
        },
        "radiographs": {
            "upload-now": "",
            "opg": "",
            "lateral - cephalogram": "",
            "others": []
        },
        "stl-files": []
    },
    "comments": ""
}`;

/**
 * Function replaces field names depending on whether it is going
 * to be used in object or json
 *
 * @param string _string | String json
 * @param string _type | Type element (ojbt, json)
 */
export function correctRequestName(_string, _type){

    var namesToCorect = [
        ['due-date', 'due_date'],
        ['molar-relation', 'molar_relation'],
        ['teeth-movements', 'teeth_movements'],
        ['impression-instructions', 'impression_instructions'],
        ['implant-crown', 'implant_crown'],
        ['intra-oral', 'intra_oral'],
        ['left-occlusion', 'left_occlusion'],
        ['front-occlusion', 'front_occlusion'],
        ['right-occlusion', 'right_occlusion'],
        ['maxillary-occlusion', 'maxillary_occlusion'],
        ['mandibular-occlusion', 'mandibular_occlusion'],
        ['extra-oral', 'extra_oral'],
        ['frontal - dynamic', 'frontal_dynamic'],
        ['upload-now', 'upload_now'],
        ['lateral - cephalogram', 'lateral_cephalogram'],
        ['stl-files', 'stl_files']
    ];

    namesToCorect.forEach(function(value){
        if(_type == "objt"){
            _string = _string.replace(value[0], value[1]);
        }else if(_type == "json"){
            _string = _string.replace(value[1], value[0]);
        }
    });

    return _string;
}

// console.log(JSON.parse(correctRequestName(caseDetails, "objt")));
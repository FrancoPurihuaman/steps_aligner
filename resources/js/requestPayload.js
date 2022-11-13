export var createCase = {
    branchid: "Melbourne Dentist Clinic",
    doctorid: "Tennant M",
    casetype: 1,
    plantype: 1,
    customercode: 210
};


export var caseDetails = `{
    "orderid": "CASE-202209022",
    "PlanTypeName": "New Case",
    "CaseTypeName": "Aligner",
    "RxFormsID": 0,
    "PatientReferenceID": 1,
    "LoginUserID": 1292,
    "CustomerID": 2152,
    "patientdetails": {
        "FirstName": "Zahid",
        "LastName": "Shaikh",
        "Age": 55,
        "Gender": "M",
        "PatientTypeID": 1,
        "due-date": "yyyy-mm-dd"
    },
    "shippingaddress": {
        "streetaddress": "304, Jupiter Apts",
        "city": "Mumbai",
        "country": "India",
        "state": "MH",
        "zipcode": "400053"
    },
    "casepreferences": {
        "ArchID": 1,
        "ArchCollectionID": 1,
        "OverjetID": 1,
        "OverbiteID": 1,
        "MidlineID": 2,
        "CaninerelationID": 1,
        "molar-relation": 2,
        "SpaceGainingForIPRUpperID": 0,
        "SpaceGainingForIPRLowerID": 0
    },
    "teeth-movements": {
        "EnclosedWithID": 1,
        "JobDesignID": 2,
        "ToothMovementID": 1,
        "UploadProfillePhotosOptionID": 1,
        "UploadRadiographsOptionID": 1,
        "impression-instructions": "Instructions",
        "crown_Tooths_obj": {
            "crown_lower_left": [
                1,
                5,
                8
            ],
            "crown_lower_right": [
                2,
                5,
                7,
                8
            ],
            "crown_upper_left": [
                1,
                3,
                2,
                8
            ],
            "crown_upper_right": [
                1,
                2,
                8
            ],
            "implant-crown": [
                1,
                3,
                5
            ],
            "attachment": "1-32"
        }
    },
    "patientfiles": {
        "intra-oral": {
            "left-occlusion": "file-url",
            "front-occlusion": "file-url",
            "right-occlusion": " file-url",
            "maxillary-occlusion": " file-url",
            "mandibular-occlusion": " file-url"
        },
        "extra-oral": {
            "profile": "url",
            "frontal": "url",
            "frontal - dynamic": "url"
        },
        "radiographs": {
            "upload-now": "N",
            "opg": "url",
            "lateral - cephalogram": "http://",
            "others": [
                "url1",
                "url2",
                "url3"
            ]
        },
        "stl-files": [
            "url1",
            "url2",
            "url3"
        ]
    },
    "comments": "Test"
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
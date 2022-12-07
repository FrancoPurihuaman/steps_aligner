
export function getCaseType(value){
    switch(value){
        case '1':
            return 'Aligner';
        case '2':
            return 'Retainer';
        default:
            return '-';
    }
}


export function getPlanType(value){
    switch(value){
        case '1':
            return 'New';
        case '2':
            return 'Midcourse Correction';
        case '3':
            return 'Refinements';
        default:
            return '-';
    }
}


export function getArchToBeTreated(value){
    switch(value){
        case '1':
            return 'Upper';
        case '2':
            return 'Lower';
        case '3':
            return 'Both';
        default:
            return '-';
    }
}


export function getArchCorrection(value){
    switch(value){
        case '1':
            return 'Anterior';
        case '2':
            return 'Full';
        default:
            return '-';
    }
}


export function getOverjet(value){
    switch(value){
        case '1':
            return 'Maintain';
        case '2':
            return 'Increase';
        case '3':
            return 'Decrease';
        default:
            return '-';
    }
}


export function getOverbite(value){
    switch(value){
        case '1':
            return 'Maintain';
        case '2':
            return 'Increase';
        case '3':
            return 'Decrease';
        default:
            return '-';
    }
}


export function getMidline(value){
    switch(value){
        case '1':
            return 'Maintain';
        case '2':
            return 'Improve';
        default:
            return '-';
    }
}


export function getCanineRelation(value){
    switch(value){
        case '1':
            return 'Maintain';
        case '2':
            return 'Improve';
        case '3':
            return 'None';
        default:
            return '-';
    }
}


export function getMolarRelation(value){
    switch(value){
        case '1':
            return 'Maintain';
        case '2':
            return 'Improve';
        case '3':
            return 'None';
        default:
            return '-';
    }
}


export function getSpaceGainPreference(value){
    switch(value){
        case '0':
            return 'IPR';
        case '1':
            return 'Extraction';
        case '2':
            return 'Expansion';
        case '3':
            return 'None';
        default:
            return '-';
    }
}


export function getUpper(value){
    switch(value){
        case '0':
            return 'None';
        case '1':
            return 'Anterior';
        case '2':
            return 'Posterior';
        default:
            return '-';
    }
}


export function getLower(value){
    switch(value){
        case '0':
            return 'None';
        case '1':
            return 'Anterior';
        case '2':
            return 'Posterior';
        default:
            return '-';
    }
}


export function getImpressionType(value){
    switch(value){
        case 'D':
            return 'Digital Scans';
        case 'P':
            return 'Physical Impressions';
        default:
            return '-';
    }
}


export function getImpressionLocation(value){
    switch(value){
        case 'U':
            return 'Upper';
        case 'L':
            return 'Lower';
        case 'B':
            return 'Both';
        default:
            return '-';
    }
}


export function getToothMovements(value){
    switch(value){
        case 'N':
            return 'None (move all teeth)';
        case 'S':
            return 'These specific teeth should not be moved';
        default:
            return '-';
    }
}


export function getUploadFIles(value){
    switch(value){
        case 'N':
            return 'Upload Now';
        case 'L':
            return 'Upload Later';
        case 'C':
            return 'Continue Without Uploading';
        default:
            return '-';
    }
}


export function convertDateFormat(_date) {
    var _date = _date.split('-').reverse().join('-');
    return _date;
}


export function showFiled(value) {
    return (value) ? value : '-';
}
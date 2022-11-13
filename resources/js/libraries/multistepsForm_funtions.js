/**
 * Library for form with steps
 * To use the library import nextPanel
 * ------------------------------------------------------------------------------------------------
 */


// Define containers
const tabsContainer = document.querySelector('.ap_steps_indicator');
const panelsContainer = document.querySelector('.ap_steps_content');

// steps configuration
const DOMstrings = {
    tabsContainer: tabsContainer,
    tabs: tabsContainer.querySelectorAll('.ap_step__tab'),
    classForTab: 'ap_step__tab',
    classForTabLabelClicked: 'ap_step__label',
    classForTabNumberClicked: 'ap_step__number',
    panelsContainer: panelsContainer,
    panels: panelsContainer.querySelectorAll('.ap_step__panel'),
    classForPanel: 'ap_step__panel',
    classForButtonPrev: 'ap_step__btn_prev',
    classForButtonNext: 'ap_step__btn_next',
    classForCurrentStep: 'ap_current_step',
    classForPreviousSteps: 'ap_previous_step'
};


/**
 * Go to next panel
 * 
 * @param {event} e | Triggered event
 * @param {number} _index | Step number
 */
export function nextPanel(e, _index = null){
    if(_index == null){
        const eventTarget = e.target;

        // check if 'next' button was clicked
        if (!(eventTarget.classList.contains(`${this.configuraions.classForButtonNext}`))){return;}
        const activePanel = this.findParent(eventTarget, `${this.configuraions.classForPanel}`);
        let activePanelNum = Array.from(this.configuraions.panels).indexOf(activePanel);
        activePanelNum++;
        this.setActiveTab(activePanelNum);
        this.setActivePanel(activePanelNum);

    }else{
        this.setActiveTab(_index);
        this.setActivePanel(_index);
    }
}


/**
 * Add click event to previous button
 */
DOMstrings.panelsContainer.addEventListener('click', e => {
    const eventTarget = e.target;

    // check if 'previous' button was clicked
    if (!(eventTarget.classList.contains(`${DOMstrings.classForButtonPrev}`))){return;}
    const activePanel = findParent(eventTarget, `${DOMstrings.classForPanel}`);
    let indexActivePanel = Array.from(DOMstrings.panels).indexOf(activePanel);
    indexActivePanel--;
    setActiveTab(indexActivePanel);
    setActivePanel(indexActivePanel);
});


/**
 * Add click event to tabs
 */
DOMstrings.tabsContainer.addEventListener('click', e => {
    const eventTarget = e.target;
    
    if(eventTarget.classList.contains(`${DOMstrings.classForTabLabelClicked}`) ||
        eventTarget.classList.contains(`${DOMstrings.classForTabNumberClicked}`))
    {
        const tab = findParent(eventTarget, DOMstrings.classForTab);
        const indexStepClicked = Array.from(DOMstrings.tabs).indexOf(tab);
        setActiveTab(indexStepClicked);
        setActivePanel(indexStepClicked);
    }else{return;}
});


/**
 * Return parent node with requested class
 * 
 * @param {nodeHTML}  nodeChild | Node child
 * @param {string}  parentClass  | Parent class
 * @returns {nodeHTML}
 */
const findParent = (nodeChild, parentClass) => {

    let _parentNode = nodeChild;

    while (!_parentNode.classList.contains(parentClass)) {
        _parentNode = _parentNode.parentNode;
    }

    return _parentNode;
};


/**
 * Change the state of a tab to active
 * 
 * @param {int} indexTab | Active tab index
 */
const setActiveTab = indexTab => {
    removeClassFromList(DOMstrings.tabs, DOMstrings.classForCurrentStep);
    removeClassFromList(DOMstrings.tabs, DOMstrings.classForPreviousSteps);
    
    DOMstrings.tabs.forEach((tab, index) => {
        if (index < indexTab) {tab.classList.add(DOMstrings.classForPreviousSteps);
        }else if (index == indexTab){tab.classList.add(DOMstrings.classForCurrentStep);}
    });
};


/**
 * Change the state of a panel to active
 * 
 * @param {int} indexPanel | Active panel index
 */
const setActivePanel = indexPanel => {
    removeClassFromList(DOMstrings.panels, DOMstrings.classForCurrentStep);

    DOMstrings.panels.forEach((panel, index) => {
        if (index == indexPanel) {
        panel.classList.add(DOMstrings.classForCurrentStep);
        //setHeightToPanelContainer(panel);
        }
    });
};


/**
 * Remove class from nodeList
 * 
 * @param {int} _nodeList | Node list
 * @param {string} className | Class name
 */
const removeClassFromList = (_nodeList, className) => {
    _nodeList.forEach(_node => {_node.classList.remove(className);});
};


/**
 * Assign height to panels container)
 * (this for panels with absolute position)
 */
const setHeightToPanelContainer = (panel) => {
    if(panel){DOMstrings.panelsContainer.style.height = `${panel.offsetHeight}px`;}
};
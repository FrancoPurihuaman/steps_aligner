/**
 * Library for form with steps
 * @author Franco Purihuamán
 * ------------------------------------------------------------------------------------------------
 */

 export default class MultistepsForm {
    
    constructor(_panelsContainer, _tabsContainer = null) {
        this.tabsContainer = _tabsContainer;
        this.panelsContainer = _panelsContainer;
        this.existIndicationTabs = (this.tabsContainer) ? true : false;
        var _tabsIndicator = (this.tabsContainer) ? this.tabsContainer.querySelectorAll(':scope > .ap_step__tab') : null;
        this.configuraions = {
            tabsContainer: this.tabsContainer,
            tabs: _tabsIndicator,
            classForTab: 'ap_step__tab',
            classForTabLabelClicked: 'ap_step__label',
            classForTabNumberClicked: 'ap_step__number',
            panelsContainer: this.panelsContainer,
            panels: this.panelsContainer.querySelectorAll(':scope > .ap_step__panel'),
            classForPanel: 'ap_step__panel',
            classForButtonPrev: 'ap_step__btn_prev',
            classForButtonNext: 'ap_step__btn_next',
            classForCurrentStep: 'ap_current_step',
            classForPreviousSteps: 'ap_previous_step'
        };
        this.initEvents();
    }

    initEvents() {

        /**
         * Add click event to previous button
         */
        this.configuraions.panelsContainer.addEventListener('click', e => {
            e.stopPropagation();
            const eventTarget = e.target;

            // check if 'previous' button was clicked
            if (!(eventTarget.classList.contains(`${this.configuraions.classForButtonPrev}`))){return;}
            const activePanel = this.findParent(eventTarget, `${this.configuraions.classForPanel}`);
            let indexActivePanel = Array.from(this.configuraions.panels).indexOf(activePanel);
            indexActivePanel--;
            this.setActiveTab(indexActivePanel);
            this.setActivePanel(indexActivePanel);

            window.scrollTo(0, 0);
        });


        /**
         * Add click event to tabs
         */
        if(this.existIndicationTabs){
            this.configuraions.tabsContainer.addEventListener('click', e => {
                const eventTarget = e.target;
                
                if(eventTarget.classList.contains(`${this.configuraions.classForTabLabelClicked}`) ||
                    eventTarget.classList.contains(`${this.configuraions.classForTabNumberClicked}`))
                {
                    const tab = this.findParent(eventTarget, this.configuraions.classForTab);
                    const indexStepClicked = Array.from(this.configuraions.tabs).indexOf(tab);
                    this.setActiveTab(indexStepClicked);
                    this.setActivePanel(indexStepClicked);

                    window.scrollTo(0, 0);
                }else{return;}
            });
        }
    }


    /**
     * Go to next panel
     * 
     * @param {event} e | Triggered event
     * @param {number} _index | Step number
     */
    nextPanel(e, _index = null) {
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

        window.scrollTo(0, 0);
    }


    /**
     * Return parent node with requested class
     * 
     * @param {nodeHTML}  nodeChild | Node child
     * @param {string}  parentClass  | Parent class
     * @returns {nodeHTML}
     */
    findParent(nodeChild, parentClass) {

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
    setActiveTab(indexTab) {
        if(this.existIndicationTabs){
            this.removeClassFromList(this.configuraions.tabs, this.configuraions.classForCurrentStep);
            this.removeClassFromList(this.configuraions.tabs, this.configuraions.classForPreviousSteps);
            
            this.configuraions.tabs.forEach((tab, index) => {
                if (index < indexTab) {tab.classList.add(this.configuraions.classForPreviousSteps);
                }else if (index == indexTab){tab.classList.add(this.configuraions.classForCurrentStep);}
            });
        }
    };


    /**
     * Change the state of a panel to active
     * 
     * @param {int} indexPanel | Active panel index
     */
    setActivePanel(indexPanel) {
        this.removeClassFromList(this.configuraions.panels, this.configuraions.classForCurrentStep);

        this.configuraions.panels.forEach((panel, index) => {
            if (index == indexPanel) {
            panel.classList.add(this.configuraions.classForCurrentStep);
            //this.setHeightToPanelContainer(panel);
            }
        });
    };


    /**
     * Remove class from nodeList
     * 
     * @param {int} _nodeList | Node list
     * @param {string} className | Class name
     */
    removeClassFromList(_nodeList, className) {
        _nodeList.forEach(_node => {_node.classList.remove(className);});
    };


    /**
     * Assign height to panels container)
     * (this for panels with absolute position)
     */
    setHeightToPanelContainer(panel) {
        if(panel){this.configuraions.panelsContainer.style.height = `${panel.offsetHeight}px`;}
    };
}
/**
 * Ordinateur js script
 */

import AddAttribution    from '../components/modal/AddAttribution.vue';
import RemoveAttribution from '../components/modal/RemoveAttribution.vue';
import RemoveOrdinateur  from '../components/modal/RemoveOrdinateur.vue';

export default {

    /**
     * Components
     */
    components: {
        AddAttribution,
        RemoveAttribution,
        RemoveOrdinateur
    },


    /**
     * data from parent component (Home.vue)
     */
    props: {
        ordinateurName: {},
        ordinateurId: {},
        attribution: {},
        currentDate: {}
    },


    /**
     * All data that used by ordinateur component
     */
    data(){
        return {
            attributions: {},
            timeslots: [],
            attributionDialog: false,
            removeAttributionDialog: false,
            deleteOrdiDialog: false,
            heureAttribution: "",
            selectedDesktop: "",
            attributionId: ""
        }
    },


    /**
     * Initialise functions when the component is created
     */
    created() {
        this.initialize()
        this.displayHoraire()
    },

    /**
     * List of methods
     */
    methods: {

        /**
         * Create attribution array from existing data
         */
        initialize(){
            this.attribution.forEach(attr => {
                this.attributions[attr.hours] = {
                    client: attr.Client,
                    date: attr.date,
                    idAttribution: attr.id
                }
            });
        },


        /**
         * Create the array that will be display on front end
         */
        displayHoraire() {
            this.timeslots = [];
            for(let i = 0; i < 10; i++){
                let hour = 8 + i;
                if(this.attributions[hour]) {
                    this.timeslots.push({
                        heure: hour,
                        attribution: `${this.attributions[hour].client.surname} ${this.attributions[hour].client.name}`,
                        idAttribution: this.attributions[hour].idAttribution,
                        client: this.attributions[hour].client
                    })
                }else {
                    this.timeslots.push({
                        heure: hour,
                        attribution: "",
                    })
                }
            }
        },


        /**
         * Handle the click to add assignment
         * @param {Boolean} dialog 
         * @param {Number} heure 
         * @param {Number} ordinateurId 
         */
        addAttribution(dialog, heure, ordinateurId){
            this.attributionDialog = dialog;
            this.heureAttribution  = heure;
            this.selectedDesktop   = ordinateurId;
        },
        

        /**
         * Get information about new assignment
         * @param {Object} val 
         */
        infoAttribution(val) {
            this.attributions[val.hours] = {
                client: val.Client,
                date: val.date,
                idAttribution: val.id
            }
            this.initialize();
            this.displayHoraire();
        },


        /**
         * Handle click on delete assignment
         * @param {Boolean} dialog 
         * @param {Number} attributionId 
         */
        removeAttribution(dialog, attributionId) {
            this.removeAttributionDialog = dialog;
            this.attributionId = attributionId;
        },


        /**
         * Re-create the assignment array without deleted informations
         * @param {Number} attributionId 
         */
        removeAttributionData(attributionId) {
            this.attributions = {};
            const refreshDeleteData = this.timeslots.filter(element => element.idAttribution != attributionId);
            refreshDeleteData.forEach(element => {
                if(element.client) {
                    this.attributions[element.heure] = {
                        client: element.client,
                        idAttribution: element.idAttribution
                    }
                }
            });
            this.displayHoraire();
        },


        /**
         * Handle click on delete desktop button
         * @param {Boolean} dialog 
         * @param {Number} ordi 
         */
        deleteOrdi(dialog, ordi) {
            this.deleteOrdiDialog = dialog;
            this.selectedDesktop = ordi;
        },


        /**
         * Create event to inform parent component about destroyed desktop information
         * @param {Object} ordinateur 
         */
        removeDesktopInfo(ordinateur) {
            this.$emit('removeDesktop', ordinateur);
        }
    }
}
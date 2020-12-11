/**
 * Dashboard data
 */

import Axios from 'axios';
import Ordinateur from './Ordinateur.vue';
import AddOrdinateurModal from '../components/modal/AddOrdinateurModal.vue';
import Datepicker from '../components/datepicker/Datepicker.vue';
import tokenConfig  from '../utils/tokenConfig';

export default {

    /**
     * all components
     */
    components : {
        Ordinateur,
        AddOrdinateurModal,
        Datepicker
    },


    /**
     * Data used by Home.vue / home.js
     */
    data(){
        return {
            ordinateurs: [],
            currentDate: new Date().toISOString().substr(0, 10),
            hasNextPage: null,
            hasPreviousPage: null,
            nextPage: null,
            previousPage: null,
            totalPage: null,
            currentPage: 1
        }
    },


    /**
     * Default function used when Home.vue component is loaded
     */
    created() {
        this.getAll();
    },


    /**
     * Handle the change on pagination number
     */
    watch: {
        currentPage: function(page) {
            this.currentPage = page
            this.getAll();
        }
    },


    /**
     * List of methods
     */
    methods: {

        /**
         * initialisation function that allow us to see pagination / list of destops / assignment
         */
        async getAll(){
            try {
                this.ordinateurs = [];
                const responseData = await Axios.get('http://127.0.0.1:3000/api/computers', {
                    params: {
                        date: this.currentDate,
                        page: this.currentPage
                    },
                    headers: {
                        Authorization: `Bearer ${tokenConfig.getToken()}`
                    }
                });

                const desktopInfo = responseData.data.desktopInfo;
                desktopInfo.forEach(info => {
                    this.ordinateurs.push(info)
                })

                // Paginations informations 
                this.hasNextPage     = responseData.data.hasNextPage;
                this.hasPreviousPage = responseData.data.hasPreviousPage;
                this.nextPage        = responseData.data.nextPage;
                this.previousPage    = responseData.data.previousPage;
                this.totalPage       = responseData.data.totalPage;

            } catch (error) {
                this.flashMessage.error({
                    message: "Ressource indisponible",
                    time: 5000,
                });
            }
        },


        /**
         * Handle the information about new desktop
         * @param {Object} newDesktop 
         */
        addDesktop(newDesktop) {
            this.ordinateurs.push(newDesktop)
        },


        /**
         * handle the date modification
         * @param {Date} date 
         */
        async nouvellDate(date) {
            this.currentDate = date;
            await this.getAll();
        },


        /**
         * Re-create the from when we got the delete desktop event from child component
         */
        removeDesktopInfo() {
            // const newArrayDesktop = this.ordinateurs.filter(element => element.id != ordinateurId);
            // this.ordinateurs = [];
            // newArrayDesktop.forEach(info => {
            //     this.ordinateurs.push(info)
            // });
            this.getAll();
        }
    }
}
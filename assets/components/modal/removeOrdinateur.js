/**
 * Remove desktop js file
 */


import Axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';

export default {

    /**
     * Data from parent component (Ordinateur.vue)
     */
    props: {
        dialog: {},
        ordinateur: {}
    },


    /**
     * List of methods
     */
    methods: {

        /**
         * Function used to close modal
         */
        close() {
            this.$emit('update:dialog', false);
        },


        /**
         * Delete desktop from BDD and inform parent component
         */
        deleteOrdinateur() {
            Axios.delete('http://127.0.0.1:3000/api/computers', {
                params: {
                    id: this.ordinateur
                },
                headers: {
                    Authorization: `Bearer ${tokenConfig.getToken()}`
                }
            }).then(() => {
                this.$emit("removeDesktop", this.ordinateur);
                this.close();
            }).catch(() => {
                this.flashMessage.error({
                    message: "Ressources indisponible",
                    time: 5000,
                });
            })
        }
    }
}
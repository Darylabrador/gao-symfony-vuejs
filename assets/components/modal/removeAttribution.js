/**
 * Remove assignment js file
 */

import Axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';

export default {

    /**
     * Data from parent component (Ordinateur.vue)
     */
    props: {
        dialog: {},
        attributionInfo: {}
    },
    

    /**
     * List of methods
     */
    methods: {

        /**
         * Function to close modal
         */
        close() {
            this.$emit('update:dialog', false);
        },


        /**
         * Delete specific assignment and inform the parent component
         */
        remove(){
            Axios.delete('http://127.0.0.1:3000/api/attributions', {
                params : {
                    id: this.attributionInfo
                },
                headers: {
                    Authorization: `Bearer ${tokenConfig.getToken()}`
                }
            }).then(() => {
                this.$emit("removedAttribution", this.attributionInfo);
                this.close();
            }).catch(()=>{
                this.flashMessage.error({
                    message: "Ressources indisponible",
                    time: 5000,
                });
            })
        }
    }
}
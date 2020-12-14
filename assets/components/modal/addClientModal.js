/**
 * Add client js file
 */

import Axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';

export default {
    /**
     * Data from parent component
     */
    props: {
        dialog: {},
        ordinateurId: {},
        heureAttribution: {},
        currentDate: {}
    },


    watch: {
        surname: function () {
            this.disabledButton();
        },
        name: function () {
            this.disabledButton();
        }
    },

    /**
    * Data of child component
    */
    data() {
        return {
            name: '',
            surname: '',
            isDisabledButton: true
        }
    },


    /**
     * list of methods
     */
    methods: {

        /**
         * Handle close modla action
         */
        close() {
            this.$emit('update:dialog', false);
        },

        /**
         * Create client and assign in timeslot
         */
        async createClient() {
            try {
                const newClient = await Axios.post(`/api/client/create`,
                    {
                        name: this.name,
                        surname: this.surname,
                        desktop: this.ordinateurId,
                        hours: this.heureAttribution,
                        date: this.currentDate
                    },
                    {
                        headers:
                        {
                            Authorization: `Bearer ${tokenConfig.getToken()}`
                        }
                    });
                this.flashMessage.success({
                    message: newClient.data.message,
                    time: 5000,
                });
                this.close();
                this.$emit("newClientAttribution", newClient.data.content);
            } catch (error) {
                this.flashMessage.error({
                    message: "Impossible de réserver ce créneaux",
                    time: 5000,
                });
            }
        },

        /**
         * Enable create client button only on some condition
         */
        disabledButton() {
            if (this.name != "" && this.surname != "" && this.name.length >= 3 && this.surname.length >= 3) {
                this.isDisabledButton = false;
            } else {
                this.isDisabledButton = true;
            }
        }
    }
}
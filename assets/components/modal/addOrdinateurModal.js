/**
 * Add desktop js file
 */


import Axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';

export default {
    data: () => ({
        valid: true,
        name: '',
        dialog: false,
    }),
    
    watch: {
        name: function(val) {
            if(val.length > 2) {
                this.valid = false;
            } else {
                this.valid = true;
            }
        }
    },

    methods: {

        /**
         * Create a new desktop in BDD and inform the parent component
         */
        async validate() {
            try {
                const newDesktop = await Axios.post('http://localhost:3000/api/computers', { name: this.name }, {
                    headers: {
                        Authorization: `Bearer ${tokenConfig.getToken()}`
                    }
                });
                
                const responseData = newDesktop.data;
                if (responseData.success) {
                    this.flashMessage.success({
                        message: responseData.message,
                        time: 5000,
                    });
                    this.$emit('addingDesktop', responseData.content);
                } else {
                    this.flashMessage.error({
                        message: responseData.message,
                        time: 5000,
                    });
                }
            } catch (error) {
                this.flashMessage.error({
                    message: "Une erreur est survenue",
                    time: 5000,
                });
            }
        }
    },
}
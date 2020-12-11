/**
 * Layout js file
 */

 
import tokenConfig  from '../utils/tokenConfig.js';

export default {
    data(){
        return {
            isLogged: tokenConfig.getToken()
        }
    },

    /**
     * List of methods
     */
    methods: {

        /**
         * Disconnect function
         */
        disconnected() {
            tokenConfig.removeToken();
            location.href = '/connexion';
            // this.$router.push('/connexion');
        }
    }
}
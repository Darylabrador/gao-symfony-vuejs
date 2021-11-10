/**
 * Add desktop js file
 */


import { apiService } from "../../services/apiService";

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
                const newDesktop = await apiService.post('/computer/add', { name: this.name });

                if (newDesktop.data.success != undefined){
                    return this.flashMessage.error({
                        message: newDesktop.data.message,
                        time: 5000,
                    });
                }
              
                const responseData = newDesktop.data;
                this.flashMessage.success({
                    message: "Poste ajouté avec succès",
                    time: 5000,
                });
                this.$emit('addingDesktop', responseData);
                this.dialog = false;
                this.name = "";
            } catch (error) {
                this.flashMessage.error({
                    message: "Une erreur est survenue",
                    time: 5000,
                });
            }
        }
    },
}
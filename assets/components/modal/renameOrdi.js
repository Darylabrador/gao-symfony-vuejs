import { apiService } from "../../services/apiService";

export default {
    props: {
        ordinateurId: {},
        dialog: {},
    }, 

    watch: {
        renameOrdi: function(){
            this.disabledButton();
        }
    }, 

    data() {
        return {
            renameOrdi: "",
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
         * Modification of computer's name
         */
        async modificationOrdi() {
            try {
                let dataSend = {
                    name: this.renameOrdi,
    
                };
                const ordiData = await apiService.put(`/computer/update/${this.ordinateurId}`, dataSend);
                let responseData = ordiData.data;
                if (responseData.success) {
                    this.flashMessage.success({
                        message: responseData.message,
                        time: 5000,
                    });
                    this.close();
                    this.$emit("renameOrdi", this.ordinateurId);
                } else {
                    this.flashMessage.error({
                        message: responseData.message,
                        time: 5000,
                    });
                }
            } catch (error) {
                console.log(error)
                this.flashMessage.error({
                    message: "Une erreur est survenue",
                    time: 5000,
                });
            }
        },

        /**
         * Enable create client button only on some condition
         */
        disabledButton() {
            if (this.renameOrdi != "" && this.renameOrdi.length >= 3 ) {
                this.isDisabledButton = false;
            } else {
                this.isDisabledButton = true;
            }
        }
    }
}
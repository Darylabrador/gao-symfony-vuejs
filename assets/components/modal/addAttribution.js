/**
 * Add assignment js file
 */
import Axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';
import AddClientModal from './AddClientModal.vue';

export default {

    components: {
        AddClientModal
    },


    /**
     * Data from parent component (Ordinateur.vue)
     */
    props: {
        ordinateurId: {},
        heureAttribution: {},
        currentDate: {},
        attributionDialog: {},
        dialog: {}
    },


    /**
     * Data used by AddAttribution.vue
     */
    data() {
        return {
            name: '',
            loading: false,
            items: [],
            search: null,
            select: null,
            clientId: null,
            disabledButton: false,
            disabledAddButton: true,
            addClientDialog: false
        }
    },


    /**
     * This event is used by autocomplete
     */
    watch: {
        search(val) {
            val && val !== this.select && this.querySelections(val)
            this.disabledAddButton = true;
        },
    },


    methods: {

        /**
         * Function to close the modal
         */
        close() {
            this.$emit('update:dialog', false);
        },


        /**
         * Create the array for autocomplete
         */
        querySelections(v) {
            if (v.length > 2) {
                setTimeout(() => {
                    Axios.get('http://127.0.0.1:3000/api/clients/search', {
                        params: {
                            client: v
                        },
                        headers: {
                            Authorization: `Bearer ${tokenConfig.getToken()}`
                        }
                    }).then(reponse => {
                        let reponseData = reponse.data.clientList;
                        
                        if (reponseData.length == 0 && this.client == null) {
                            this.disabledAddButton = false;
                        }

                        if(reponseData.length != 0 ) {
                            this.items = [];
                            reponseData.forEach(data => {
                                this.items.push({
                                    id: data.id,
                                    name: data.name,
                                    surname: data.surname,
                                    fullname: `${data.surname} ${data.name}`
                                })
                            })
                        }
                    });
                }, 500)
            }
        },


        /**
         * Set an assignment timeslot and inform the parent component
         */
        async attribuer() {
            if(this.select != null ) {
                let dataSend = {
                    date: this.currentDate,
                    hours: this.heureAttribution,
                    clientId: this.select.id,
                    desktopId: this.ordinateurId
                }
    
                const attributions = await Axios.post('http://127.0.0.1:3000/api/attributions', dataSend);
                if(attributions.data.success) {
                    this.flashMessage.success({
                        message: attributions.data.message,
                        time: 5000,
                    });
                    this.close();
                    this.$emit('nouvellAttribution', attributions.data.content);
                } else {
                    this.flashMessage.error({
                        message: attributions.data.message,
                        time: 5000,
                    });
                }
            } else {
                this.flashMessage.error({
                    message: "Client inexistant",
                    time: 5000,
                });
            }
        },


        /**
         * Create and assign it to timeslot
         */
        createClient(dialog) {
            this.addClientDialog = dialog;
            this.$emit('update:dialog', false);
        },


        /**
         * handle information about new client and his assign info
         */
        newClientAttribution(assignInfo){
            this.$emit('nouvellAttribution', assignInfo);
        }
    },
}
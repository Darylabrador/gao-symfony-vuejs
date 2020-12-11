/**
 * Login js file
 */


import Axios from 'axios';
import tokenConfig from '../utils/tokenConfig';

export default {
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'Adresse E-mail est requis',
            v => /.+@.+\..+/.test(v) || 'Adresse email invalide',
        ],
        password: '',
        passwordRule: [
            v => !!v || 'Le mot de passe est requis',
        ],
    }),

    methods: {
        async validate() {
            let isReady = this.$refs.form.validate();
            let dataSend = {
                email : this.email,
                password : this.password
            }
            if(isReady) {
                const connectInfo = await Axios.post('http://127.0.0.1:3000/api/login', dataSend);
                if(connectInfo.data.success) {
                    tokenConfig.setToken(connectInfo.data.token);
                    location.href = '/';
                    // this.$router.push('/');
                    this.flashMessage.success({
                        message: connectInfo.data.message,
                        time: 5000,
                    });
                } else {
                    this.flashMessage.error({
                        message: connectInfo.data.message,
                        time: 5000,
                    });
                }
            }
        }
    },
}
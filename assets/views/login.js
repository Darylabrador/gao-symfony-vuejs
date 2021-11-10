/**
 * Login js file
 */
import tokenConfig from '../utils/tokenConfig';
import { apiService } from "../services/apiService";

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
                username : this.email,
                password : this.password
            }
            if(isReady) {
                try {
                    const connectInfo = await apiService.post('/login_check', dataSend);
                    tokenConfig.setToken(connectInfo.data.token);
                    location.href = '/';
                    // this.$router.push('/');
                } catch (error) {
                    this.flashMessage.error({
                        message: "Mot de passe ou identifiant incorrecte",
                        time: 5000,
                    });
                }
            }
        }
    },
}
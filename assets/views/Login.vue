<template>
    <div style="min-height: 80vh !important;" class="d-flex flex-column justify-content-center align-items-center">
        <div class="card p-5 mx-auto rounded shadow">
            <h5 class="text-center"> Bienvenue sur l'espace culturel </h5>
            <v-form ref="form" v-model="valid" lazy-validation >
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Adresse e-mail"
                required
                type="email"
                ></v-text-field>

                <v-text-field
                v-model="password"
                :rules="passwordRule"
                label="Mot de passe"
                required
                type="password"
                ></v-text-field>

                <div class="d-flex justify-content-end">
                    <v-btn :disabled="!valid" color="blue" class="text-white" @click="validate" >
                        Connexion
                    </v-btn>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script src="./login.js"></script>
<template>
    <v-container fluid>

        <addClientModal :dialog.sync="addClientDialog" :ordinateurId="ordinateurId" :heureAttribution="heureAttribution" :currentDate="currentDate" @newClientAttribution="newClientAttribution" />

        <v-dialog v-model="dialog" persistent max-width="450">
            <v-card>
                <div class="d-flex justify-content-between pl-5 pt-2 border-bottom border-dark">
                    <h5 class="mt-1">
                    Attribuer
                    </h5>
                    <v-btn color="grey" text @click="close">
                        X
                    </v-btn>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                    <v-autocomplete
                        v-model="select"
                        :loading="loading"
                        :items="items"
                        :search-input.sync="search"
                        cache-items
                        class="w-100 px-3 py-2 mt-5"
                        flat
                        hide-no-data
                        hide-details
                        label="Client"
                        solo-inverted
                        return-object
                        item-text="fullname"
                        item-value="id"
                        >
                    </v-autocomplete>

                    <v-btn :disabled="disabledAddButton" color="green" text class="px-3 mt-5 mr-2" @click="createClient(true)">
                        <v-icon> mdi-plus-circle-outline </v-icon>
                    </v-btn>
                </div>

                
                <div class="d-flex justify-content-end py-5 pr-3">
                    <v-btn color="grey" class="mr-2 text-white" @click="close">
                        Annuler
                    </v-btn>
                    <v-btn :disabled="disabledButton" color="primary" class="text-white" @click="attribuer">
                        Attribuer
                    </v-btn>
                </div>

            </v-card>
        </v-dialog>
    </v-container>
</template>

<script src='./addAttribution.js'></script>
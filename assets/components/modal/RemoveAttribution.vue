<template>
    <v-dialog v-model="dialog" persistent max-width="450">
        <v-card>
        <div class="d-flex justify-content-end pl-5 pt-2 border-0">
            <v-btn color="grey" text @click="close">
                X
            </v-btn>
        </div>
        
        <h5 class="my-5 text-center"> Voulez-vous vraiment annuler l'attribution ? </h5>

        <div class="d-flex justify-content-end py-5 pr-3">
            <v-btn color="blue" class="mr-2 text-white" @click="close">
                Retour
            </v-btn>
            <v-btn color="red" class="text-white" @click="remove">
                Supprimer
            </v-btn>
        </div>
      </v-card>
    </v-dialog>
</template>

<script src="./removeAttribution.js"></script>
<template>
        <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline font-weight-bold border-bottom border-dark d-flex justify-content-between">
          <h5> Modification du poste </h5>
          <v-btn color="grey darken-1" text @click="close"> X </v-btn>
        </v-card-title>

        <v-card-actions class="d-flex flex-column">
            <v-spacer></v-spacer>
            <div class="w-100 px-3">
                <v-text-field color="dark" v-model="renameOrdi" label="Saisir le nouveau nom" required></v-text-field>
            </div>
           <div class="d-flex justify-content-end w-100">
                <v-btn class="text-white mx-2" color="grey darken-1" @click="close"> Annuler </v-btn>
                <v-btn :disabled="isDisabledButton" class="text-white mx-2" color="blue darken-1" @click="modificationOrdi"> Ajouter </v-btn> 
           </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script src="./renameOrdi.js"></script>
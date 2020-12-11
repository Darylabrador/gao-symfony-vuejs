<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="primary" dark v-bind="attrs" v-on="on" >
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <div class="d-flex justify-content-between pl-5 pt-2 border-bottom border-dark">
            <h5 class="mt-1">
                Ajouter un poste
            </h5>
            <v-btn color="grey" text @click="dialog = false">
                X
            </v-btn>
        </div>
       
        <v-card-actions>
            <v-form ref="form" lazy-validation class="w-100">
                <v-text-field v-model="name" label="Nom du poste" required></v-text-field>
                <div class="d-flex justify-content-end">
                    <v-btn color="grey" class="mr-4 text-white" @click="dialog = false">
                        Annuler
                    </v-btn>
                    <v-btn :disabled="valid" color="primary" class="text-white" @click="validate">
                        Ajouter
                    </v-btn>
                </div>
            </v-form>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script src='./addOrdinateurModal.js'></script>
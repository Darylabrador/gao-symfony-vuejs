<template>
    <v-app>
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet" />

        <!-- subheader -->
        <div>
            <v-subheader grey outlined class="bg-secondary" v-if="isLogged">
            <h6 class="text-white mt-1"> Gestion ordinateur </h6>
            <v-spacer></v-spacer>
            <v-btn icon color="white" @click="disconnected">
                <v-icon>mdi-export</v-icon>
            </v-btn>
            </v-subheader>
        </div>

        <!-- main with router view that import to handle routes -->
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

        <!-- flash message component -->
        <flashMessage></flashMessage>
    </v-app>
</template>

<script src='./layout.js'></script>
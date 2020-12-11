<template>
    <v-container fluid>
        <datepicker @changementDate="nouvellDate" />
        <addOrdinateurModal @addingDesktop="addDesktop"/>

            <v-pagination
            v-model="currentPage"
            :length="totalPage"
            :total-visible="5"
            ></v-pagination>

        <v-row>
            <v-col cols="12" md="4" v-for="(ordi, key ) in ordinateurs" :key="key">
                <ordinateur :ordinateurName="ordi.name" :ordinateurId="ordi.id" :attribution="ordi.Attributions" :currentDate="currentDate" @removeDesktop="removeDesktopInfo" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script src="./home.js"></script>
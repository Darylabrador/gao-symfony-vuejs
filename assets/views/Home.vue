<template>
    <v-container fluid>
        <div class="d-flex">

            <datepicker @changementDate="nouvellDate" />
            <addOrdinateurModal @addingDesktop="addDesktop"/>
        </div>

            <v-pagination
            v-model="currentPage"
            :length="totalPage"
            :total-visible="5"
            ></v-pagination>

        <v-row>
            <v-col cols="12" md="4" v-for="(ordi, key ) in ordinateurs" :key="key">
                <ordinateur :ordinateurName="ordi.name" :ordinateurId="ordi.id" :attribution="ordi.assigns" :currentDate="currentDate" @removeDesktop="removeDesktopInfo" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script src="./home.js"></script>
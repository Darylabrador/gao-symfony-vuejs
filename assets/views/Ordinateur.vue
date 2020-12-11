<template>
  <v-card class="border">

    <addAttribution :dialog.sync="attributionDialog" :ordinateurId="selectedDesktop" :heureAttribution="heureAttribution" :currentDate="currentDate" @nouvellAttribution="infoAttribution" />
    <removeAttribution :dialog.sync="removeAttributionDialog" :attributionInfo="attributionId" @removedAttribution="removeAttributionData" />

    <removeOrdinateur :dialog.sync="deleteOrdiDialog" :ordinateur="selectedDesktop" @removeDesktop="removeDesktopInfo" />

    <v-card-title class="border-bottom border-dark w-100 d-flex justify-content-between">
      <div>
        {{ ordinateurName }}
      </div>
      <v-btn color="red" text @click="deleteOrdi(true, ordinateurId)">
        <v-icon> mdi-delete </v-icon>
      </v-btn>
    </v-card-title>
  
    <v-row v-for="timeslot in timeslots" :key="timeslot.id" no-gutters>
      <v-col cols="2" class="text-center  border-bottom border-right border-dark">
        {{ timeslot.heure }}h
      </v-col>      
      <v-col cols="8" class="pl-2 border-right border-bottom border-dark">
        {{ timeslot.attribution }}
      </v-col>      
      <v-col cols="2" class="border-bottom border-dark">
        <v-btn color="red" text v-if="timeslot.attribution != ''" @click="removeAttribution(true, timeslot.idAttribution)">
          <v-icon> mdi-delete </v-icon>
        </v-btn>
        <v-btn color="green" @click="addAttribution(true, timeslot.heure, ordinateurId)" text v-else>
           <v-icon> mdi-plus-circle-outline </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script src="./ordinateur.js"></script>
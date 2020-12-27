<template>
  <v-card class="border">

    <addAttribution :dialog.sync="attributionDialog" :ordinateurId="selectedDesktop" :heureAttribution="heureAttribution" :currentDate="currentDate" @nouvellAttribution="infoAttribution" />
    <removeAttribution :dialog.sync="removeAttributionDialog" :attributionInfo="attributionId" @removedAttribution="removeAttributionData" />
    <removeOrdinateur :dialog.sync="deleteOrdiDialog" :ordinateur="selectedDesktop" @removeDesktop="removeDesktopInfo" />
    <modificationOrdi :dialog.sync="modifDialog" :ordinateurId="selectedDesktop" @renameOrdi="renamedOrdi" />

    <v-card-title class="border-bottom border-dark w-100 d-flex justify-content-between">
      <div>
        {{ ordinateurName }}
      </div>
      <div class="d-flex justify-content-end">
        <v-btn color="red" text @click="deleteOrdi(true, ordinateurId)">
          <v-icon> mdi-delete </v-icon>
        </v-btn>
          <v-btn color="black" text @click="handleRename(true, ordinateurId)">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
      </div>
    </v-card-title>
  
    <v-row v-for="timeslot in timeslots" :key="timeslot.id" no-gutters>
      <v-col cols="2" class="text-center  border-bottom border-light">
        {{ timeslot.heure }}h
      </v-col>      
      <v-col cols="8" class="pl-2 border-bottom border-light">
        {{ timeslot.attribution }}
      </v-col>      
      <v-col cols="2" class="border-bottom border-light">
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
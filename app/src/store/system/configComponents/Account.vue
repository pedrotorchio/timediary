<script>
export default {

  data(){
    return {
      step: 1,
      date: null,
      dateFormatted: null,
      modal: false
    }
  },
  methods:{
    formatDate (date) {
        if (!date) {
          return null;
        }

        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
      },
    parseDate (date) {
      if (!date) {
        return null;
      }

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  
}
</script>

<template>
  <div>
    <h2>Usuário</h2>
    <v-stepper v-model="step" vertical non-linear>
      <v-stepper-step editable step="1" v-bind:complete="true">
        Pessoal
        <small>Nome &amp; Contato</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-text-field
              name="pers_display_name"
              label="Nome de Exibição"
        ></v-text-field>

        <v-text-field
              name="pers_first_name"
              label="Primeiro Nome"
        ></v-text-field>
        <v-text-field
              name="pers_last_name"
              label="Sobrenome"
        ></v-text-field>
        <v-text-field
              name="pers_phone"
              label="Telefone"
        ></v-text-field>
        <v-text-field
              name="pers_occupation"
              label="Ocupação"
        ></v-text-field>

        <div>

      <v-dialog
        persistent
        v-model="modal"
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          label="Data de Nascimento"
          v-model="dateFormatted"
          prepend-icon="event"
          @blur="date = parseDate(dateFormatted)"
        ></v-text-field>
        <v-date-picker v-model="date" @input="dateFormatted = formatDate($event)" no-title scrollable actions>
          <template slot-scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      
      </v-dialog>

        </div>
        
      </v-stepper-content>
      <v-stepper-step editable step="2" v-bind:complete="true">
        Endereço
      </v-stepper-step>
      <v-stepper-content step="2">
        
      </v-stepper-content>
      <v-stepper-step editable step="3" v-bind:complete="true">
        Login
        <small>Senha &amp; Email</small>
      </v-stepper-step>
      <v-stepper-content step="3">
        
      </v-stepper-content>
      
      
    </v-stepper>
  </div>
  
</template>

<style lang='scss' scoped>

</style>

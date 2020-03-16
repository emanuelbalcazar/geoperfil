<template>
  <div class="container">
    <ul class="steps has-content-centered">
      <li
        class="steps-segment"
        v-for="tab in tabs"
        :class="{ 'is-active': tab.isActive }"
        v-bind:key="tab.name"
      >
        <span class="steps-marker"></span>
        <div class="steps-content">
          <p class="is-size-4">{{tab.name}}</p>
          <p>{{tab.info}}</p>
        </div>
      </li>
    </ul>
    <div class="tab-details">
      <template>
        <!-- STEP 1 - NAME AND SURNAME -->
        <tab name="Paso 1" info="Nombre y apellido" :selected="true" :formData="formData">
          <div id="form-step-1">
            <div class="field">
              <label class="label">Nombre</label>
              <div class="container control">
                <input
                  class="input"
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  v-model="formData.name"
                  data-vv-scope="step1"
                  v-validate="'required'"
                />
                <p class="help is-danger" v-show="errors.has('step1.name')">{{ errorsText.name }}</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Apellido</label>
              <div class="control">
                <input
                  class="input"
                  name="surname"
                  type="text"
                  v-model="formData.surname"
                  placeholder="Apellido"
                  data-vv-scope="step1"
                  v-validate="'required'"
                />
                <p
                  class="help is-danger"
                  v-show="errors.has('step1.surname')"
                >{{ errorsText.surname }}</p>
              </div>
            </div>
          </div>
        </tab>

        <!-- STEP 2 - CAREER -->
        <tab name="Paso 2" info="Carrera" data-vv-scope="step2">
          <div id="form-step-2">
            <div class="field">
              <label class="label">Seleccione la carrera</label>
              <div class="control">
                <div class="flex md10 xs12">
                  <va-select
                    :label="text.career"
                    v-model="selectedCareerFromStep"
                    searchable
                    name="career"
                    textBy="name"
                    :options="careers"
                    data-vv-scope="step2"
                    v-validate="'required'"
                  />
                </div>
                <p
                  class="help is-danger"
                  v-show="errors.has('step2.career')"
                >{{ errorsText.career }}</p>
              </div>
            </div>
          </div>
        </tab>

        <!-- STEP 3 - CAMPUS AND INSTITUTION -->
        <tab name="Paso 3" info="Sede institucional">
          <div id="form-step-3">
            <div class="field">
              <label class="label">Seleccione la sede</label>
              <div class="control">
                <div class="flex md10 xs12">
                  <va-select
                    :label="text.campus"
                    v-model="selectedCampusFromStep"
                    searchable
                    name="campus"
                    textBy="name"
                    :options="campuses"
                    data-vv-scope="step3"
                    v-validate="'required'"
                  />
                </div>
                <p
                  class="help is-danger"
                  v-show="errors.has('step2.campus')"
                >{{ errorsText.campus }}</p>
              </div>
            </div>
          </div>
        </tab>
      </template>
    </div>
    <br />
    <div class="field is-grouped">
      <div class="control">
        <button @click="exit()" class="button is-danger">Salir</button>
      </div>

      <div class="control" v-if="currentActive > 0">
        <button @click="previousTab()" class="button is-primary">Anterior</button>
      </div>
      <div class="control" v-if="currentActive < totalTabs - 1">
        <button @click="nextTab()" class="button is-link">Siguiente</button>
      </div>
      <div class="control" v-if="currentActive == totalTabs -1">
        <button @click="submit()" class="button is-success">Guardar</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Vue from "vue";
import VeeValidate from "vee-validate";
import Tab from "./Tab";

export default {
  name: "form-wizard",
  components: {
    Tab
  },
  props: {
    name: String,
    article: String
  },
  data() {
    return {
      tabs: [],
      currentActive: 0,
      totalTabs: 0,
      formData: {
        name: "",
        surname: "",
        career_name: "",
        career_id: 0,
        campus_name: "",
        campus_id: 0,
        article_id: 0
      },
      text: {
        noData: "Vacio",
        title: "Profesional Seleccionado",
        editorTitle: "Editor de entidades",
        career: "Carrera",
        campus: "Sede institucional"
      },
      errorsText: {
        name: "Nombre es requerido",
        surname: "Apellido es requerido",
        career: "Carrera es requerido",
        campus: "Sede es requerida"
      },
      selectedCareerFromStep: "",
      selectedCampusFromStep: "",
      careers: [],
      campuses: []
    };
  },

  created() {
    this.tabs = this.$children;
    this.formData.name = this.name;
    this.formData.article_id = Number(this.article);
  },

  mounted() {
    this.totalTabs = this.tabs.length;
    this.getCareers();
    this.getCampuses();
  },
  watch: {
    // cuando '' cambie, se ejecutará esta función
    selectedCareerFromStep: function(career) {
      this.formData.career_id = career.id;
      this.formData.career_name = career.name;
    },
    selectedCampusFromStep: function(campus) {
      this.formData.campus_id = campus.id;
      this.formData.campus_name = campus.name;
    }
  },

  methods: {
    exit() {
      this.$modal.hide("step-by-step");
    },
    previousTab() {
      this.currentActive--;
      this.tabs.forEach(tab => {
        tab.isActive = false;
      });
      this.tabs[this.currentActive].isActive = true;
    },

    nextTab() {
      //Validate input
      this.$root.$validator
        .validate("step" + (this.currentActive + 1) + ".*")
        .then(valid => {
          if (valid) {
            this.currentActive++;
            this.tabs.forEach(tab => {
              tab.isActive = false;
            });

            this.tabs[this.currentActive].isActive = true;
          }
        });
    },

    submit() {
      this.$root.$validator
        .validate("step" + this.totalTabs + ".*")
        .then(async valid => {
          if (valid) {
            let response = await axios.post(
              "/api/professionals",
              this.formData
            );

            this.logSuccess("Profesional guardado correctamente");
          }
        });
    },
    async getCareers() {
      let response = await axios.get("/api/careers", {
        params: { page: 1, perPage: 500 }
      });
      this.careers = response.data.data;
    },
    async getCampuses() {
      let response = await axios.get("/api/campuses", {
        params: { page: 1, perPage: 500 }
      });
      this.campuses = response.data.data;
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/bulma/bulma.sass";
@import "node_modules/bulma-steps-component/bulma-steps.sass";
</style>

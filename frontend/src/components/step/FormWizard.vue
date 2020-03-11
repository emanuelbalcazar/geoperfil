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
                  name="fullname"
                  type="text"
                  placeholder="Nombre"
                  v-model="formData.name"
                  data-vv-scope="step1"
                  v-validate="'required'"
                />
                <p
                  class="help is-danger"
                  v-show="errors.has('step1.fullname')"
                >{{ errorsText.name }}</p>
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
        <tab name="Paso 2" info="Seleccione la carrera" data-vv-scope="step2">
          <div id="form-step-2">
            <div class="field">
              <label class="label">Carrera</label>
              <div class="control">
                <div class="flex md10 xs12">
                  <va-select
                    :label="text.career"
                    v-model="selectedCareerFromStep"
                    searchable
                    textBy="name"
                    :options="careers"
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
        <!-- <tab name="Paso 3" info="Institución">
            <div id="form-step-3">
              <div class="field">
                <label class="label">Where did you hear about us?</label>
                <div class="control">
                  <div class="select" name="reference">
                    <select
                      v-model="formData.reference"
                      v-validate="'required'"
                      name="reference"
                      data-vv-scope="step3"
                    >
                      <option value>Select</option>
                      <option value="newspaper">Newspaper</option>
                      <option value="social-media">Social Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <p
                  class="help is-danger"
                  v-show="errors.has('step3.reference')"
                >{{ errors.first('step3.reference') }}</p>
              </div>
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input
                      type="checkbox"
                      name="terms"
                      v-model="formData.terms"
                      data-vv-scope="step3"
                      v-validate="'required'"
                    />
                    I agree to the
                    <a href="#">terms and conditions</a>
                  </label>
                </div>
                <p
                  class="help is-danger"
                  v-show="errors.has('step3.terms')"
                >{{ errors.first('step3.terms') }}</p>
              </div>
            </div>
        </tab>-->
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
    name: String
  },
  data() {
    return {
      tabs: [],
      currentActive: 0,
      totalTabs: 0,
      formData: {
        name: "",
        surname: ""
      },
      text: {
        noData: "Vacio",
        title: "Profesional Seleccionado",
        editorTitle: "Editor de entidades",
        career: "Carrera"
      },
      errorsText: {
        name: "Nombre es requerido",
        surname: "Apellido es requerido",
        career: "Carrera es requerido"
      },
      selectedCareerFromStep: {},
      careers: []
    };
  },

  created() {
    this.tabs = this.$children;
    this.formData.name = this.name;
  },

  mounted() {
    this.totalTabs = this.tabs.length;
    this.getCareers();
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
        .then(valid => {
          if (valid) {
            alert("Everything passes ! Ready to Submit", this.formData.name);
          }
        });
    },
    async getCareers() {
      let response = await axios.get("/api/careers", {
        params: { page: 1, perPage: 100 }
      });
      this.careers = response.data.data;
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/bulma/bulma.sass";
@import "node_modules/bulma-steps-component/bulma-steps.sass";
</style>

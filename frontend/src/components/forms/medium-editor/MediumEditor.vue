<template>
  <div class="medium-editor">
    <div class="row">
      <div class="flex md8">
        <va-card :title="$t('forms.mediumEditor.title')">
          <div class="d-flex flex-center">
            <va-medium-editor
              @initialized="handleEditorInitialization"
              :editor-options="editorOptions"
            ></va-medium-editor>
          </div>
        </va-card>
      </div>

      <div class="flex md4">
        <!-- professional -->
        <va-card :title="text.title" v-if="renderProfessionalCard">
          <form @submit.prevent="save">
            <va-input label="Nombre" v-model="selectedProfessional.name" />

            <va-input label="Apellido" v-model="selectedProfessional.surname" />

            <va-button color="success" type="submit">Guardar</va-button>
          </form>
        </va-card>

        <!-- <va-button color="success" @click="test" type="button">Probar</va-button>
        <br />

        <ul id="example-1">
          <b>Profesionales:</b>
          <li v-for="item in professionals">- {{ item.name }}</li>
        </ul>

        <br />
        <ul id="example-1">
          <b>Carreras:</b>
          <li v-for="item in careers">- {{ item.name }}</li>
        </ul>

        <br />
        <ul id="example-1">
          <b>Sedes:</b>
          <li v-for="item in campuses">- {{ item.name }}</li>
        </ul>
        <br />

        <ul id="example-1">
          <b>Instituciones:</b>
          <li v-for="item in institutions">- {{ item.name }}</li>
        </ul>-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const parser = require("node-html-parser");

import MediumEditor from "medium-editor";

import rangy from "rangy";
import "rangy/lib/rangy-classapplier";

rangy.init();

const createCustomButton = function(name, title, innerHTML) {
  var CustomButton = MediumEditor.extensions.button.extend({
    name: name,

    init: function() {
      this.classApplier = rangy.createClassApplier(name, {
        elementTagName: "mark",
        normalize: true
      });

      this.button = this.document.createElement("button");
      this.button.classList.add("medium-editor-action");
      this.button.innerHTML = innerHTML;
      this.button.title = title;

      this.on(this.button, "click", this.handleClick.bind(this));
    },

    getButton: function() {
      return this.button;
    },

    handleClick: function(event) {
      this.classApplier.toggleSelection();
      this.base.checkContentChanged();
    },

    isAlreadyApplied: function(node) {
      return node.nodeName.toLowerCase() === "mark";
    },

    isActive: function() {
      return this.button.classList.contains("medium-editor-button-active");
    },

    setInactive: function() {
      this.button.classList.remove("medium-editor-button-active");
    },

    setActive: function() {
      this.button.classList.add("medium-editor-button-active");
    }
  });

  return new CustomButton();
};

export default {
  name: "medium-editor",
  data() {
    return {
      editorOptions: {
        disableEditing: true,
        buttonLabels: "fontawesome",
        autoLink: true,
        toolbar: {
          buttons: ["entity", "career", "campus", "institution"],
          separatorClass: "medium-editor__separator"
        },
        extensions: {
          professional: createCustomButton(
            "entity",
            "Profesional",
            "<font><b>Profesional</b></>"
          ),
          career: createCustomButton(
            "career",
            "Carrera",
            "<font><b>Carrera</b></>"
          ),
          campus: createCustomButton("campus", "Sede", "<font><b>Sede</b></>"),
          institution: createCustomButton(
            "institution",
            "Institución",
            "<font><b>Institución<b/></>"
          )
        },
        placeholder: {
          /* This example includes the default options for placeholder,
           if nothing is passed this is what it used */
          text: "",
          hideOnClick: true
        }
      },
      text: {
        noData: "Vacio",
        title: "Profesional Seleccionado"
      },
      article: { text: "", html: "" },
      professionals: [],
      careers: [],
      campuses: [],
      institutions: [],
      selectedProfessional: {
        name: "",
        surname: "",
        article_id: this.$route.params.id
      },
      renderProfessionalCard: false
    };
  },
  mounted() {
    this.findArticleById(this.$route.params.id);
    var self = this;

    this.getDataFromArticle();

    /**
     * Al hacer click sobre un elemento resaltado con la clase "entity", realiza una accion.
     */
    document.addEventListener(
      "click",
      function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;

        if (target.className == "entity") {
          var text = target.textContent || target.innerText;
          // mostrar cuadro de edicion al costado
          self.selectedProfessional = {
            name: text,
            surname: "",
            article_id: self.$route.params.id
          };
          self.renderProfessionalCard = true;

          self.getDataFromArticle();
        }
      },
      false
    );
  },
  computed: {
    fields() {
      return [
        {
          name: "name",
          title: "Nombre"
        },
        {
          name: "surname",
          title: "Apellido"
        }
      ];
    }
  },
  methods: {
    handleEditorInitialization(editor) {
      this.editor = editor;
    },

    highlightSampleText() {
      let sampleText = document.getElementsByClassName("default-selection")[0];
      this.editor.selectElement(sampleText);
    },

    async findArticleById(id) {
      let response = await axios.get("/api/articles/" + id);
      this.article = response.data;
      this.editor.setContent(this.article.html);
    },
    getDataFromArticle() {
      let content = this.editor.getContent();
      let root = parser.parse(content);

      // get professionals
      this.professionals = root.querySelectorAll(".entity");

      this.professionals = this.professionals.map(e => {
        let object = { name: "" };
        object.name = e.text || e.innerText;
        return object;
      });

      // get careers
      this.careers = root.querySelectorAll(".career");

      this.careers = this.careers.map(e => {
        let object = { name: "" };
        object.name = e.text || e.innerText;
        return object;
      });

      console.log(this.career);

      // get campuses
      this.campuses = root.querySelectorAll(".campus");

      this.campuses = this.campuses.map(e => {
        let object = { name: "" };
        object.name = e.text || e.innerText;
        return object;
      });

      // get institutions
      this.institutions = root.querySelectorAll(".institution");

      this.institutions = this.institutions.map(e => {
        let object = { name: "" };
        object.name = e.text || e.innerText;
        return object;
      });
    },
    async save() {
      let data = Object.assign({}, this.selectedProfessional);
      let response = await axios.post("/api/professionals", data);

      console.log(response.data);
    }
  }
};
</script>

<style lang="css">
.entity {
  background: color(#ffff00);
  padding: 0.45em 0.6em;
  margin: 0 0.25em;
  line-height: 1;
  border-radius: 0.35em;
}

.career {
  background: #d16236;
  padding: 0.45em 0.6em;
  margin: 0 0.25em;
  line-height: 1;
  border-radius: 0.35em;
}

.campus {
  background: #5edd64;
  padding: 0.45em 0.6em;
  margin: 0 0.25em;
  line-height: 1;
  border-radius: 0.35em;
}

.institution {
  background: #6c74bb;
  padding: 0.45em 0.6em;
  margin: 0 0.25em;
  line-height: 1;
  border-radius: 0.35em;
}
</style>

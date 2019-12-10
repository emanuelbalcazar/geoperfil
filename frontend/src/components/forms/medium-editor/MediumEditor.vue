<template>
  <div class="medium-editor">
    <div class="row">
      <div class="flex md8">
        <va-card :title="$t('forms.mediumEditor.title')">
          <div class="d-flex flex-center">
            <va-medium-editor
              @initialized="handleEditorInitialization"
              :editor-options="editorOptions"
            >{{ article.text}}</va-medium-editor>
          </div>
        </va-card>
      </div>

      <div class="flex md4">
        <va-button color="success" @click="test" type="button">Probar</va-button>
        <br />

        <ul id="example-1">
          <b>Profesionales:</b>
          <li v-for="item in professionals">- {{ item }}</li>
        </ul>

        <br />
        <ul id="example-1">
          <b>Carreras:</b>
          <li v-for="item in careers">- {{ item }}</li>
        </ul>

        <br />
        <ul id="example-1">
          <b>Sedes:</b>
          <li v-for="item in campuses">- {{ item }}</li>
        </ul>
        <br />

        <ul id="example-1">
          <b>Instituciones:</b>
          <li v-for="item in institutions">- {{ item }}</li>
        </ul>
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

function createCustomButton(name, title, innerHTML) {
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
}

export default {
  name: "medium-editor",
  data() {
    return {
      editorOptions: {
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
      article: { text: "", html: "" },
      professionals: [],
      careers: [],
      campuses: [],
      institutions: []
    };
  },
  mounted() {
    this.findArticleById(this.$route.params.id);
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
    },
    test() {
      let content = this.editor.getContent();
      let root = parser.parse(content);

      // get professionals
      this.professionals = root.querySelectorAll(".professional");

      this.professionals = this.professionals.map(e => {
        return e.text || e.innerText;
      });

      // get careers
      this.careers = root.querySelectorAll(".career");

      this.careers = this.careers.map(e => {
        return e.text || e.innerText;
      });

      // get campuses
      this.campuses = root.querySelectorAll(".campus");

      this.campuses = this.campuses.map(e => {
        return e.text || e.innerText;
      });

      // get institutions
      this.institutions = root.querySelectorAll(".institution");

      this.institutions = this.institutions.map(e => {
        return e.text || e.innerText;
      });
    }
  }
};
</script>

<style lang="css">
.entity {
  background-color: rgb(108, 152, 248);
}

.career {
  background-color: rgb(172, 231, 94);
}

.campus {
  background-color: rgb(236, 162, 118);
}

.institution {
  background-color: rgb(214, 89, 80);
}
</style>

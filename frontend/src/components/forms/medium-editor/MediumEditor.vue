<template>
  <div class="medium-editor">
    <div class="row">
      <div class="flex md12">
        <va-card :title="$t('forms.mediumEditor.title')">
          <div class="d-flex flex-center">
            <va-medium-editor
              @initialized="handleEditorInitialization"
              :editor-options="editorOptions"
            >{{ article.text}}</va-medium-editor>
          </div>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import MediumEditor from "medium-editor";

import rangy from "rangy";
import "rangy/lib/rangy-classapplier";

rangy.init();

function createCustomButton(name, title) {
  var CustomButton = MediumEditor.extensions.button.extend({
    name: name,

    init: function() {
      this.classApplier = rangy.createClassApplier(name, {
        elementTagName: "mark",
        normalize: true
      });

      this.button = this.document.createElement("button");
      this.button.classList.add("medium-editor-action");
      this.button.innerHTML = title;
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
          buttons: ["professional", "career", "campus", "institution"],
          separatorClass: "medium-editor__separator"
        },
        extensions: {
          professional: createCustomButton("professional", "Profesional"),
          career: createCustomButton("career", "Carrera"),
          campus: createCustomButton("campus", "Sede"),
          institution: createCustomButton("institution", "Institución")
        }
      },
      article: { text: "texto kkkk", html: "" }
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
    }
  }
};
</script>

<style lang="css">
.professional {
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

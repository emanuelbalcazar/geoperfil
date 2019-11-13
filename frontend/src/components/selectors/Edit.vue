<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <form>
            <div class="row">
              <div class="flex md4 sm6 xs12">
                <va-input v-model="simple" placeholder="Text Input" />
              </div>
            </div>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-selector",
  components: {},
  data() {
    return {
      text: {
        title: "Editando Selectores"
      }
    };
  },
  created() {
    console.log(this.$route.params);
  }
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>

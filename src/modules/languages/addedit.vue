<template>
    <v-card>
        <v-card-title>
            <span class="headline">{{ formTitle }}</span>
            <div class="flex text-xs-right">
                <v-tooltip bottom>
                    <button class="btn btn-flat info sm" slot="activator" @click="close">
                        <i class="material-icons">clear</i>
                    </button>
                    <span>Close</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <button class="btn btn-flat success sm" slot="activator" @click="save">
                        <i class="material-icons">save</i>
                    </button>
                    <span>Save</span>
                </v-tooltip>
            </div>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                        <v-text-field v-model="dataItem.name" label="Name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6></v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field v-model="dataItem.icon" label="Icon"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-text-field v-model="dataItem.orders" type="number" label="Orders"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-switch color="primary" :label="`Switch 1: ${dataItem.flag}`" v-model="dataItem.flag"></v-switch>
                        <!-- <v-text-field v-model="dataItem.flag" label="Trạng thái"></v-text-field> -->
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <!-- <editor v-model="dataItem.desc" apiKey="yat69ufb2vpeon5rcyk9z5jm6r9jjf85vmvw5t2aacdeupw6" :init="tinymceSettings"></editor> -->
                        <tinymce id="d1" v-model="dataItem.desc"></tinymce>
                        <!-- <textarea v-model="dataItem.desc"></textarea> -->
                        <!-- <v-text-field v-model="dataItem.desc" label="Descriptions"></v-text-field> -->
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <div class="flex text-xs-right">
                <v-tooltip top>
                    <button class="btn btn-flat info sm" slot="activator" @click="close">
                        <i class="material-icons">clear</i>
                    </button>
                    <span>Close</span>
                </v-tooltip>
                <v-tooltip top>
                    <button class="btn btn-flat success sm" slot="activator" @click="save">
                        <i class="material-icons">save</i>
                    </button>
                    <span>Save</span>
                </v-tooltip>
            </div>
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn> -->
            <!-- <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn> -->
        </v-card-actions>
    </v-card>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import { Languages } from "@/models/languages";
import tinymce from "vue-tinymce-editor";
export default {
  components: {
    tinymce
  },
  props: ["formshow", "editedIndex"],
  data: () => ({
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    show: false,
    tinymceSettings: {},
    dataItem: new Languages()
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState({
        languages: state => state.languages.items
    }),
    ...mapGetters('languages', {
        getItems: 'getItems'
    })
  },
  methods: {
    ...mapActions({
        fetchItems: 'languages/fetchItems',
        addItem: 'languages/addItem'
    }),
    close() {
      this.$emit("close-formshow");
      // this.dialog = false
      // setTimeout(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // }, 300)
      // console.log(languages)
      this.editedIndex = -1
    },
    save() {
        this.addItem(this.dataItem);
        // console.log(this.$store)
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
      // } else {
      //   this.desserts.push(this.editedItem)
      // }
      // this.close()
    }
  },
  created() {
      console.log(this.dataItem)
      // console.log(this.$store)
    // document.getElementsByClassName('mce-notification')[0].remove()
    // var parent = document.getElementById("app");
    // parent.replaceChild(children, "");
  }
  // watch: {
  //   dialog (val) {
  //     if (!val) this.$emit('close-dialog');
  //   }
  // }
};
</script>

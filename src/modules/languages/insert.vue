<template>
    <v-dialog v-model="dialog" max-width="1000" :persistent="true">
        <v-card>
            <v-card-title>
                <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <div class="card-dialog-action">
                <v-btn-toggle>
                    <v-btn flat value="close" @click.native="close">
                        <i class="material-icons">clear</i>
                    </v-btn>
                </v-btn-toggle>
            </div>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                <!-- <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn> -->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ['dialog'],
    data: () => ({
        editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    // watch: {
    //   dialog (val) {
    //     if (!val) this.$emit('close-dialog');
    //   }
    // },
    methods: {
        close () {
        this.$emit('close-dialog');
        // this.dialog = false
        // setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // }, 300)
      },
      save () {
        // if (this.editedIndex > -1) {
        //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
        // } else {
        //   this.desserts.push(this.editedItem)
        // }
        // this.close()
      }
    },
    created() {
        // console.log(this.dialog)
    }
}
</script>

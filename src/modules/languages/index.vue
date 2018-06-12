<template>
    <div>
        <div v-if="formshow==list">
            <v-card>
                <v-card-title>
                    <!-- <v-btn color="primary" @click.stop="dialog = !dialog">
                        <i class="material-icons">add</i>
                    </v-btn> -->
                    <v-btn color="primary" @click.stop="formshow = addedit">
                        <i class="material-icons">add</i>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table v-model="selected" :headers="headers" :items="data" :search="search" :pagination.sync="pagination" :total-items="totalData" :loading="loading" :rows-per-page-items="rowPerPage" class="elevation-1">
                    <template slot="headers" slot-scope="props">
                        <tr>
                            <th>
                                <v-checkbox :input-value="props.all" :indeterminate="props.indeterminate" primary hide-details @click.native="toggleAll"></v-checkbox>
                            </th>
                            <th v-for="header in props.headers" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)">
                                <v-icon small>arrow_upward</v-icon>
                                {{ header.text }}
                            </th>
                        </tr>
                    </template>
                    <template slot="items" slot-scope="props">
                        <tr :active="props.selected" @click="props.selected = !props.selected">
                            <td>
                                <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
                            </td>
                            <td>{{ props.item.name }}</td>
                            <td class="text-xs-right">{{ props.item.calories }}</td>
                            <td class="text-xs-right">{{ props.item.fat }}</td>
                            <td class="text-xs-right">{{ props.item.carbs }}</td>
                            <td class="text-xs-right">{{ props.item.protein }}</td>
                            <td class="text-xs-right">{{ props.item.iron }}</td>
                            <td class="justify-center layout px-0">
                                <v-btn icon class="mx-0" @click="editItem(props.item)">
                                    <v-icon color="teal">edit</v-icon>
                                </v-btn>
                                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                    <v-icon color="pink">delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
            </v-card>
        </div>
        <!-- <v-dialog v-model="dialog" max-width="1000">
            <addedit :dialog="dialog" :editedIndex="editedIndex" @close-dialog="dialog = false"></addedit>
        </v-dialog> -->
        <div v-else-if="formshow==addedit">
            <addedit :formshow="formshow" :editedIndex="editedIndex" @close-formshow="formshow = list"></addedit>
        </div>
    </div>
</template>
<script>
import addedit from "./addedit";
export default {
  components: {
    addedit
  },
  data() {
    return {
      formshow: "list",
      list: "list",
      addedit: "addedit",
      data: [],
      selected: [],
      search: "",
      totalData: 0,
      loading: true,
      pagination: {},
      rowPerPage: [10, 25, 50, 100, { text: "All", value: -1 }],
      dialog: false,
      editedIndex: -1,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ]
    };
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    }
  }
  // created() {
  //     this.$dialog = false;
  //     console.log(this.$dialog)
  // }
};
</script>

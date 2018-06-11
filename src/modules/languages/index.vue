<template>
    <div>
        <v-card>
            <v-card-title>
                <v-btn slot="activator" color="primary" @click="updateDialog">
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
        <insert :dialog="dialog" @close-dialog="dialog = false" @:update:visible="updateDialog"></insert>
    </div>
</template>
<script>
import insert from './insert'
export default {
    components: {
        insert
    },
    data () {
      return {
        data: [],
        selected: [],
        search: '',
        totalData: 0,
        loading: true,
        pagination: {},
        rowPerPage: [10, 20, 50, 100, {"text": "All", "value": -1}],
        dialog: false,
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ]
      }
    },
    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },
      updateDialog() {
        // this.$dialog = true;

        if (this.dialog) this.dialog = false
        else this.dialog = true

        // console.log(this.$dialog)
      }
    }
    // created() {
    //     this.$dialog = false;
    //     console.log(this.$dialog)
    // }
}
</script>

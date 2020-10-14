<template>
  <q-page class="flex flex-center">
   <q-table
    ref="table"
    :data="serverData"
    :columns="columns"
    :filter="filter"
    :filter-method="myFilter"
    :columns_filter="true"
    row-key="name"
    :pagination.sync="serverPagination"
    :loading="loading"
    @request="request" >
    <template slot="top-right" >
    </template>


    <template v-slot:top-left>
email
<input type="email" v-model="email" class="form-control" id="email" placeholder="Username (your work email)">
<button type="button" class="btn btn-primary btn-block inactive" @click="submit">Log in</button>
</template>


    <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

  </q-table>


<div id="example">
  <button v-on:click="greet">Greet</button>
</div>


  </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios' 
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: "",
      filter: "",
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 100, // specifying this determines pagination is server-side
      },

      serverData: [],
      columns: [
        { name: 'dessert', required: true, label: 'Dessert (100g serving)', align: 'left', field: 'name', sortable: true },
        { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]
    }
  },
  methods: {
    submit () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
    },
    greet () {
      // `this` inside methods point to the Vue instance
      //alert('Hello ' + this.name + '!')
      // `event` is the native DOM event


    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
    },

    myFilter (rows, terms, cols, cellValue) {
      alert(rows)
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(
        row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
      )
    },

    request ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true


      console.log(filter);
      console.log(pagination);

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)

      axios
      .get('/api/v1/foo.json' + "?page=" +  pagination.page + "&filter=" + this.email)
      .then(({ data }) => {
        // updating pagination to reflect in the UI
        this.serverPagination = pagination

        // we also set (or update) rowsNumber
        this.serverPagination.rowsNumber = data.meta.total
        window.foo = data.data;

        // then we update the rows with the fetched ones
        this.serverData = data.data

        // finally we tell QTable to exit the "loading" state
        this.loading = false
      })
      .catch(error => {
        // there's an error... do SOMETHING

        // we tell QTable to exit the "loading" state
        console.log(error);
        this.loading = false
      })
    }
  },
  mounted () {
    // once mounted, we need to trigger the initial server data fetch
//    this.greet();
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}


</script>

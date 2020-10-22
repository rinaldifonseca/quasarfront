<template>
<div>
  <q-page class="flex flex-center">
   <q-table
    ref="table"
    :data="serverData"
    :columns="columns"
    :filter="filter"
    :columns_filter="true"
    row-key="name"
    :pagination.sync="serverPagination"
    :loading="loading"
    @request="request" >
    <template slot="top-right" >
    </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="grey" @click="basic = true" icon="edit"></q-btn>
            <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
          </q-td>
        </template>

    <template v-slot:top-left>
email
<input type="email" v-model="email" class="form-control" id="email" placeholder="Username (your work email)">
<button type="button" class="btn btn-primary btn-block inactive" @click="submit">Filtrar</button>


<q-input outlined v-model="date">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="DD-MM-YYYY"
                    @input="() => $refs.qDateProxy.hide()"/>
          </q-popup-proxy>
        </q-icon>
      </template>
</q-input>

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

<q-dialog v-model="basic">
  <q-card>
    <q-card-section>
      <div class="text-h6">Terms of Agreement</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Decline" color="primary" v-close-popup />
      <q-btn flat label="Accept" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</q-dialog>

</div>
</template>

<style>
</style>

<script>
import axios from 'axios' 
export default {
  name: 'HelloWorld',
  data () {
    return {
      date: "",
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
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'actions', label: 'Actions', field: '', align:'center' }
      ],

      basic: false,
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

    request ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true


      console.log(filter);
      console.log(pagination);

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)

      axios
      .get('/api/v1/foo.json' + "?page=" +  pagination.page + "&filter=" + this.email +  "&date=" + this.date)
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

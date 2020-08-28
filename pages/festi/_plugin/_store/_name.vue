<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>{{getListName()}}</h3>
        </v-flex>
        <v-flex lg12>
          <v-card>
            
            <v-toolbar card color="white">
              
              <v-text-field
                flat
                solo
                prepend-icon="search"
                placeholder="Type something"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>
              <v-tooltip bottom>
                <v-btn icon slot="activator" @click="openInsertForm()">
                  <v-icon color="text--secondary">add</v-icon>
                </v-btn>
                <span>Add</span>
              </v-tooltip>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                select-all
                v-model="complex.selected">
                
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox
                      primary
                      hide-details
                      v-model="props.selected"
                    ></v-checkbox>
                  </td>
                   <store-list-items v-for="(item, name, key) in getFields()" 
                               v-bind:itemField="item" 
                               v-bind:key="key" 
                               :nameField="name" 
                               v-bind:dataFields="props">
                    </store-list-items>
                      <!-- <store-list :allFields="getFields()" v-bind:data="props"></store-list> -->
                  <td>
                     <store-actions-list v-for="(item, name, key) in getActions()" 
                                        v-bind:itemField="item" 
                                        v-bind:key="key" 
                                        :nameField="name" 
                                        v-bind:dataFields="props" 
                                        :actions="getActions()"
                                        v-bind:frame="frame"
                                        :allFields="getFields()"
                                        v-bind:basic="basic">
                      </store-actions-list>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
            <store-basic-dialog v-bind:basic="basic"
                                v-bind:frame="frame"
                                :actions="getActions()"
                                :allFields="getFields()"
                                ref="basic_dialog">
            </store-basic-dialog>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
  import StoreList from '@/components/store/StoreList';
  import StoreListItems from '@/components/store/StoreListItems';
  import StoreActionsList from '@/components/store/StoreActionsList';
  import StoreBasicDialog from '@/components/store/StoreBasicDialog';
  import * as Data from '@/api/data';
  import axios from "axios";

  export default {
    components: {
      StoreList,
      StoreListItems,
      StoreActionsList,
      StoreBasicDialog
    },
    data() {
      return {
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
        menu2: false,
        frame: {},
        basic: {
            dialog: false,
            action: 'edit',
            dialogName: '',
            startDate: null,
            startDateMenu: false,
        },
        search: '',
        complex: {
          selected: [],
          headers: Data.getHeaders(this.$store.state.dgs.struct),
          items: Data.getItems(this.$store.state.dgs)
        }
      };
    },
    fetch ({ store, params }) {
      return axios.get('http://api.v2.skimp.tk.local:8080/v1/shortener/')
      .then((res) => {
        store.commit('dgs/addItems', res.data.items)
        store.commit('dgs/addStruct', res.data.struct)
      })
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      // frame: {
      //   get() {
      //     return this.$store.state.dgs.mainFrame;
      //   },
      //   set(value) {
      //      this.$store.commit('dgs/addMainFrame', value)
      //   }
      // }
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
        getListName() {
            let actions = Data.getActions(this.$store.state.dgs.struct)
            return actions.list.caption;
        },
        getFields: function() {
          return Data.getFields(this.$store.state.dgs.struct);
        },

        getActions: function() {
          return Data.getActions(this.$store.state.dgs.struct);
        },

        formatDate (date) {
          if (!date) return null

          const [year, month, day] = date.split('-')
          return `${month}/${day}/${year}`
        },
        parseDate (date) {
          if (!date) return null

          const [month, day, year] = date.split('/')
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },

        openInsertForm() {
          this.basic.dialog = true;
          this.basic.action = 'insert';
          this.basic.dialogName = "Insert New Row";
          this.$refs.basic_dialog.openInsertForm(this.basic);
        }
    },
    mounted() {
      this.$nuxt.$on('onSaveEditForm', (currentFrame) => {
        console.log('ON SAVE StoreEditList');
        console.log(currentFrame.host + " : " + currentFrame.link);
        //console.log(this.$refs.store_list.$forceUpdate());
      });
  }
  };
</script>

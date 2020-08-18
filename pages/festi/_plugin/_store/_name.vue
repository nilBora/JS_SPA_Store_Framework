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
                v-model="complex.selected"
              >
                
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox
                      primary
                      hide-details
                      v-model="props.selected"
                    ></v-checkbox>
                  </td>
                   <store-list v-for="(item, name, key) in getFields()" v-bind:itemField="item" v-bind:key="key" :nameField="name" v-bind:dataFields="props"></store-list>
                  <td>
                     <store-actions-list v-for="(item, name, key) in getActions()" 
                                        v-bind:itemField="item" 
                                        v-bind:key="key" 
                                        :nameField="name" 
                                        v-bind:dataFields="props" 
                                        :actions="getActions()"
                                        v-bind:frame="frame"
                                        :allFields="getFields()"
                                        v-bind:basic="basic"
                                        ></store-actions-list>
                     <!-- <template v-for="(item, name) in getActions()">
                        <v-btn @click="handleUpdate(props.item)" v-if="name === 'edit'" depressed outline icon fab dark color="primary" small>
                          <v-icon>edit</v-icon>
                        </v-btn>

                        <v-btn v-else-if="name === 'remove'" depressed outline icon fab dark color="pink" small>
                          <v-icon>delete</v-icon>
                        </v-btn>
                     </template> -->
                     
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
            <v-dialog v-model="basic.dialog" persistent max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline" v-model="frame.dialogName">{{ frame.dialogName }}</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <store-edit-list v-for="(item, name, key) in getFields()" 
                                       v-bind:itemField="item" 
                                       v-bind:key="key" 
                                       :nameField="name" 
                                       v-bind:frame="frame"
                                       :actions="getActions()"
                                       v-bind:basic="basic"
                                       :allFields="getFields()"></store-edit-list>
                      <!-- <template v-for="(itemField, nameField) in getFields()">
                          <v-flex xs12 
                          v-if="itemField.type === 'image' && itemField.onlyList === false">
                              <img :src="frame[nameField]" alt="">
                          </v-flex>
                          <v-flex xs12 
                          v-else-if="itemField.type === 'textarea' && itemField.onlyList === false">
                          <v-text-field textarea v-model="frame[nameField]" :label="itemField.caption">
                          </v-text-field>
                          </v-flex>
                          <v-flex xs12 
                          v-else-if="itemField.type === 'date' && itemField.onlyList === false">
                          <v-menu
                              v-model="menu2"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                          >
                              <template v-slot:activator="{ on }">
                              <v-text-field
                                  v-model="frame[nameField]"
                                  label="Picker without buttons"
                                  prepend-icon="event"
                                  readonly
                                  v-on="on"
                              ></v-text-field>
                              </template>
                              <v-date-picker v-model="frame[nameField]" @input="menu2 = false"></v-date-picker>
                          </v-menu>
                          </v-flex>
                          <v-flex xs12 
                          v-else-if="itemField.type === 'datetime' && itemField.onlyList === false">
                          
                          </v-flex>
                          <v-flex xs12 
                          v-else-if="itemField.type === 'checkbox' && itemField.onlyList === false">
                              <v-switch
                              :label="itemField.caption"
                              v-model="frame[nameField]"
                              ></v-switch>
                          </v-flex>
                          <v-flex xs12 
                          v-else-if="itemField.onlyList === false">
                              <v-text-field 
                              v-model="frame[nameField]" 
                              :label="itemField.caption" 
                              :mask="itemField.mask"
                              :placeholder="itemField.placeholder"
                              required
                          ></v-text-field>
                          </v-flex>
                      </template> -->
                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="basic.dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="basic.dialog = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
  import StoreList from '@/components/store/StoreList';
  import StoreEditList from '@/components/store/StoreEditList';
  import StoreActionsList from '@/components/store/StoreActionsList';
  import * as Data from '@/api/data';
  import { Datetime } from 'vue-datetime';
  import axios from "axios";

  export default {
    components: {
      Datetime,
      StoreList,
      StoreEditList,
      StoreActionsList
    },
    data() {
      return {
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu2: false,

        basic: {
          dialog: false,
           startDate: null,
           startDateMenu: false,
        },
        // frame: {
        //   dialogName: '',
        //   activeID: false
        // },
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
      frame: {
        get() {
          return this.$store.state.dgs.mainFrame;
        },
        set(value) {
           this.$store.commit('dgs/addMainFrame', value)
        }
      }
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

        getAction(key) {
          let actions = this.getActions();
          if (key in actions) {
            return actions[key]
          }
        },

        handleUpdate(item) {
          let fields = this.getFields()

          for (var key in fields) {
            this.frame[key] = item[key]
            // if (fields[key]['type'] === 'datetime') {

            // } 
            //this.$set(this.frame, key, item[key])
          }
          
          this.frame.activeID = item.id;

          this.frame.dialogName = this.getDialogName(item);
      
          this.basic.dialog=true;

          //this.$emit("handleUpdateFrame", this.frame);
          //this.$store.commit('dgs/addMainFrame', this.frame);

        },

        getDialogName(item) {
          let caption = this.getAction('edit').caption
          
          caption = caption.replace("%id%", item.id);
          
          return caption
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
    }
  };
</script>

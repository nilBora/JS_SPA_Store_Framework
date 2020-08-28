 <template>
    <v-dialog v-model="basic.dialog" persistent max-width="500px">
    <v-card>
        <v-card-title>
        <span class="headline" v-model="currentFrame.dialogName">{{ currentFrame.dialogName }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
        <v-container grid-list-md>
            <v-layout wrap>
            <!-- <store-edit-list v-for="(item, name, key) in allFields" 
                            v-bind:itemField="item" 
                            v-bind:key="key" 
                            :nameField="name" 
                            v-bind:frame="frame"
                            :actions="actions"
                            v-bind:basic="basic"
                            :allFields="allFields"
                            ref="editList"
                            ></store-edit-list> -->
                <template v-for="(itemField, nameField) in allFields">
                    <v-flex xs12 
                    v-if="itemField.type === 'image' && itemField.onlyList === false">
                        <img :src="currentFrame[nameField]" :alt="itemField.caption">
                    </v-flex>
                    <v-flex xs12 
                    v-else-if="itemField.type === 'textarea' && itemField.onlyList === false">
                    <v-text-field textarea v-model="currentFrame[nameField]" :label="itemField.caption">
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
                            v-model="currentFrame[nameField]"
                            label="Picker without buttons"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="currentFrame[nameField]" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                    </v-flex>
                    <v-flex xs12 
                    v-else-if="(itemField.type === 'datetime' && itemField.onlyList === false) || (itemField.readonly === true && isCurrentActionEdit())">
                    
                            <v-text-field
                                slot="activator"
                                :label="itemField.caption"
                                v-model="currentFrame[nameField]"
                                append-icon="event"
                                readonly
                            >
                            </v-text-field>
                            
                            <!-- <v-date-picker v-model="currentFrame[nameField]" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.endDate.save(endDate)">OK</v-btn>
                            </v-date-picker> -->
                            <!-- <datetime v-model="currentFrame[nameField]" type="datetime" :label="itemField.caption"></datetime> -->
                    
                    </v-flex>
                    <v-flex xs12 
                    v-else-if="itemField.type === 'checkbox' && itemField.onlyList === false">
                        <v-switch
                        :label="itemField.caption"
                        v-model="currentFrame[nameField]"
                        ></v-switch>
                    </v-flex>

                    <v-flex d-none 
                    v-else-if="itemField.type === 'CHECK_SUM'">
                        <v-text-field 
                        v-model="currentFrame[nameField]"
                        type="hidden"
                    ></v-text-field>
                    </v-flex>

                    <!-- XXX: Check this logic -->
                    <v-flex xs12 
                    v-else-if="(itemField.onlyList === false && itemField.readonly === false) || (itemField.readonly === true && isCurrentActionEdit())">
                        <v-text-field 
                        v-model="currentFrame[nameField]" 
                        :label="itemField.caption" 
                        :mask="itemField.mask"
                        :placeholder="itemField.placeholder"
                        required
                        :readonly="itemField.readonly"
                    ></v-text-field>
                    <!---->
                    </v-flex>
                </template>
            </v-layout>
        </v-container>
        <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="basic.dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="save()">Save</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>
<script>
import StoreEditList from '@/components/store/StoreEditList';
import axios from "axios";
export default {
  components: {
    StoreEditList
  },
  name: 'store-basic-dialog',  
  props: {
    basic: {
        type: Object
    },
    frame: {
        type: Object
    },
    allFields: {
       type: Object 
    },
    actions: {
        type: Object
    }
  },
  data() {
      return {
        currentFrame: this.getEmptyBlankData(),
      }
  },
  methods: {
      openInsertForm(basic) {
          this.currentFrame = this.getEmptyBlankData();
          this.currentFrame.dialogName = basic.dialogName;
          this.currentFrame.action = basic.action;
      },
      getEmptyBlankData() {
        let fields = this.getFields();
        let currentFrame = {};

        for (var key in fields) {
            currentFrame[key] = null;
        }
        currentFrame.action = 'edit';
        return currentFrame
    },
    save() {
          console.log("SAVE!!!");
          
          let $this = this;
          if (this.isCurrentActionEdit()) {
            console.log('Edit');
            axios.post('http://api.v2.skimp.tk.local:8080/v1/shortener/'+this.currentFrame.activeID, this.currentFrame)
                .then((result) => {
                    console.log(result)
                    this.$nuxt.$emit('onSaveEditForm', this.currentFrame);
                });
          } else if (this.isCurrentActionInsert()) {
              console.log('Insert');
              axios.post('http://api.v2.skimp.tk.local:8080/v1/shortener/', this.currentFrame)
                .then((result) => {
                    console.log(result)
                    this.$nuxt.$emit('onSaveEditForm', this.currentFrame);
                });
          }
          
          
          console.log(this.currentFrame);
          //this.$refs.storeEditList.onSaveEditForm();
    },
    handleUpdate(item) {
        this.currentFrame = this.getEmptyBlankData();
        let fields = this.getFields();
        
        for (var key in fields) {
            //this.frame[key] = item[key];
           this.currentFrame[key] = item[key];
         // if (fields[key]['type'] === 'datetime') {

         // } 
         }
        this.currentFrame.activeID = item.id;


        this.currentFrame.dialogName = this.getDialogName(item);
        
        this.basic.dialog=true;
     },

    getDialogName(item) {
        let caption = this.getAction('edit').caption;
        
        caption = caption.replace("%id%", item.id);
        
        return caption;
    },

    getAction(key) {
        let actions = this.getActions();
        if (key in actions) {
           return actions[key];
        }
    },

    getFields: function() {
        return this.allFields;
    },

    getActions: function() {
        return this.actions;
    },

    isCurrentActionEdit() {
        return this.currentFrame.action === 'edit';
    },

    isCurrentActionInsert() {
        return this.currentFrame.action === 'insert';
    }
  },
  mounted() {
      this.$nuxt.$on('handleUpdateEditRootBasicDialog', () => {
        console.log("AAAA");
        console.log(this.frame.code)
        console.log(this.$refs.editList);
        //this.$refs.editList.update()
    });
    let $this = this;
      //Emit in Store Actions List
      this.$root.$on('handleUpdateEditRoot', function (item) {
          $this.handleUpdate(item);
      });
      
      
  }
};
</script>
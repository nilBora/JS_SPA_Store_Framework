<template>
    <v-flex xs12 
    v-if="itemField.type === 'image' && itemField.onlyList === false">
        <img :src="frame[nameField]" :alt="itemField.caption">
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
    
              <v-text-field
                slot="activator"
                :label="itemField.caption"
                v-model="frame[nameField]"
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
        :readonly="itemField.readonly"
    ></v-text-field><!---->
    </v-flex>
</template>
<script>
import { Datetime } from 'vue-datetime';

export default {
  components: {
    Datetime
  },
  name: 'store-edit-list',  
  props: {
    nameField: {
        type: String
    },
    itemField: {
        type: Object
    },
    frame: {
        type: Object
    },
    actions: {
        type: Object
    },
    basic: {
        type: Object
    },
    allFields: {
        type: Object
    }
  },
  data() {
      return {
        currentFrame: this.getEmptyBlankData(),
      }
  },
  computed: {
      
  },

  methods: { 
    getEmptyBlankData() {
        let fields = this.getFields();
        let currentFrame = {};

        for (var key in fields) {
            currentFrame[key] = null;
        }
       
        return currentFrame
    },
    handleUpdate(item) {
         let fields = this.getFields();
        
         for (var key in fields) {
            this.frame[key] = item[key];
            this.currentFrame[key] = item[key];
         // if (fields[key]['type'] === 'datetime') {

         // } 
         }
         this.frame.activeID = item.id;


         this.frame.dialogName = this.getDialogName(item);
        
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
  },
  events: {
        // onSaveEditForm: function() {
        //     console.log('ON SAVE StoreEditList');
        // }
  },
  mounted() {
      let $this = this;
      //Emit in Store Actions List
      this.$root.$on('handleUpdateEditRoot', function (item) {
          $this.handleUpdate(item);
      });
  }
};
</script>
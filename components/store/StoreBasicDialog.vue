 <template>
    <v-dialog v-model="basic.dialog" persistent max-width="500px">
    <v-card>
        <v-card-title>
        <span class="headline" v-model="frame.dialogName">{{ frame.dialogName }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
        <v-container grid-list-md>
            <v-layout wrap>
            <store-edit-list v-for="(item, name, key) in allFields" 
                            v-bind:itemField="item" 
                            v-bind:key="key" 
                            :nameField="name" 
                            v-bind:frame="frame"
                            :actions="actions"
                            v-bind:basic="basic"
                            :allFields="allFields"></store-edit-list>
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
</template>
<script>
import StoreEditList from '@/components/store/StoreEditList';
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
        type: Array
    },
    allFields: {
       type: Object 
    },
    actions: {
        type: Object
    }
  },
  data: () => ({
  }),
  methods: {
  }
};
</script>
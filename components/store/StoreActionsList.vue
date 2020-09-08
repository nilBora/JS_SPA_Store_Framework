<template>
    <v-btn @click="handleUpdateChild(dataFields.item)" v-if="nameField === 'edit'" depressed outline icon fab dark color="primary" small>
        <v-icon>edit</v-icon>
    </v-btn>

    <v-btn v-else-if="nameField === 'remove'" depressed outline icon fab dark color="pink" small @click="onRemove(dataFields.item.id)">
        <v-icon>delete</v-icon>
    </v-btn>
</template>

<script>
import axios from "axios";
export default {
  name: 'store-actions-list',  
  props: {
    nameField: {
        type: String
    },
    itemField: {
        type: Object
    },
    dataFields: {
        type: Object
    },
    actions: {
        type: Object
    },
    allFields: {
       type: Object 
    },
    frame: {
        type: Object
    },
    basic: {
        type: Object
    }
  },
  data: () => ({
  }),
  methods: {
      handleUpdateChild(item) {
          this.$root.$emit('handleUpdateEditRoot', item);
      },
      onRemove(id) {
          let resAnswer = confirm("Are You Sure Remove Row ID#"+id); //XXX: Add message with dgs
          if (resAnswer) {
              axios.delete(this.$store.state.dgs.baseUrl+'/'+id)
                .then((result) => {
                    console.log(result)
                    this.$destroy();
                    this.$el.parentElement.parentElement.remove();
                    //this.$el.parentNode.removeChild(this.$el);
                });
          }
      }
  },
//   mounted() {
//       this.$nuxt.$on('onSaveEditForm', (frame) => {
//           this.$forceUpdate();
//       });
//   }
};
</script>
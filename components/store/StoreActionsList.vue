<template>
    <v-btn @click="handleUpdateChild(dataFields.item)" v-if="nameField === 'edit'" depressed outline icon fab dark color="primary" small>
        <v-icon>edit</v-icon>
    </v-btn>

    <v-btn v-else-if="nameField === 'remove'" depressed outline icon fab dark color="pink" small>
        <v-icon>delete</v-icon>
    </v-btn>
</template>

<script>
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
          //Subscriber in StoreEditList
          this.$root.$emit('handleUpdateEditRoot', item);
          //this.$nuxt.$emit('handleUpdateEditRootBasicDialog', item);
      },
  },
//   mounted() {
//       this.$nuxt.$on('onSaveEditForm', (frame) => {
//           this.$forceUpdate();
//       });
//   }
};
</script>
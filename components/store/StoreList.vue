<template v-for="(item, name, key) in getAllFields()">
    <store-list-items 
        v-bind:itemField="item" 
        v-bind:key="key" 
        :nameField="name" 
        v-bind:dataFields="data">
    </store-list-items>
</template>

<script>
import StoreListItems from '@/components/store/StoreListItems';
export default {
  components: {
      StoreListItems
  },
  name: 'store-list',  
  props: {
    // nameField: {
    //     type: String
    // },
    // itemField: {
    //     type: Object
    // },
    data: {
        type: Object
    },
    allFields: {
        type: Object
    }
  },
  data: () => ({
      key: null,
      item: {},
      name: null
  }),
  methods: {
      getAllFields() {
          console.log("All Fields In Store List");
          console.log(this.allFields);
          return this.allFields;
      }
  }
};
</script>
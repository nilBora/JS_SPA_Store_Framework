<template>
    <td v-if="itemField.type === 'image'">
        <v-avatar size="32">
            <img :src="dataFields.item.avatar" alt="">
        </v-avatar>
    </td>
    <td v-else-if="itemField.type === 'checkbox'">
        <v-btn v-if="dataFields.item[nameField] === 1" flat icon color="green">
            <v-icon>check_circle</v-icon>
        </v-btn>
        <v-btn v-else="dataFields.item[nameField] === 0" flat icon color="grey">
            <v-icon>check_circle</v-icon>
        </v-btn>
    </td>
    <td v-else>{{ dataFields.item[nameField] }}</td>

</template>

<script>
export default {
  name: 'store-list',  
  props: {
    nameField: {
        type: String
    },
    itemField: {
        type: Object
    },
    dataFields: {
        type: Object
    }
  },
  data: () => ({
  }),
  methods: {

  }
};
</script>
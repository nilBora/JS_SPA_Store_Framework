
  const getFields = (struct) => {
    
    let fields = struct.fields;

    for (let key in fields) {
      if (!('placeholder' in fields[key])) {
        fields[key]['placeholder'] = '';
      }
      if (!('mask' in fields[key])) {
        fields[key]['mask'] = '';
      }
      if (!('readonly' in fields[key])) {
        fields[key]['readonly'] = false;
      }
      if (!('onlyList' in fields[key])) {
        fields[key]['onlyList'] = false;
      }
    }
    return fields;
  };

  const getActions = (struct) => {
    return struct.actions;
  };

  const getHeaders = (struct) => {
    //let dataStore = getData();
    //console.log(dataStore);
    let headers = [];
    let fields = struct.fields;
    
    for (var key in fields) {
      let item = [];
      item['text'] = fields[key]['caption'];
      item['value'] = fields[key]['name'];
     
      headers.push(item);
    }
    let item = [];
    item['text'] = 'Action';
    item['value'] = '';
    headers.push(item);

    return headers;
  };

  const getItems = (store) => {
    return store.items;
  };

  
  export {
    getFields,
    getActions,
    getHeaders,
    getItems
  };
  
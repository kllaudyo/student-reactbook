import Store from "./Store";

const CRUDActions = {
    create(newRecord){
        let data = Store.getData();
        data.unshift(newRecord);
        Store.setData(data);
    },
    delete(recordId){
        let data = Store.getData();
        data.splice(recordId,1);
        Store.setData(data);
    },
    updateRecord(recordId, newRecord){
        let data = Store.getData();
        data[recordId] = newRecord;
        Store.setData(data);
    },
    updateField(recordId, key, value){
        let data = Store.getData();
        data[recordId][key] = value;
        Store.setData(data);
    }
};

export default CRUDActions;
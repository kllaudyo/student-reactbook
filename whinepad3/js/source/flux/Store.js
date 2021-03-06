import {EventEmitter} from 'fbemitter';

let data;
let schema;
const emitter = new EventEmitter();

const CRUDStore = {
    init(initialSchema){
        schema = initialSchema;
        const storage = 'localStorage' in window
            ? localStorage.getItem('data')
            : null;
        if(!storage){
            data = [{}];
            schema.forEach(item => data[0][item.id] = item.sample);
        }else{
            data = JSON.parse(storage);
        }
    },
    getData(){
        return data;
    },
    getSchema(){
        return schema;
    },
    setData(newData, commit = true){
        data = newData;
        if(commit && 'localStorage' in window){
            localStorage.setItem('data', JSON.stringify(data));
        }
        emitter.emit('change');
    },
    addListener(eventType, cb){
        emitter.addListener(eventType, cb);
    },
    getCount(){
        return data.length;
    },
    getDataById(recordId){
      return recordId in data ? data[recordId] : null;
    }
};

export default CRUDStore;
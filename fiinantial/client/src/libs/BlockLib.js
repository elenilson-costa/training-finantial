
export default class BlockLib {

    constructor(objectName){
        this.objectName = objectName;
        this.objectBackup = {};
        this.objectConfigBackup = {};
        this.indexBackup = null;
    }

    recordsNav(callerState, direction){

        const indexName = this.getObjectIndexName(callerState);
        if (direction.toUpperCase() === 'NEXT'
            && this.getObjectList(callerState).length-1 > callerState[indexName]){

            callerState[indexName] = callerState[indexName]+1;

        }else if(direction.toUpperCase() === 'PREVIOUS' && callerState[indexName] > 0){

            callerState[indexName] = callerState[indexName]-1;

        }else if(direction.toUpperCase() === 'FIRST'){

            callerState[indexName] = 0;

        }else if(direction.toUpperCase() === 'LAST'){

            callerState[indexName] = this.getObjectList(callerState).length-1;

        }
        
        return this.renderValues(callerState);
    }

    renderValues(callerState){
        
        let object = callerState[this.getObjectName()];

        const objServer = this.getObjectList(callerState)[this.getObjectIndex(callerState)];
        const attribArray = Object.getOwnPropertyNames(objServer);
        for(let attribIndex in attribArray){
            const attribName = attribArray[attribIndex];
            object[attribName].value = objServer[attribName];
        }
        callerState[this.objectName] = object;

        return callerState;

    }

    objectIsClear(callerState){

        let object = callerState[this.getObjectName()];

        const attribArray = Object.getOwnPropertyNames(object);
        for(let attribIndex in attribArray){
            const attribName = attribArray[attribIndex];
            if (object[attribName].value !== ""){
                return false;
            }
        }

        return true;

    }

    getObjectIndex(callerState){
        const indexName = this.getObjectIndexName(callerState);
        return callerState[indexName];
    }

    setObjectIndex(callerState, value){
        const indexName = this.getObjectIndexName(callerState);
        callerState[indexName] = value;
        return callerState;
    }

    getObjectConfigName(){
        return this.getObjectName()+"Config";
    }

    getObjectConfig(callerState){
        const objectConfigName = this.getObjectConfigName();
        return callerState[objectConfigName];
    }

    setObjectConfig(callerState, objectConfig){
        const objectConfigName = this.getObjectConfigName();
        callerState[objectConfigName] = objectConfig;
        return callerState[objectConfigName];
    }

    getObjectIndexName(callerState){
        const objectConfig = this.getObjectConfigName();
        return callerState[objectConfig].index;
    }

    getObjectReadOnly(callerState){
        const objectConfig = this.getObjectConfigName();
        return callerState[objectConfig].readOnly;
    }

    getObjectListName(callerState){
        const objectConfig = this.getObjectConfigName();
        return callerState[objectConfig].arrayList;
    }

    getObjectList(callerState){
        const listName = this.getObjectListName(callerState);
        return callerState[listName];
    }

    getObjectName(){
        return this.objectName;
    }

    clear(callerState){

        const objectConfig = this.getObjectConfigName();
        const indexName = this.getObjectIndexName(callerState);
        this.objectBackup = Object.assign({}, callerState[this.getObjectName()]);
        this.objectConfigBackup = Object.assign({}, callerState[objectConfig]);
        this.indexBackup = this.getObjectIndex(callerState);
        callerState[indexName] = 0;
        callerState[objectConfig].changed = false;
        callerState[this.getObjectName()] = callerState[objectConfig].objectClean();

        return callerState;
    }

    returnObjectBackup(callerState){

        callerState[this.getObjectName()] = Object.assign({}, this.objectBackup);
        callerState[this.getObjectConfigName()] = Object.assign({}, this.objectConfigBackup);
        callerState = this.setObjectIndex(callerState, this.indexBackup);

        return callerState;
    }

    setObjectReadOnly(callerState, readOnly=true){

        let object = callerState[this.getObjectName()];

        const attribArray = Object.getOwnPropertyNames(object);
        for(let attribIndex in attribArray){
            const attribName = attribArray[attribIndex];
            object[attribName].readOnly = readOnly;
        }

        callerState[this.objectName] = object;

        return callerState;

    }

}
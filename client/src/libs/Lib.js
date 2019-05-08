export default class Lib{

    static toDataObject(object){

        let newObject = {};
        const attribArray = Object.getOwnPropertyNames(object);
        for(let attribIndex in attribArray){
            const attribName = attribArray[attribIndex];
            if (object[attribName].value === ""){
                newObject[attribName] = null;
            }else{
                newObject[attribName] = object[attribName].value;
            }
        }

        return newObject;

    }

    static getStringPart(text, part, separator){
        const parts = [];
        let separatorPos = 0;
        let textWork = text;
        while (textWork.length > 0) {
            separatorPos = textWork.indexOf(separator);
            if (separatorPos > -1)
                parts.push(textWork.slice(0, separatorPos));
            else{
                parts.push(textWork.slice(0));
                break;
            }
            textWork = textWork.slice(separatorPos+1);
        }
        return parts[part-1];

    }

    static isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                return false;
            }
        }
      
        return JSON.stringify(obj) === JSON.stringify({});
    }

    static initCap(str){
        str = str.split(" ");
    
        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
    
        return str.join(" ");
    }

    static isEquivalent(a, b) {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
    
        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length !== bProps.length) {
            return false;
        }
    
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
    
            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
    
        // If we made it this far, objects
        // are considered equivalent
        return true;
    }
}


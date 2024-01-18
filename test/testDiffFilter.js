const _ = require("lodash");

function diffFilter(data) {
    var filteredData;

    _.isArray(data) ? filteredData=[] : filteredData = {};
    
    for (const key in data) {
        if (_.isArray(data)){
            if (_.isString(data[key]) && data[key].startsWith('_pivot')) {
                filteredData.push(data[key]);
            }
      }else {
        if(_.isString(key) && key.startsWith('_pivot')){
    filteredData[key] = data[key];
        }
    }
    }
    return filteredData;
  }


const _pivot_element1 = "_pivot_tarun"; 
const _pivot_element2 = "_pivot_ram";
const _element3 = "_pivot_sujeets";
const _element4 = "_roshan";

const arrdata = [_pivot_element1, _pivot_element2, _element3, _element4];
const objdata = {
    _pivot_tarun: "hi",
    _pivot_ram: "hello",
    _pivot_sujeet: "hey",
    _roshan: "burr"
};
const filteredData = diffFilter(objdata);
console.log(filteredData);
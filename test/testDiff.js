const diff = require("microdiff").default;
const { diffieHellman } = require("crypto");
const _ = require("lodash");

function sortEntityData(data) {
	const aliasesPresent =
		data.aliasSet && _.isArray(data.aliasSet.aliases);
	if (aliasesPresent) {
		data.aliasSet.aliases = _.sortBy(data.aliasSet.aliases, 'id');
	}

	const identifiersPresent =
		data.identifierSet && _.isArray(data.identifierSet.identifiers);
	if (identifiersPresent) {
		data.identifierSet.identifiers = _.sortBy(
			data.identifierSet.identifiers, ['value', 'type.label']
		);
	}

	const relationshipsPresent = data.relationshipSet &&
		_.isArray(data.relationshipSet.relationships);
	if (relationshipsPresent) {
		data.relationshipSet.relationships = _.sortBy(
			data.relationshipSet.relationships, 'id'
		);
	}

	return data;
}

function diffFilter(data) {
	var filteredData;
	Array.isArray(data) ? filteredData = [] : filteredData = {};
	for (const key in data) {
		if (Array.isArray(data)) {
			if (_.isString(data[key]) && data[key].startsWith('_pivot')) {
				filteredData.push(data[key]);
			}
		} else {
			if (_.isString(key) && key.startsWith('_pivot')) {
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
const _element5 = "_pivot_Bhola";

const arrdata1 = [_pivot_element1, _pivot_element2, _element3, _element5];
const arrdata2 = [_pivot_element1, _pivot_element2, _element3, _element4];

const baseDataPromise = {
	_pivot_tarun: "hi",
	_pivot_ram: "hello",
	_pivot_sujeet: "hey",
	_roshan: "burr"
}

const otherDataPromise = {
	_pivot_key1: 'value1',
	_pivot_key2: 42,
	key3: ['item1', 'item2'],
	key4: { nestedKey: 'nestedValue' }
  };

const filteredOtherData = diffFilter(otherDataPromise);
const filteredBaseData = diffFilter(baseDataPromise);

const result = diff(
    filteredOtherData,
    filteredBaseData
  );

console.log(result);

// [{type: "CREATE", path: ["newProperty"], value: "new"}]
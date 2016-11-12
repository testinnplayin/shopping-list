'use strict';

var state = {
	items: []
};
var template = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);

// state functions

function processInput(state, item) {
	item === "" ? alert("No item entered") : state.items.push({ itemName : item, checkedStatus : false }); //{ itemName : "broccoli", checkedStatus : false }
	return state;
}

function deleteItem(state, index) {
		return state.splice(index, 1);
}

function getItem(state, itemId) {
	return state.items[itemId];
}

function updateItem(state, itemId, checkedState) {
	state.items[itemId] = checkedState;
	return state;
}

//display functions

function displayer(item, template, itemData, index) {
	var ele = $(template);

	ele.find('.js-shopping-item').text(item.itemName);

	if (checkedStatus) {
		ele.find('.js-shopping-item').addClass('shopping-item__checked');
	}
	ele.attr(itemData, index);
}

function displayItems(state, list, itemData) {
	var itemsDisplay = state.items.map(function(item, index) {
		return displayer(item, template, itemData, index);
	});

	list.html(itemsDisplay);
}

//action functions

function takeAction(e, itemData, input, list) {
	e.preventDefault();

	var userItem = input.val();

	processInput(state, userItem);
	displayItems(state, list, itemData);
}

//event handler functions

function handleSubmit(list, itemData, input) {
	var submitter = $('button[type="submit"]');

	submitter.click(function(e) {
		takeAction(e, itemData, input, list);
	});

	input.keydown(function(e) {
		var enterKey = 13;

		if (e.which === enterKey) {
			takeAction(e, itemData, input, list);
		}
	});
}

function handleCheck(list, itemData) {
	list.on('click', '.js-toggle', function() {
		var itemId = $($(this).closest('li')).attr(itemData);
		var currItem = getItem(state, itemId);

		updateItem(state, itemId, {
			itemName : item,
			checkedStatus : !currItem.checkedStatus
		});

		displayItems(state, list, itemData);
	});
}

function handleDelete(list, itemData) {
	list.on('click', 'js-delete', function() {
		var itemIndex = parseInt($(this).closest('li').attr(itemData));

		deleteItem(state, itemIndex);
		displayItems(state, list, itemData);
	});
}

function handleActions() {
	var list = $('.js-shopping-list');
	var input = $('#js-shopping-list-entry');
	var itemData = 'item-data';

	handleSubmit(list, itemData, input);
	handleCheck(list, itemData);
	handleDelete(list, itemData);
}

$(document).ready(handleActions);

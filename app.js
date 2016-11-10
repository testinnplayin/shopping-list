'use strict';

var state = {
	items: []
};

function processInput(state, item) {
	if (item === "") {
		alert("No item entered");
	}

	return state.items.push(item);
}

function displayItems(state, element) {
	var itemsDisplay = state.items.map(function(item) {
		return (
			"<li><span class='shopping-item'>" 
			+ item 
			+ "</span><div class='shopping-item-controls'><button class='shopping-item-toggle'><span class='button-label'>check</span></button><button class='shopping-item-delete'><span class='button-label'>delete</span></button></div></li>"
		);
	});
	element.html(itemsDisplay);

}

function handleSubmit() {
	$('.submit-btn').click(function(e) {
		e.preventDefault();

		var userItem = $('#shopping-list-entry').val();
		processInput(state, userItem);
		displayItems(state, $('.shopping-list'));
	});
}

$(document).ready(handleSubmit);
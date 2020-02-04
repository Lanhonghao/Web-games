Game.techUI = (function() {
	var instance = {};

	instance.techTable = null;
	instance.techTemplate = null;

	instance.initialise = function() {
		this.techTable = $('#techTable');
		this.techTemplate = Handlebars.compile([
			'<tr id="{{htmlId}}" class="hidden">',
			'<td>',
			'<h3 class="default btn-link" id="{{htmlIdTitle}}">{{name}}</h3>',
			'<span>',
			'{{desc}}',
			'<br>',
			'花费 <span id="{{htmlIdCost}}"></span> 科学',
			'</span>',
			'<br><br>',
			'<button id="{{htmlIdButton}}" onclick="purchaseTech(\'{{id}}\')" class="btn btn-default">',
			'{{buttonText}}',
			'</button>',
			'<br><br>',
			'</td>',
			'</tr>'
		].join('\n'));
	};

	instance.addTech = function(data) {
		var html = this.techTemplate(data);
		this.techTable.append(html);

		// all currently used techs cost only science
		var cost = Game.settings.format(data.cost['science']);
		data.getCostElement().text(cost);
	};

	instance.removeTech = function(data) {
		$('#' + data.htmlId).remove();
	};

	instance.replaceTech = function(data) {
		// remove the old row first
		this.removeTech(data);
		this.addTech(data);
	};

	return instance;
}());
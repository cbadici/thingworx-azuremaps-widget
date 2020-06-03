TW.IDE.Widgets.azuremap = function () {

	this.widgetIconUrl = function() {
		return  "'../Common/extensions/AzureMapsWidget/ui/azuremap/default_widget_icon.ide.png'";
	};

	this.widgetProperties = function () {
		return {
			'name': 'AzureMap',
			'description': 'Prototype Azure Maps widget implementation',
			'category': ['Common'],
			'supportsAutoResize': true,
			'properties': {
				'Data': {
					'baseType': 'INFOTABLE',
					'isBindingTarget': true
				},
				'LocationField': {
                    'description' : 'Field which will provide location information for markers/tracks',
                    'isBindingTarget': true,
                    'isVisible': true,
                    'isEditable': true,
                    'defaultValue': 'location',
                    'sourcePropertyName': 'Data',
                    'baseTypeRestriction': 'LOCATION',
                    'baseType': 'FIELDNAME'
                },
			}
		}
	};

	this.afterSetProperty = function (name, value) {
		var thisWidget = this;
		var refreshHtml = false;
		switch (name) {
			case 'Style':
			case 'AzureMap Property':
				//thisWidget.jqElement.find('.azuremap-property').text(value);
			case 'Alignment':
				//refreshHtml = true;
				break;
			default:
				break;
		}
		return refreshHtml;
	};

	this.renderHtml = function () {
		// return any HTML you want rendered for your widget
		// If you want it to change depending on properties that the user
		// has set, you can use this.getProperty(propertyName).
		return 	'<div class="widget-content widget-azuremap">' +
					'<span>AzureMaps Widget here</span>' +
				'</div>';
	};

	this.afterRender = function () {
		// NOTE: this.jqElement is the jquery reference to your html dom element
		// 		 that was returned in renderHtml()

		// get a reference to the value element
		//valueElem = this.jqElement.find('.azuremap-property');
		// update that DOM element based on the property value that the user set
		// in the mashup builder
		//valueElem.text(this.getProperty('AzureMap Property'));
	};

};
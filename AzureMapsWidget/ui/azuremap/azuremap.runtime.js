TW.Runtime.Widgets.azuremap = function() {
	var valueElem;
	var thisWidget = this;
	var map, mapdatasource;
	var autoZoom;
	function initializeAzureMap(widget) {
		//console.warn(widget);
		map = new atlas.Map(widget.jqElementId, {
			center: [-118.270293, 34.039737],

			view: 'Auto',
			showFeedbackLink: false,
			//Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
			authOptions: {
				authType: 'subscriptionKey',
				subscriptionKey: thisWidget.getProperty("SubscriptionKey")
			}
		});
		//console.warn(widget);

		//Store a reference to the Search Info Panel.
		//  resultsPanel = document.getElementById("results-panel");

		//Add key up event to the search box. 
		// searchInput = document.getElementById("search-input");
		// searchInput.addEventListener("keyup", searchInputKeyup);

		//Create a popup which we can reuse for each result.
		// popup = new atlas.Popup();

		//Wait until the map resources are ready.
		map.events.add('ready', function() {

			//Add the zoom control to the map.
			map.controls.add(new atlas.control.ZoomControl(), {
				position: 'top-right'
			});

			//Create a data source and add it to the map.
			if (!mapdatasource) mapdatasource = new atlas.source.DataSource();
			map.sources.add(mapdatasource);
			if (!widget.getProperty("Data")) {
				map.sources.add(mapdatasource);
				var arr_Points = [new atlas.data.Position(40, 40), new atlas.data.Position(50, 50), new atlas.data.Position(60, 60)];

				mapdatasource.add(new atlas.data.MultiPoint(arr_Points));

			}
			if (autoZoom == true) {
				map.setCamera({
					bounds: atlas.data.BoundingBox.fromData(mapdatasource.getShapes()),
					padding: 20
				});
			}

			//Add a layer for rendering the results.
			var searchLayer = new atlas.layer.SymbolLayer(mapdatasource, null, {
				iconOptions: {
					image: 'pin-round-darkblue',
					anchor: 'center',
					allowOverlap: true
				}
			});
			map.layers.add(searchLayer);

			//Add a click event to the search layer and show a popup when a result is clicked.
			// map.events.add("click", searchLayer, function (e) {
			//     //Make sure the event occurred on a shape feature.
			//     if (e.shapes && e.shapes.length > 0) {
			//         showPopup(e.shapes[0]);
			//     }
			//});
		});
		map.resize();
	}
	this.renderHtml = function() {
		// return any HTML you want rendered for your widget
		// If you want it to change depending on properties that the user
		// has set, you can use this.getProperty(propertyName). In
		// this example, we'll just return static HTML
		return '<div class="widget-content widget-azuremap">' +
			'</div>';
	};

	this.afterRender = function() {
		// NOTE: this.jqElement is the jquery reference to your html dom element
		// 		 that was returned in renderHtml()
		autoZoom = this.getProperty("AutoZoom");
		console.warn("Client height: " + thisWidget.jqElement[0].clientHeight + thisWidget.jqElement[0].clientWidth);
		initializeAzureMap(thisWidget);



		// get a reference to the value element
		//valueElem = this.jqElement.find('.azuremap-property');
		// update that DOM element based on the property value that the user set
		// in the mashup builder
		//valueElem.text(this.getProperty('AzureMap Property'));
	};

	// this is called on your widget anytime bound data changes
	this.updateProperty = function(updatePropertyInfo) {
		// TargetProperty tells you which of your bound properties changed
		if (updatePropertyInfo.TargetProperty === 'Data') {
			var dataRows = updatePropertyInfo.ActualDataRows;

			if (!mapdatasource) mapdatasource = new atlas.source.DataSource();
			
			mapdatasource.clear();
			var multipoint = new Array();
			let locationFieldName = this.getProperty("LocationField");
			for (var i = 0; i < dataRows.length; i++) {

				multipoint.push(new atlas.data.Position(dataRows[i][locationFieldName].latitude, dataRows[i][locationFieldName].longitude));

			}
			mapdatasource.add(new atlas.data.MultiPoint(multipoint));
			this.setProperty('Data', updatePropertyInfo.ActualDataRows);


		}
	};

	this.serviceInvoked = function(serviceName) {
		var widgetReference = this;
		if (serviceName === 'test') {
			// map.resize();
		}
	};

	this.resize = function(width, height) {

		map.resize();

	};


};
TW.Runtime.Widgets.azuremap= function () {
	var valueElem;
	var thisWidget = this;
	var map,datasource;
	function GetMap(widget) {
            //Initialize a map instance.
            map = new atlas.Map(widget.jqElementId, {
                center: [-118.270293, 34.039737],
                zoom: 14,
                view: 'Auto',

				//Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: 'n5RsOKs33qrZGM_byzXz6Ngo1EdOun5Zi7AYrevybBY'
                }
            });

            //Store a reference to the Search Info Panel.
          //  resultsPanel = document.getElementById("results-panel");

            //Add key up event to the search box. 
           // searchInput = document.getElementById("search-input");
           // searchInput.addEventListener("keyup", searchInputKeyup);

            //Create a popup which we can reuse for each result.
           // popup = new atlas.Popup();

            //Wait until the map resources are ready.
            map.events.add('ready', function () {

                //Add the zoom control to the map.
                map.controls.add(new atlas.control.ZoomControl(), {
                    position: 'top-right'
                });

                //Create a data source and add it to the map.
                datasource = new atlas.source.DataSource();
                map.sources.add(datasource);
				if (this.getProperty("Data").ActualDataRows)
				{
				datasource.add(new atlas.data.MultiPoint([new atlas.data.Position(40,40),new atlas.data.Position(50,50), new atlas.data.Position(60,60)]));
				}
				
                //Add a layer for rendering the results.
                var searchLayer = new atlas.layer.SymbolLayer(datasource, null, {
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
        }
	this.renderHtml = function () {
		// return any HTML you want rendered for your widget
		// If you want it to change depending on properties that the user
		// has set, you can use this.getProperty(propertyName). In
		// this example, we'll just return static HTML
		return 	'<div class="widget-content widget-azuremap">' +
				'</div>';
	};

	this.afterRender = function () {
		// NOTE: this.jqElement is the jquery reference to your html dom element
		// 		 that was returned in renderHtml()
		GetMap(this);
		
		// get a reference to the value element
		//valueElem = this.jqElement.find('.azuremap-property');
		// update that DOM element based on the property value that the user set
		// in the mashup builder
		//valueElem.text(this.getProperty('AzureMap Property'));
	};

	// this is called on your widget anytime bound data changes
	this.updateProperty = function (updatePropertyInfo) {
		// TargetProperty tells you which of your bound properties changed
		if (updatePropertyInfo.TargetProperty === 'Data') {
			var dataRows = updatePropertyInfo.ActualDataRows;
			if (datasource)
			{datasource.clear();
			datasource.add(new atlas.data.MultiPoint([new atlas.data.Position(40,40),new atlas.data.Position(50,50), new atlas.data.Position(60,60)]));
			//this.setProperty('AzureMap Property', updatePropertyInfo.SinglePropertyValue);
			}
			
		}
	};
	
	
};
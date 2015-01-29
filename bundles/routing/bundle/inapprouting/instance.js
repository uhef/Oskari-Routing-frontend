/**
 * This bundle logs the map click coordinates to the console. This is a demonstration of using DefaultExtension.
 *
 * @class Oskari.routing.bundle.inapprouting.InAppRoutingBundleInstance
 */
Oskari.clazz.define('Oskari.routing.bundle.inapprouting.InAppRoutingBundleInstance',
  /**
   * @method create called automatically on construction
   * @static
   */
  function () {
    this.endpoints = [];
  }, {
    /**
     * @static
     * @property __name
     */
    __name : 'inapprouting',
    /**
     * Module protocol method
     *
     * @method getName
     */
    getName : function () {
      return this.__name;
    },
    eventHandlers: {
      'MapClickedEvent': function (event) {
        console.log('Map clicked at ' + event.getLonLat());
        this.endpoints.push(event.getLonLat());
        if (this.endpoints.length === 2) {
          var startPoint = {
            lon: this.endpoints[0].lon,
            lat: this.endpoints[0].lat
          };
          var endPoint = {
            lon: this.endpoints[1].lon,
            lat: this.endpoints[1].lat
          };
          this.endpoints = [];
          var sandbox = Oskari.getSandbox();
          var url = sandbox.getAjaxUrl() + 'action_route=CalculateRoute';
          jQuery.ajax({
            dataType: 'json',
            url: url,
            context: this,
            data: {
              startLon: startPoint.lon,
              startLat: startPoint.lat,
              endLon: endPoint.lon,
              endLat: endPoint.lat
            },
            success: function (data) {
              var map = this.sandbox._modulesByName.MainMapModule.getMap();
              var geoJSON = new OpenLayers.Format.GeoJSON();
              var styleMap = new OpenLayers.StyleMap({strokeWidth: 16, stokeColor: '#000000'});
              var layer = new OpenLayers.Layer.Vector("routing", {styleMap: styleMap});
              map.addLayer(layer);
              layer.addFeatures(geoJSON.read(data));
            }
          });
        }
      }
    },
    /**
     * DefaultExtension method for doing stuff after the bundle has started.
     *
     * @method afterStart
     */
    afterStart: function (sandbox) {
      console.log('Bundle', this.getName(), 'started');
    }
  }, {
    "extend" : ["Oskari.userinterface.extension.DefaultExtension"]
  });
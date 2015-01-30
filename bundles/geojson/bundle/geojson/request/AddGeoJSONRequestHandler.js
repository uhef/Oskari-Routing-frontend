Oskari.clazz.define("Oskari.geojson.bundle.geojson.request.AddGeoJSONRequestHandler",
  function (plugin) {
    this.geoJsonPlugin = plugin;
  }, {
    handleRequest: function (core, request) {
      console.log('AddGeoJSONRequestHandler::handleRequest called');
      this.geoJsonPlugin.addGeoJSON(request.getGeoJSONData());
    }
  }, {
    protocol: ['Oskari.mapframework.core.RequestHandler']
  });

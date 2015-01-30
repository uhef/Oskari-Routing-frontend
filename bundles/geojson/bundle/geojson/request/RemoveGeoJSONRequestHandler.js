Oskari.clazz.define("Oskari.geojson.bundle.geojson.request.RemoveGeoJSONRequestHandler",
  function (plugin) {
    this.geoJsonPlugin = plugin;
  }, {
    handleRequest: function (core, request) {
      console.log('RemoveGeoJSONRequestHandler::handleRequest called');
      this.geoJsonPlugin.removeGeoJSON(request.getGroupId());
    }
  }, {
    protocol: ['Oskari.mapframework.core.RequestHandler']
  });

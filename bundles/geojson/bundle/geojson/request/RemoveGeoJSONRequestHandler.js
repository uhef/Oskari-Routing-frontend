Oskari.clazz.define("Oskari.geojson.bundle.geojson.request.RemoveGeoJSONRequestHandler",
  function (plugin) {
    this.geoJsonPlugin = plugin;
  }, {
    handleRequest: function (core, request) {
      this.geoJsonPlugin.removeGeoJSON(request.getGroupId());
    }
  }, {
    protocol: ['Oskari.mapframework.core.RequestHandler']
  });

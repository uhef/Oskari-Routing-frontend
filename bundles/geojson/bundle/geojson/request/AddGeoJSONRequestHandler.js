Oskari.clazz.define("Oskari.geojson.bundle.geojson.request.AddGeoJSONRequestHandler",
  function (plugin) {
    this.geoJsonPlugin = plugin;
  }, {
    handleRequest: function (core, request) {
      this.geoJsonPlugin.addGeoJSON(request.getGeoJSONData(), request.getGroupId());
    }
  }, {
    protocol: ['Oskari.mapframework.core.RequestHandler']
  });

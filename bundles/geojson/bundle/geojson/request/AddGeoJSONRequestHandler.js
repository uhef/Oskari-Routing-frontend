Oskari.clazz.define("Oskari.geojson.bundle.geojson.request.AddGeoJSONRequestHandler",
  function (plugin) {
    this.plugin = plugin;
  }, {
    handleRequest: function (core, request) {
      console.log('AddGeoJSONRequestHandler::handleRequest called');
    }
  }, {
    protocol: ['Oskari.mapframework.core.RequestHandler']
  });

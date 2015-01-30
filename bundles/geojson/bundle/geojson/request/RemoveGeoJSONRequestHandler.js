Oskari.clazz.define("Oskari.geojson.bundle.geojson.request.RemoveGeoJSONRequestHandler",
  function (plugin) {
    this.plugin = plugin;
  }, {
    handleRequest: function (core, request) {
      console.log('RemoveGeoJSONRequestHandler::handleRequest called');
    }
  }, {
    protocol: ['Oskari.mapframework.core.RequestHandler']
  });

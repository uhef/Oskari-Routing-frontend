Oskari.clazz.define('Oskari.geojson.bundle.geojson.request.AddGeoJSONRequest',
  function (geoJsonData) {
    this._geoJsonData = geoJsonData;
  }, {
    __name: 'GeoJSONPlugin.AddGeoJSONRequest',
    getName: function () {
      return this.__name;
    },
    getGeoJSONData: function () {
      return this._geoJsonData;
    }
  }, {
    'protocol': ['Oskari.mapframework.request.Request']
  });
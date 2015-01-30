Oskari.clazz.define('Oskari.geojson.bundle.geojson.request.AddGeoJSONRequest',
  function (geoJsonData, groupId) {
    this._geoJsonData = geoJsonData;
    this._groupId = groupId;
  }, {
    __name: 'GeoJSONPlugin.AddGeoJSONRequest',
    getName: function () {
      return this.__name;
    },
    getGeoJSONData: function () {
      return this._geoJsonData;
    },
    getGroupId: function () {
      return this._groupId;
    }
  }, {
    'protocol': ['Oskari.mapframework.request.Request']
  });
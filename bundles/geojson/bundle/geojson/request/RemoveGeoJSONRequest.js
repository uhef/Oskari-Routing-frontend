Oskari.clazz.define('Oskari.geojson.bundle.geojson.request.RemoveGeoJSONRequest',
  function (groupId) {
    this._groupId = groupId;
  }, {
    __name: 'GeoJSONPlugin.RemoveGeoJSONRequest',
    getName: function () {
      return this.__name;
    },
    getGroupId: function () {
      return this._groupId;
    }
  }, {
    'protocol': ['Oskari.mapframework.request.Request']
  });
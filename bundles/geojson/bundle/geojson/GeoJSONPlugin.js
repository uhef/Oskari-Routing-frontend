Oskari.clazz.define('Oskari.geojson.bundle.geojson.GeoJSONPlugin',
  function (conf, state) {
    var me = this;
    me._clazz = 'Oskari.geojson.bundle.geojson.GeoJSONPlugin';
    me._name = 'MarkersPlugin';
    me.state = state;
  }, {
    hasUI: function () {
      return true;
    },
    _createEventHandlers: function () {
      var me = this;

      return {
        AfterRearrangeSelectedMapLayerEvent: function (event) {
          me.raiseLayer();
        }
      };
    },
    _createRequestHandlers: function () {
      var me = this;
      return {
        'GeoJSONPlugin.AddGeoJSONRequest': Oskari.clazz.create(
          'Oskari.geojson.bundle.geojson.request.AddGeoJSONRequestHandler',
          me
        ),
        'GeoJSONPlugin.RemoveGeoJSONRequest': Oskari.clazz.create(
          'Oskari.geojson.bundle.geojson.request.RemoveGeoJSONRequestHandler',
          me
        )
      };
    },
    register: function () {
      this.getMapModule().setLayerPlugin('geojson', this);
    },
    unregister: function () {
      this.getMapModule().setLayerPlugin('geojson', null);
    },
    _startPluginImpl: function () {
      var me = this;
      me._createGeoJSONLayer();
    },
    _createGeoJSONLayer: function () {
      var styleMap = new OpenLayers.StyleMap({strokeWidth: 16, stokeColor: '#000000'});
      var layer = new OpenLayers.Layer.Vector('GeoJSON', {styleMap: styleMap});
      this.getMap().addLayer(layer);
      this.raiseLayer(layer);
    },
    addMapLayerToMap: function () {
      var me = this;
      return function () {
        me.raiseLayer();
      };
    },
    raiseLayer: function (geoJSONLayer) {
      var index,
        layer = null;
      if (typeof geoJSONLayer !== 'undefined') {
        layer = geoJSONLayer;
      } else {
        layer = this._map.getLayersByName('GeoJSON')[0];
      }
      index = Math.max(
        this._map.Z_INDEX_BASE.Feature,
        layer.getZIndex()
      ) + 1;
      layer.setZIndex(index);
      layer.setVisibility(true);
    },
    getState: function () {},
    getOLMapLayers: function () {
      return null;
    },
    addGeoJSON: function(data, groupId) {
      var layer = this.getMap().getLayersByName('GeoJSON')[0];
      var geoJSON = new OpenLayers.Format.GeoJSON();
      var features = geoJSON.read(data);
      var featuresWithGroupId = _.map(features, function(feature) {
        feature.attributes['groupId'] = groupId;
        return feature;
      });
      layer.addFeatures(featuresWithGroupId);
      this.raiseLayer(layer);
    },
    removeGeoJSON: function(groupId) {
      var layer = this.getMap().getLayersByName('GeoJSON')[0];
      if(layer) {
        var features = layer.getFeaturesByAttribute('groupId', groupId);
        if (features && !_.isEmpty(features)) {
          layer.removeFeatures(features);
        }
      }
    }
  }, {
    'extend': ['Oskari.mapping.mapmodule.plugin.AbstractMapModulePlugin'],
    'protocol': [
      'Oskari.mapframework.module.Module',
      'Oskari.mapframework.ui.module.common.mapmodule.Plugin'
    ]
  }
);

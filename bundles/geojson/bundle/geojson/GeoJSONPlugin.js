Oskari.clazz.define('Oskari.geojson.bundle.geojson.GeoJSONPlugin',
  function (conf, state) {
    console.log('constructor called');
    var me = this;
    me._clazz = 'Oskari.geojson.bundle.geojson.GeoJSONPlugin';
    me._name = 'MarkersPlugin';

    me.state = state;
    me.dotForm = null;
    me._markers = [];
    me._svg = false;
    me._defaultIconUrl = '/Oskari/resources/framework/bundle/mapmodule-plugin/images/marker.png';
    me._defaultIconUrlSize = 32;
    me._prevIconUrl = '';
    me._preSVGIconUrl = 'data:image/svg+xml;base64,';
    me._font = {
      name: 'dot-markers',
      baseIndex: 57344
    };
    me._defaultData = {
      x: 0,
      y: 0,
      color: 'ffde00',
      msg: '',
      shape: 2,
      size: 1
    };
    me._strokeStyle = {
      'stroke-width': 1,
      'stroke': '#b4b4b4'
    };
    me.buttonGroup = 'selectiontools';
    me.buttons = null;
    me.dialog = null;
    me._buttonsAdded = false;

    // Show the marker button
    me._markerButton = true;
    if ((conf) && (typeof conf.markerButton === "boolean")) {
      me._markerButton = conf.markerButton;
    }
  }, {
    hasUI: function () {
      console.log('hasUI called');
      return true;
    },
    _createEventHandlers: function () {
      console.log('_createEventHandlers called');
      var me = this;

      return {
        AfterRearrangeSelectedMapLayerEvent: function (event) {
          me.raiseLayer();
        }
      };
    },
    _createRequestHandlers: function () {
      console.log('_createRequestHandlers called');
      var me = this,
        sandbox = me.getSandbox();
      return {
        'GeoJSONPlugin.AddGeoJSONRequest': Oskari.clazz.create(
          'Oskari.geojson.bundle.geojson.request.AddGeoJSONRequestHandler',
          sandbox,
          me
        ),
        'GeoJSONPlugin.RemoveGeoJSONRequest': Oskari.clazz.create(
          'Oskari.geojson.bundle.geojson.request.RemoveGeoJSONRequestHandler',
          sandbox,
          me
        )
      };
    },
    register: function () {
      console.log('register called');
      this.getMapModule().setLayerPlugin('geojson', this);
    },
    unregister: function () {
      console.log('unregister called');
      this.getMapModule().setLayerPlugin('geojson', null);
    },
    _startPluginImpl: function () {
      console.log('_startPluginImp called');
      var me = this,
        p;

      me._createGeoJSONLayer();

      // Creates markers on the map
      me.setState(this.state);
    },
    _createGeoJSONLayer: function () {
      console.log('_createGeoJSONLayer called');
      var layer = new OpenLayers.Layer.Vector('GeoJSON');
      this.getMap().addLayer(layer);
      this.raiseLayer(layer);
    },
    addMapLayerToMap: function () {
      console.log('addMapLayerToMap called');
      var me = this;
      return function () {
        me.raiseLayer();
      };
    },
    removeMarkers: function (noEvent) {
      console.log('removeMarkers called');
    },
    getMapMarkerBounds: function () {
      console.log('getMapMarkerBounds called');
    },
    stopMarkerAdd: function () {
      console.log('stopMarkerAdd called');
    },
    addMapMarkers: function (markers) {
      console.log('add map markers called');
    },
    addMapMarker: function (markerData, id, events, noEvent) {
      console.log('addMapMarker called');
    },
    constructImage: function (marker) {
      console.log('constructImage called');
    },
    raiseLayer: function (geoJSONLayer) {
      console.log('raiseLayer called');
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
    raiseMarkerLayer: function (layer) {
      console.log('raiseMarkerLayer called with ', layer);
    },
    hexToRgb: function (hex) {
      console.log('hexToRgb called');
    },
    rgbToHex: function (rgb) {
      console.log('rgbToHex called');
    },
    enableGfi: function (blnEnable) {
      console.log('enableGfi called');
    },
    getLocalization: function (key) {
      console.log('getLocalization called');
      if (key) {
        return this._loc[key];
      }
      return this._loc;
    },
    setState: function (state) {
      console.log('setState called');
    },
    getStateParameters: function () {
      console.log('getStateParameters called');
    },
    getState: function () {
      console.log('getState called');
    },
    updateState: function () {
      console.log('updateState called');
    },
    getFont: function () {
      console.log('getFont called');
    },
    getIcon: function () {
      console.log('getIcon called');
    },
    getOLMapLayers: function (layer) {
      console.log('getOLMapLayers called');
      return null;
    }
  }, {
    'extend': ['Oskari.mapping.mapmodule.plugin.AbstractMapModulePlugin'],
    'protocol': [
      'Oskari.mapframework.module.Module',
      'Oskari.mapframework.ui.module.common.mapmodule.Plugin'
    ]
  }
);

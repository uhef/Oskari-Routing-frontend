/**
 * This bundle logs the map click coordinates to the console. This is a demonstration of using DefaultExtension.
 *
 * @class Oskari.routing.bundle.inapprouting.InAppRoutingBundleInstance
 */
Oskari.clazz.define('Oskari.routing.bundle.inapprouting.InAppRoutingBundleInstance',
  /**
   * @method create called automatically on construction
   * @static
   */
  function () {
    this.sandbox = null;
    this.endpoints = [];
    this.plugins = {};
    this.localization = null;
    this.started = false;
    this.layer = null;
  }, {
    __name: 'inapprouting',
    getName: function () { return this.__name; },
    setSandbox: function (sandbox) { this.sandbox = sandbox; },
    getSandbox: function () { return this.sandbox; },
    getLocalization: function (key) {
      if (!this.localization) {
        this.localization = Oskari.getLocalization(this.getName());
      }
      if (key && this.localization[key]) {
        return this.localization[key];
      }
      return null;
    },
    "start": function () {
      var me = this;

      if (me.started) {
        return;
      }

      me.started = true;

      var conf = this.conf,
        sandboxName = (conf ? conf.sandbox : null) || 'sandbox',
        sandbox = Oskari.getSandbox(sandboxName);

      me.sandbox = sandbox;

      this.localization = Oskari.getLocalization(this.getName());

      sandbox.register(me);
      var p;
      for (p in me.eventHandlers) {
        if (me.eventHandlers.hasOwnProperty(p)) {
          sandbox.registerForEventByName(me, p);
        }
      }

      var map = sandbox._modulesByName.MainMapModule.getMap();
      var styleMap = new OpenLayers.StyleMap({strokeWidth: 16, stokeColor: '#000000'});
      this.layer = new OpenLayers.Layer.Vector("inapprouting", {styleMap: styleMap});
      map.addLayer(this.layer);

      //Let's extend UI
      var reqName = 'userinterface.AddExtensionRequest',
        reqBuilder = sandbox.getRequestBuilder(reqName),
        request = reqBuilder(this);
      sandbox.request(this, request);

      // draw ui
      me.createUi();
    },
    "init": function () { return null; },
    "update": function () { },
    onEvent: function (event) {
      var handler = this.eventHandlers[event.getName()];
      if (!handler) { return; }
      return handler.apply(this, [event]);
    },
    eventHandlers: {
      'MapClickedEvent': function (event) {
        if (this.plugins['Oskari.userinterface.Tile'] && this.plugins['Oskari.userinterface.Tile'].isEnabled()) {
          this.endpoints.push(event.getLonLat());
          if (this.endpoints.length === 2) {
            var startPoint = {
              lon: this.endpoints[0].lon,
              lat: this.endpoints[0].lat
            };
            var endPoint = {
              lon: this.endpoints[1].lon,
              lat: this.endpoints[1].lat
            };
            this.endpoints = [];
            var sandbox = Oskari.getSandbox();
            var url = sandbox.getAjaxUrl() + 'action_route=CalculateRoute';
            jQuery.ajax({
              dataType: 'json',
              url: url,
              context: this,
              data: {
                startLon: startPoint.lon,
                startLat: startPoint.lat,
                endLon: endPoint.lon,
                endLat: endPoint.lat
              },
              success: function (data) {
                var geoJSON = new OpenLayers.Format.GeoJSON();
                this.layer.removeAllFeatures();
                this.layer.addFeatures(geoJSON.read(data));
              }
            });
          }
        }
      }
    },
    "stop": function () {
      var sandbox = this.sandbox(),
        p;
      for (p in this.eventHandlers) {
        if (this.eventHandlers.hasOwnProperty(p)) {
          sandbox.unregisterFromEventByName(this, p);
        }
      }

      var reqName = 'userinterface.RemoveExtensionRequest',
        reqBuilder = sandbox.getRequestBuilder(reqName),
        request = reqBuilder(this);

      sandbox.request(this, request);

      this.sandbox.unregister(this);
      this.started = false;
    },
    startExtension: function () {
      this.plugins['Oskari.userinterface.Flyout'] =
        Oskari.clazz.create('Oskari.routing.bundle.inapprouting.Flyout',
          this);
      this.plugins['Oskari.userinterface.Tile'] =
        Oskari.clazz.create('Oskari.routing.bundle.inapprouting.Tile',
          this);
    },
    stopExtension: function () {
      this.plugins['Oskari.userinterface.Flyout'] = null;
      this.plugins['Oskari.userinterface.Tile'] = null;
    },
    getPlugins: function () { return this.plugins; },
    getTitle: function () { return this.getLocalization('title'); },
    getDescription: function () { return this.getLocalization('desc'); },
    createUi: function () {
      this.plugins['Oskari.userinterface.Flyout'].createUi();
      this.plugins['Oskari.userinterface.Tile'].refresh();
    },
    setState: function (state) {
      console.log('inapprouting.instance.setState called with ', state);
    },
    getState: function () {
      console.log('inapprouting.instance.getState called');
    },
    afterStart: function (sandbox) {
      console.log('Bundle', this.getName(), 'started');
    }
  }, {
    "protocol": [
      'Oskari.bundle.BundleInstance',
      'Oskari.mapframework.module.Module',
      'Oskari.userinterface.Extension'
    ]
  });
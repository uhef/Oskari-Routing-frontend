/*
 * @class Oskari.mapframework.bundle.search.Tile
 *
 * Renders the "search" tile.
 */
Oskari.clazz
  .define('Oskari.routing.bundle.inapprouting.Tile',
  function (instance) {
      this.instance = instance;
      this.container = null;
      this.template = null;
  }, {
      getName: function () {
          return 'Oskari.routing.bundle.inapprouting.Tile';
      },
      setEl: function (el, width, height) {
          this.container = jQuery(el);
      },
      startPlugin: function () {
          this.refresh();
      },
      stopPlugin: function () {
          this.container.empty();
      },
      getTitle: function () {
          return this.instance.getLocalization('title');
      },
      getDescription: function () {
          return this.instance.getLocalization('desc');
      },
      getOptions: function () {

      },
      setState: function (state) {
      },
      refresh: function () {
          var me = this;
          var instance = me.instance;
          var cel = this.container;
          var tpl = this.template;
          var sandbox = instance.getSandbox();
          // var status = cel.children('.oskari-tile-status');
          var idEl = cel.children('.oskari-tile-title');
          idEl.attr("id", 'oskari_inapprouting_tile_title');
          //        status.empty();
          //        status.append('(' + layers.length + ')');

      }
  }, {
     'protocol': ['Oskari.userinterface.Tile']
  });
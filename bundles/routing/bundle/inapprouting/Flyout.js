Oskari.clazz.define('Oskari.routing.bundle.inapprouting.Flyout',
    function (instance) {
        this.instance = instance;
        this.container = null;
        this.template = null;
        this._searchContainer = null;
    }, {
      getName: function () { return 'Oskari.routing.bundle.inapprouting.Flyout'; },
      setEl: function (el) {
          this.container = el[0];
          if (!jQuery(this.container).hasClass('inapprouting')) {
              jQuery(this.container).addClass('inapprouting');
          }
      },
      startPlugin: function () {
          this.template = jQuery('<div class="inapproutingContainer">' +
          '<div class="description"></div>' +
          '<input type="radio" name="algorithm" value="astar" checked>A-Star</input>' +
          '<br/>' +
          '<input type="radio" name="algorithm" value="pgr-astar">pgRouting A-Star</input>' +
          '</div>');
      },
      stopPlugin: function () { },
      getTitle: function () {
          return this.instance.getLocalization('title');
      },
      getTabTitle: function () { },
      getOptions: function () { },
      setState: function (state) { },
      getState: function () { },
      createUi: function () {
          var me = this,
            flyout = jQuery(me.container);
          flyout.empty();

          var searchContainer = me.template.clone();
          me._searchContainer = searchContainer;

          var searchDescription = searchContainer.find('div.description');
          searchDescription.html(me.instance.getLocalization('description'));

          flyout.append(searchContainer);
      },
      addTab: function (item) { },
      getAlgorithm: function() {
        return jQuery('.inapproutingContainer input[name=algorithm]:checked').val();
      }
    }, {
       'protocol': ['Oskari.userinterface.Flyout']
    });

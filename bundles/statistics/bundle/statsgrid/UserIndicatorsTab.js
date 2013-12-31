/**
 * @class Oskari.statistics.bundle.statsgrid.UserIndicatorsTab
 * Renders the tab displaying user's own indicators and allowing them to create new ones.
 */
Oskari.clazz.define('Oskari.statistics.bundle.statsgrid.UserIndicatorsTab',
/**
 * @method create called automatically on construction
 * @static
 * @param {Oskari.statistics.bundle.statsgrid.StatsGridBundleInstance} instance
 * 		reference to the statsgrid instance
 * @param {Object} localization
 *      instance's localization
 */
function(instance, localization) {
    this.instance = instance;
    this.loc = localization;
    this.visibleFields = ['name', 'description', 'delete'];
    this.grid = null;
    this.container = null;
    this.template = jQuery(
        '<div class="userIndicatorsList">' +
            '<div class="indicatorsGrid"></div>' +
            //'<button id="createNewIndicator">' + this.loc.newIndicator + '</button>' +
        '</div>'
    );

    // init
    this.init();
}, {
    /**
     * @method getName
     * @return {String} name of the component
     * (needed because we fake to be module for listening to
     * events (getName and onEvent methods are needed for this))
     */
    getName : function() {
        return 'StatsGrid.UserIndicatorsTab';
    },

    getTitle : function() {
        return this.loc.title;
    },

    getContent : function() {
        return this.container;
    },
    /**
     * @property {Object} eventHandlers
     * @static
     */
    eventHandlers : {},
    /**
     * Binds event handlers, sets the container and
     * fetches the user created indicators.
     *
     * @method init
     * @return {undefined}
     */
    init: function() {
        var me = this;

        this.bindEvents();
        this.container = this.template.clone();
        // Bind the "Add new indicator" button to show the form
        //this._bindAddNewIndicator(this.container);
        // Retrieve the indicators from the service
        var service = this.instance.getUserIndicatorsService();
        service.getUserIndicators(function(indicators) {
            // success!
            me._renderIndicators(indicators);
        }, function() {
            // error :(
            me.showMessage(me.loc.error.title, me.loc.error.indicatorsError);
        });
    },
    /**
     * Requests to add the tab to personal data.
     *
     * @method _requestToAddTab
     * @return {undefined}
     */
    _requestToAddTab: function() {
        var title =  this.getTitle(),
            content = this.getContent(),
            sandbox = this.instance.getSandbox(),
            reqBuilder = sandbox.getRequestBuilder('PersonalData.AddTabRequest'),
            req;

        if (reqBuilder) {
            req = reqBuilder(title, content);
            sandbox.request(this.instance, req);
        }
    },
    /**
     * Creates the grid to show the user's indicators.
     *
     * @method _createUserIndicatorsGrid
     * @param {Oskari.userinterface.component.GridModel} model
     * @return {Oskari.userinterface.component.Grid}
     */
    _createUserIndicatorsGrid: function(model) {
        var me = this,
            grid = Oskari.clazz.create('Oskari.userinterface.component.Grid');

        grid.setVisibleFields(this.visibleFields);
        grid.setDataModel(model);

        grid.setColumnValueRenderer('name', function(name, data) {
            return jQuery('<div class="indicator-name-link"></div>').html(name).
                click(function() {
                    me._showUserIndicator(data.id);
                });
        });

        grid.setColumnValueRenderer('delete', function(name, data) {
            return jQuery('<div class="indicator-name-link"></div>').html(me.loc.destroyIndicator).
                click(function() {
                    me._displayDeleteConfirmation(data);
                });
        });

        _.each(this.visibleFields, function(field) {
            grid.setColumnUIName(field, me.loc.grid[field]);
        });

        return grid;
    },
    /**
     * Renders the indicators to the model and creates the grid to hold them.
     *
     * @method _renderIndicators
     * @param  {Array[Object]} indicators
     * @return {undefined}
     */
    _renderIndicators: function(indicators) {
        var me = this,
            lang = Oskari.getLang(),
            gridModel = Oskari.clazz.create('Oskari.userinterface.component.GridModel');

        gridModel.setIdField('id');

        _.each(indicators, function(indicator) {
            gridModel.addData({
                'id': indicator.id,
                'name': indicator.title[lang],
                'description': indicator.description[lang]
            });
        });

        this.grid = this._createUserIndicatorsGrid(gridModel);
        this.grid.renderTo(this.container.find('div.indicatorsGrid'));
        this._requestToAddTab();
    },
    /**
     * Retrieves the indicator through the service.
     *
     * @method _showUserIndicator
     * @param  {Number} indicatorId
     * @return {undefined}
     */
    _showUserIndicator: function(indicatorId) {
        var me = this,
            instance = this.instance;
            service = instance.getUserIndicatorsService();

        service.getUserIndicator(indicatorId, function(indicator) {
            instance.addUserIndicator(me._normalizeIndicator(indicator));
        }, function() {
            // error :(
            me.showMessage(me.loc.error.title, me.loc.error.indicatorError);
        });
    },
    /**
     * Displays a confirmation dialog to delete an indicator.
     * OK button sends the request.
     *
     * @method _displayDeleteConfirmation
     * @param  {Object} indicator
     * @return {undefined}
     */
    _displayDeleteConfirmation: function(indicator) {
        var me = this,
            dialog = Oskari.clazz.create('Oskari.userinterface.component.Popup'),
            okBtn = Oskari.clazz.create('Oskari.userinterface.component.Button'),
            cancelBtn = dialog.createCloseButton(me.loc.cancelDelete),
            title = me.loc.deleteTitle,
            content = me.loc.confirmDelete + indicator.name;

        okBtn.setTitle(me.loc.destroyIndicator);
        okBtn.addClass('primary');

        okBtn.setHandler(function() {
            dialog.close();
            me._deleteUserIndicator(indicator.id);
        });

        dialog.show(title, content, [cancelBtn, okBtn]);
        dialog.makeModal();
    },
    /**
     * Destroys the indicator through the service.
     *
     * @method _deleteUserIndicator
     * @param  {Number} indicatorId
     * @return {undefined}
     */
    _deleteUserIndicator: function(indicatorId) {
        var me = this,
            instance = this.instance;
            service = instance.getUserIndicatorsService();

        service.deleteUserIndicator(indicatorId, function() {
            me._removeIndicatorFromGrid(indicatorId);
        }, function() {
            // error :(
            me.showMessage(me.loc.error.title, me.loc.error.indicatorDeleteError);
        });
    },
    /**
     * Removes the indicator from the grid.
     *
     * @method _removeIndicatorFromGrid
     * @param  {Number} indicatorId
     * @return {undefined}
     */
    _removeIndicatorFromGrid: function(indicatorId) {
        // TODO: remove the verbose code after the beef with
        // lodash/underscore has been settled.
        //
        //_.remove(gridData, function(data) {
        //    return data.id === indicatorId;
        //});
        var gridModel = this.grid.getDataModel(),
            gridData = gridModel.getData() || [],
            i, gLen, index = null;

        for (i = 0, gLen = gridData.length; i < gLen; ++i) {
            if (gridData[i].id === indicatorId) {
                index = i;
                break;   
            }
        }

        if (index) {
            gridData.splice(index, 1);
        }
        this.grid.renderTo(this.container.find('div.indicatorsGrid'));
    },
    /**
     * Binds the action of the "Add new indicator" button.
     *
     * @method _bindAddNewIndicator
     * @param  {jQuery} container
     * @return {undefined}
     */
    _bindAddNewIndicator: function(container) {
        var me = this,
            button = container.find('button#createNewIndicator');
        button.click(function() {
            me._showAddIndicatorForm();
        });
    },
    /**
     * Shows the form where users can create new indicators.
     *
     * @method _showAddIndicatorForm
     * @return {undefined}
     */
    _showAddIndicatorForm: function() {
        // TODO: create a form to create a new indicator and display it to the user.
        alert('Not implemented yet');
    },

    /**
     * Normalizes the indicator to be used like a sotkanet indicator in statsplugin.
     *
     * @method _normalizeIndicator
     * @param  {Object} indicator
     * @return {Object}
     */
    _normalizeIndicator: function(indicator) {
        indicator.id = 'user_' + indicator.id;
        indicator.ownIndicator = true;
        indicator.gender = 'total';
        indicator.organization = {
            'title': indicator.organization
        };
        indicator.meta = {
            'title': indicator.title
        };

        return indicator;
    },

    /**
     * @method onEvent
     * @param {Oskari.mapframework.event.Event} event an Oskari event object
     * Event is handled forwarded to correct #eventHandlers if found or discarded
     * if not.
     */
    onEvent : function(event) {
        var handler = this.eventHandlers[event.getName()];
        if (!handler)
            return;

        return handler.apply(this, [event]);

    },
    /**
     * @method bindEvents
     * Register tab as eventlistener
     */
    bindEvents : function() {
        var instance = this.instance;
        var sandbox = instance.getSandbox();
        // faking to be module with getName/onEvent methods
        for (p in this.eventHandlers) {
            sandbox.registerForEventByName(this, p);
        }

    },
    /**
     * @method unbindEvents
     * Unregister tab as eventlistener
     */
    unbindEvents : function() {
        var instance = this.instance;
        var sandbox = instance.getSandbox();
        // faking to be module with getName/onEvent methods
        for (p in this.eventHandlers) {
            sandbox.unregisterFromEventByName(this, p);
        }
    },

    /**
     * @method showMessage
     * Shows user a message with ok button
     * @param {String} title popup title
     * @param {String} message popup message
     */
    showMessage: function (title, message) {
        var loc = this.instance.getLocalization(),
            dialog = Oskari.clazz.create('Oskari.userinterface.component.Popup'),
            okBtn = Oskari.clazz.create('Oskari.userinterface.component.Button');
        
        okBtn.setTitle(loc.buttons.ok);
        okBtn.addClass('primary');
        okBtn.setHandler(function () {
            dialog.close(true);
        });
        dialog.show(title, message, [okBtn]);
    },
});

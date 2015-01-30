Oskari.clazz.define("Oskari.geojson.bundle.geojson.GeoJSONBundle",
function() {

}, {
    "create" : function() {
        return this;
    },
    "update" : function(manager, bundle, bi, info) {
    }
}, {

    "protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
    "source" : {
        "scripts": [{
            "type": "text/javascript",
            "src": "../../../../bundles/geojson/bundle/geojson/GeoJSONPlugin.js"
        }, {
            "type": "text/javascript",
            "src": "../../../../bundles/geojson/bundle/geojson/request/AddGeoJSONRequest.js"
        }, {
            "type": "text/javascript",
            "src": "../../../../bundles/geojson/bundle/geojson/request/AddGeoJSONRequestHandler.js"
        }, {
            "type": "text/javascript",
            "src": "../../../../bundles/geojson/bundle/geojson/request/RemoveGeoJSONRequest.js"
        }, {
            "type": "text/javascript",
            "src": "../../../../bundles/geojson/bundle/geojson/request/RemoveGeoJSONRequestHandler.js"
        }],
        "locales" : []
    },
    "bundle" : {
        "manifest" : {
            "Bundle-Identifier" : "geojson",
            "Bundle-Name" : "geojson",
            "Bundle-Author" : [{
                "Name" : "Tuomas Järvensivu",
                "Organisation" : "",
                "Temporal" : {
                    "Start" : "2015",
                    "End" : "2015"
                },
                "Copyleft" : {
                    "License" : {
                        "License-Name" : "EUPL",
                        "License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
                    }
                }
            }],
            "Bundle-Version" : "1.0.0",
            "Import-Namespace" : ["Oskari"],
            "Import-Bundle" : {}

        }
    },
    "dependencies" : []
});

Oskari.bundle_manager.installBundleClass("geojson", "Oskari.geojson.bundle.geojson.GeoJSONBundle");

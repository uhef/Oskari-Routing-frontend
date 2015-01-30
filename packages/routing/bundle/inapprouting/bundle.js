Oskari.clazz.define("Oskari.routing.bundle.inapprouting.InAppRoutingBundle",

 function() {

  }, {
   "create" : function() {
      return Oskari.clazz.create("Oskari.routing.bundle.inapprouting.InAppRoutingBundleInstance");
    },
   "update" : function(manager, bundle, bi, info) {}
  },
 {
    "protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
    "source" : {
      "scripts" : [{
        "type" : "text/javascript",
        "src" : "../../../../bundles/routing/bundle/inapprouting/instance.js"
      }, {
        "type": "text/javascript",
        "src": "../../../../bundles/routing/bundle/inapprouting/Tile.js"
      }],
      "locales" : [{
        "lang" : "fi",
        "type" : "text/javascript",
        "src" : "../../../../bundles/routing/bundle/inapprouting/locale/fi.js"
      }, {
        "lang" : "sv",
        "type" : "text/javascript",
        "src" : "../../../../bundles/routing/bundle/inapprouting/locale/sv.js"
      }, {
        "lang" : "en",
        "type" : "text/javascript",
        "src" : "../../../../bundles/routing/bundle/inapprouting/locale/en.js"
      }]
    },
    "bundle" : {
      "manifest" : {
        "Bundle-Identifier" : "inapprouting",
        "Bundle-Name" : "inapprouting",
        "Bundle-Author" : [{
          "Name" : "Tuomas Järvensivu",
          "Organisation" : "",
          "Temporal" : {
            "Start" : "2009",
            "End" : "2011"
          },
          "Copyleft" : {
            "License" : {
              "License-Name" : "EUPL",
              "License-Online-Resource" : ""
            }
          }
        }],
        "Bundle-Name-Locale" : {
          "fi" : {
            "Name" : "InAppRouting",
            "Title" : "In-App Routing"
          },
          "en" : {}
        },
        "Bundle-Version" : "1.0.0",
        "Import-Namespace" : ["Oskari", "jquery"],
        "Import-Bundle" : {}
      }
    },

   "dependencies" : ["jquery"]
  });

Oskari.bundle_manager.installBundleClass("inapprouting", "Oskari.routing.bundle.inapprouting.InAppRoutingBundle");
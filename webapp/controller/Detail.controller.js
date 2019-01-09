sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("test.HelloWorld.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf test.HelloWorld.view.Detail
		 */
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachMatched(this._onRouteMatched, this);

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf test.HelloWorld.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf test.HelloWorld.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf test.HelloWorld.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/Products(" + oArgs.productId + ")",
				events: {
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function () {
						oView.setBusy(false);
					}
				}
			});
		},

		handleNavButtonPress: function (evt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home");
		},

		handleOrder: function (evt) {
			// show confirmation dialog
			var bundle = this.getView().getModel("i18n").getResourceBundle();
			MessageBox.confirm(
				bundle.getText("OrderDialogMsg"),
				function (oAction) {
					if (MessageBox.Action.OK === oAction) {
						// notify user
						var successMsg = bundle.getText("OrderDialogSuccessMsg");
						MessageToast.show(successMsg);
						// TODO call proper service method and update model (not part of this tutorial)
					}
				},
				bundle.getText("OrderDialogTitle")
			);
		}

	});

});
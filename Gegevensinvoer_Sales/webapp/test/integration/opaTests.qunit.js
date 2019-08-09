/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/Flexso/DPO/Gegevensinvoer_Sales/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
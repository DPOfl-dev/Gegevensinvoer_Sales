sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.Flexso.DPO.Gegevensinvoer_Sales.controller.Home", {
		onInit: function () {},

		getAllIdeas: function () {
			$.ajax({
				type: "GET",
				headers: {
					"X-CSRF-Token": "Fetch",
					"Authorization": "Basic aGVtZWxqbzpmeWQxVTRwOQ=="
				},
				url: "/sap/opu/odata/SAP/ZBC_DPO_WF_DATA_SRV/Ideas?$format=json",
				success: function (res) {},
				error: function (err) {
					alert("Er is een fout opgetreden. Bekijk de console voor meer details");
					console.log(err);
				}
			});
		},

		getTasks: function () {
			this.getAllIdeas();
		}

	});
});
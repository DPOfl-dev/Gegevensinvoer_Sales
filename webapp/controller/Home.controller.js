sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.Flexso.DPO.Gegevensinvoer_Sales.controller.Home", {
		onInit: function () {},

		getAllIdeas: function () {

			return $.ajax({
				type: "GET",
				async: false,
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
			}).responseJSON;
		},

		getTemplateSteps: function (template, veld) {
			return $.ajax({
				type: "GET",
				async: false,
				headers: {
					"X-CSRF-Token": "Fetch",
					"Authorization": "Basic aGVtZWxqbzpmeWQxVTRwOQ=="
				},
				url: "/sap/opu/odata/SAP/ZBC_DPO_WF_DATA_SRV/Templates(Id=" + template + ",Field='" +
					veld +
					"')?$format=json",
				success: function (resTemplate1) {},
				error: function (err) {
					console.log(err);
				}
			}).responseJSON;
		},

		tasksButtonPush: function () {
			// Velden voor elk template

			var veldenTemplate1 = ["Customer", "Distr kanaal"];
			var veldenTemplate2 = ["Sales organisatie"];

			var allIdeas = this.getAllIdeas();

			for (var i = 0; i < allIdeas.d.results.length; i++) {

				// Template geassocieerd aan idee opvragen.

				var template = allIdeas.d.results[i].Template;

				// Stappen in template opvragen.

				if (template == 1) {
					// Velden template 1 overlopen

					for (var j = 0; j < veldenTemplate1.length; j++) {
						var geselecteerdVeld = this.getTemplateSteps(template, veldenTemplate1[j]);
						console.log(geselecteerdVeld);
					}

				} else if (template == 2) {
					console.log("Stappen template 2");
				}
			}

		}

	});
});
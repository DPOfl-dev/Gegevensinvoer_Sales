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

		getFieldValue: function (guid, veld) {
			return $.ajax({
				type: "GET",
				async: false,
				headers: {
					"X-CSRF-Token": "Fetch",
					"Authorization": "Basic aGVtZWxqbzpmeWQxVTRwOQ=="
				},
				url: "/sap/opu/odata/SAP/ZBC_DPO_WF_DATA_SRV/Templates(Guid=" + guid + ",Field='" +
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
						var geselecteerdVeld = this.getTemplateSteps(template, veldenTemplate1[j]); // geselecteerdVeld bevat de "master data" van een veld in een template (TemplateID, veldnaam, rol, stap, taak).
						if (geselecteerdVeld.d.Role == "Verkoop") {
							// Indien template een taak voor Sales bevat, kijken welk(e) veld(en) in welke stappen van het template ingevuld moeten worden.
							var guidIdea = allIdeas.d.results[i].Guid;
							var fieldName = geselecteerdVeld.d.Field;

							var ingevuldeWaarde = this.getFieldValue(guidIdea, fieldName);
							console.log(ingevuldeWaarde);
						}
					}

				} else if (template == 2) {
					console.log("Stappen template 2");
				}
			}

		}

	});
});
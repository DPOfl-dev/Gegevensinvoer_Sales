sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.Flexso.DPO.Gegevensinvoer_Sales.controller.Home", {
		onInit: function () {
			this.oView = this.getView();
			var ideasModel = new JSONModel({
				"d": {
					"results": []
				}
			});

			var ideasArray = ideasModel.getProperty("/d/results");

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

							var ingevuldeWaarde = this.getFieldValue(guidIdea, fieldName).d.FieldValue;
							console.log(ingevuldeWaarde);

							if (ingevuldeWaarde == "") {
								ideasArray.push(allIdeas.d.results[i]);
							} else {
								console.log("Wel een waarde ingegeven");
							}
						}
					}

				} else if (template == 2) {
					// Velden template 1 overlopen

					for (var k = 0; k < veldenTemplate2.length; k++) {
						var geselecteerdVeldTemplate2 = this.getTemplateSteps(template, veldenTemplate2[k]); // geselecteerdVeld bevat de "master data" van een veld in een template (TemplateID, veldnaam, rol, stap, taak).
						if (geselecteerdVeldTemplate2.d.Role == "Verkoop") {
							// Indien template een taak voor Sales bevat, kijken welk(e) veld(en) in welke stappen van het template ingevuld moeten worden.

							var guidIdeaTemplate2 = allIdeas.d.results[i].Guid;
							var fieldNameTemplate2 = geselecteerdVeldTemplate2.d.Field;

							var ingevuldeWaardeTemplate2 = this.getFieldValue(guidIdeaTemplate2, fieldNameTemplate2).d.FieldValue;
							console.log(ingevuldeWaardeTemplate2);

							if (ingevuldeWaarde == "") {
								ideasArray.push(allIdeas.d.results[i]);
							} else {
								console.log("Wel een waarde ingegeven");
							}
						}
					}
				}

			}
			this.getView().setModel(ideasModel);
		},

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
				url: "/sap/opu/odata/SAP/ZBC_DPO_WF_DATA_SRV/Fields(Guid=guid'" + guid + "',Field='" +
					veld +
					"')?$format=json",
				success: function (resTemplate1) {},
				error: function (err) {
					console.log(err);
				}
			}).responseJSON;
		},

		onIdeaSelection: function (oEvent) {
			var allIdeas = this.getAllIdeas();

			var veldenTemplate1 = ["Customer", "Distr kanaal"];
			var veldenTemplate2 = ["Sales organisatie"];

			console.log("Breakpoint navigatie");
			var sIdeaGUID = oEvent.getSource().getBindingContext().getObject().Guid;
			var iGeassocieerdTemplate = oEvent.getSource().getBindingContext().getObject().Template;
			if (iGeassocieerdTemplate == 1) {
				for (var i = 0; i < allIdeas.d.results.length; i++) {
					// Checken welk veld leeg is.

					for (var j = 0; j < veldenTemplate1.length; j++) {
						var geselecteerdVeld = this.getTemplateSteps(iGeassocieerdTemplate, veldenTemplate1[j]); // geselecteerdVeld bevat de "master data" van een veld in een template (TemplateID, veldnaam, rol, stap, taak).
						if (geselecteerdVeld.d.Role == "Verkoop") {
							// Indien template een taak voor Sales bevat, kijken welk(e) veld(en) in welke stappen van het template ingevuld moeten worden.

							var fieldName = geselecteerdVeld.d.Field;

							var ingevuldeWaarde = this.getFieldValue(sIdeaGUID, fieldName).d.FieldValue;
							console.log(ingevuldeWaarde);

							if (ingevuldeWaarde == "") {
								console.log("Het veld dat ingevuld moet worden is: GUID: " + sIdeaGUID + ", field: " + fieldName);
							} else {
								console.log("Veld heeft al een waarde");
							}
						}
					}
				}
			} else if (iGeassocieerdTemplate == 2) {
				for (var k = 0; k < allIdeas.d.results.length; k++) {
					// Checken welk veld leeg is.

					for (var l = 0; l < veldenTemplate2.length; l++) {
						var geselecteerdVeldTemplate2 = this.getTemplateSteps(iGeassocieerdTemplate, veldenTemplate2[l]); // geselecteerdVeld bevat de "master data" van een veld in een template (TemplateID, veldnaam, rol, stap, taak).
						if (geselecteerdVeldTemplate2.d.Role == "Verkoop") {
							// Indien template een taak voor Sales bevat, kijken welk(e) veld(en) in welke stappen van het template ingevuld moeten worden.

							var fieldName = geselecteerdVeldTemplate2.d.Field;

							var ingevuldeWaardeTemplate2 = this.getFieldValue(sIdeaGUID, fieldName).d.FieldValue;
							console.log(ingevuldeWaardeTemplate2);

							if (ingevuldeWaardeTemplate2 == "") {
								console.log("Het veld dat ingevuld moet worden is: GUID: " + sIdeaGUID + ", field: " + fieldName);
							} else {
								console.log("Veld heeft al een waarde");
							}
						}
					}
				}
			}

			this.getOwnerComponent().getRouter().navTo("tasksoverview", {
				ideaGUID: sIdeaGUID,
				field: fieldName
			});
		}
	});
});
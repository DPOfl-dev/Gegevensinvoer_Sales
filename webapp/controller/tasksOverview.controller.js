sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.Flexso.DPO.Gegevensinvoer_Sales.controller.tasksOverview", {
		onInit: function () {

			// Velden voor elk template

			var ideasModel = new JSONModel({
				"d": {
					"results": []
				}
			});

			var ideasArray = ideasModel.getProperty("/d/results");

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

							ideasArray.push(allIdeas.d.results[i]);
							var guidIdea = allIdeas.d.results[i].Guid;
							var fieldName = geselecteerdVeld.d.Field;

							//var ingevuldeWaarde = this.getFieldValue(guidIdea, fieldName);
							//console.log(ingevuldeWaarde);
						}
					}

				} else if (template == 2) {
					console.log("Stappen template 2");
				}

				this.getView().setModel(ideasModel);
			}
		}
	});
});
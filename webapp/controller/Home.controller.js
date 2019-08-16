sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/f/library",
	"sap/m/Dialog",
	"sap/m/Text"
], function (Controller, JSONModel, fioriLibrary, Dialog, Text) {
	"use strict";

	return Controller.extend("com.Flexso.DPO.Gegevensinvoer_Sales.controller.Home", {
		onInit: function () {
			this.oView = this.getView();
			this._oSaveValuePopover = null;
			var ideasModel = new JSONModel({
				"d": {
					"ideas": [],
					"fields": []
				}
			});

			var ideasArray = ideasModel.getProperty("/d/ideas");
			var fieldsArray = ideasModel.getProperty("/d/fields")

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

							var field = this.getFieldValue(guidIdea, fieldName);
							var ingevuldeWaarde = field.d.FieldValue;
							console.log(ingevuldeWaarde);

							if (ingevuldeWaarde == "") {
								ideasArray.push(allIdeas.d.results[i]);
								fieldsArray.push(field);
								console.log("Breakpoint");
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

							var fieldTemplate2 = this.getFieldValue(guidIdeaTemplate2, fieldNameTemplate2);

							var ingevuldeWaardeTemplate2 = fieldTemplate2.d.FieldValue;
							console.log(ingevuldeWaardeTemplate2);

							if (ingevuldeWaarde == "") {
								ideasArray.push(allIdeas.d.results[i]);
								fieldsArray.push(fieldTemplate2);
							} else {
								console.log("Wel een waarde ingegeven");
							}
						}
					}
				}

			}
			this.getView().setModel(ideasModel);
			console.log("Breakpoint");
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
			// Selected list item
			var oSelectedListItem = oEvent.getSource();
			// Idea data
			var oIdea = oSelectedListItem.getBindingContext().getObject();
			// GUID of selected item
			var sGuid = oIdea.Guid;
			console.log("sGuid: " + sGuid);

			// Field data
			var aFields = oSelectedListItem.getModel().getData().d.fields;
			// Field data corresponding with selected item
			var oField = null;
			for (var i = 0; i < aFields.length; i++) {
				if (aFields[i].d.Guid == sGuid) {
					oField = aFields[i];
				}
			}

			console.log(oField);

			if (oField.d.FieldValue == "") {
				var fieldsModel = new JSONModel({
					"d": {
						"fields": []
					}
				});
				fieldsModel.getProperty("/d/fields").push(oField)

				if (!this._oSaveValuePopover) {
					this._oSaveValuePopover = sap.ui.xmlfragment("popoverNavCon", "com.Flexso.DPO.Gegevensinvoer_Sales.view.popovers.submitValue",
						this);
					this._oSaveValuePopover.setModel(fieldsModel);
					console.log("Breakpoint");
					this.getView().addDependent(this._oSaveValuePopover);
				}
				this._oSaveValuePopover.openBy(oEvent.getSource());
			}
		}
	});
});
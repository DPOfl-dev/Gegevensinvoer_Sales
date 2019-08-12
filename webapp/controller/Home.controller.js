sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.Flexso.DPO.Gegevensinvoer_Sales.controller.Home", {
		onInit: function () {

			// Velden voor elk template

			var veldenTemplate1 = ["Customer", "Distr kanaal"];
			var veldenTemplate2 = ["Sales organisatie"];

			// Velden voor de rol waarvoor de applicatie geschreven wordt.

			var veldenVerkoop = ["Customer", "Sales organisatie"];

			// GET-call van alle ideeën uit de IdeasSet

			$.ajax({
				type: "GET",
				headers: {
					"X-CSRF-Token": "Fetch",
					"Authorization": "Basic aGVtZWxqbzpmeWQxVTRwOQ=="
				},
				url: "/sap/opu/odata/SAP/ZBC_DPO_WF_DATA_SRV/Ideas?$format=json",
				success: function (res) {
					for (var i = 0; i < res.d.results.length; i++) {

						// Template geassocieerd aan idee opvragen.

						var template = res.d.results[i].Template;

						// Stappen in template opvragen.

						if (template == 1) {
							// Velden template 1 overlopen

							for (var j = 0; j < veldenTemplate1.length; j++) {

								$.ajax({
									type: "GET",
									headers: {
										"X-CSRF-Token": "Fetch",
										"Authorization": "Basic aGVtZWxqbzpmeWQxVTRwOQ=="
									},
									url: "/sap/opu/odata/SAP/ZBC_DPO_WF_DATA_SRV/Templates(Id=" + template + ",Field='" +
										veldenTemplate1[j] +
										"')?$format=json",
									success: function (res) {
										console.log(res);
										if (res.d.Role == "Verkoop") {

											// Indien template een taak voor Sales bevat, kijken welk(e) veld(en) in welke stappen van het template ingevuld moeten worden.

											console.log(" Template 1, stap " + res.d.Step + ", taak " + res.d.Task + ": veld " + res.d.Field +
												" in te vullen door dienst verkoop");
										} else {
											console.log(" Template 1, Taak tijdelijk te negeren in deze applicatie");
										}

									},
									error: function (err) {
										console.log(err);
									}
								});
							}

						} else if (template == 2) {
							//	Velden template 2 overlopen

							for (var j = 0; j < veldenTemplate2.length; j++) {

								$.ajax({
									type: "GET",
									headers: {
										"X-CSRF-Token": "Fetch",
										"Authorization": "Basic aGVtZWxqbzpmeWQxVTRwOQ=="
									},
									url: "/sap/opu/odata/SAP/ZBC_DPO_WF_DATA_SRV/Templates(Id=" + template + ",Field='" +
										veldenTemplate2[j] +
										"')?$format=json",
									success: function (res) {
										console.log(res);
										if (res.d.Role == "Verkoop") {

											// Indien template een taak voor Sales bevat, kijken welk(e) veld(en) in welke stappen van het template ingevuld moeten worden.

											console.log(" Template 2, stap " + res.d.Step + ", taak " + res.d.Task + ": veld " + res.d.Field +
												" in te vullen door dienst verkoop");
										} else {
											console.log(" Template 2, Taak tijdelijk te negeren in deze applicatie");
										}

									},
									error: function (err) {
										console.log(err);
									}
								});
							}
						}
					}
				},
				error: function (err) {
					alert("Er is een fout opgetreden. Bekijk de console voor meer details");
					console.log(err);
				}
			});

			// Opzoeken of de corresponderende record voor dat veld reeds een waarde bevat (elke keer doen)

			// Hoe gaan we zien welk veld bij welk idee hoort? Kan ik hiervoor gebruikmaken van de creation date? Zit dit in de metadata van de response?

			// Indien dit nog geen waarde bevat: kijken in welke stap dit veld ingevuld moet worden

			// Invoer van gegevens mogelijk maken (POST-request naar de FieldsSet).

		}
	});
});
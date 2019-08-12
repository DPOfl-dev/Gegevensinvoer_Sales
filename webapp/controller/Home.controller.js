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
					//	console.log(res);
					for (var i = 0; i < res.d.results.length; i++) {
						//console.log("Idee " + i + " gevonden");

						// Template geassocieerd aan idee opvragen.

						var template = res.d.results[i].Template;

						console.log("Template " + template);

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
											console.log(" Template " + template + ", Taak te voltooien door dienst verkoop");
										} else {
											console.log(" Template " + template + ", Taak te voltooien door dienst" + res.d.Role);
										}
										//	console.log("Veld " + veldenVerkoop[j] + " bestaat voor template " + template);

									},
									error: function (err) {
										console.log(err);
										//	console.log("Veld " + veldenVerkoop[j] + " niet gevonden in template " + template)
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
											console.log(" Template " + template + ", Taak te voltooien door dienst verkoop");
										} else {
											console.log(" Template " + template + ", Taak te voltooien door dienst" + res.d.Role);
										}
										//	console.log("Veld " + veldenVerkoop[j] + " bestaat voor template " + template);

									},
									error: function (err) {
										console.log(err);
										//	console.log("Veld " + veldenVerkoop[j] + " niet gevonden in template " + template)
									}
								});
							}

						}
					}
				},
				error: function (err) {
					console.log(err);
				}
			});

			// Rol als applicatie-variabele instellen? --> OPZOEKEN.

			// Resultaat overlopen en nagaan of er een taak voor Sales in het template zit.

			// Indien template een taak voor Sales bevat, kijken welk(e) veld(en) in welke stappen van het template ingevuld moeten worden.

			// Opzoeken of de corresponderende record voor dat veld reeds een waarde bevat (elke keer doen)

			// Hoe gaan we zien welk veld bij welk idee hoort? Kan ik hiervoor gebruikmaken van de creation date? Zit dit in de metadata van de response?

			// Indien dit nog geen waarde bevat: kijken in welke stap dit veld ingevuld moet worden

			// Invoer van gegevens mogelijk maken (POST-request naar de FieldsSet).

		}
	});
});
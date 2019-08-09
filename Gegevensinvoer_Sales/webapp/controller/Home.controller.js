sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.Flexso.DPO.Gegevensinvoer_Sales.controller.Home", {
		onInit: function () {

			// Rol als applicatie-variabele instellen? --> OPZOEKEN.

			// GET-call van alle ideeën uit de IdeasSet

			// Resultaat overlopen en nagaan of er een taak voor Sales in het template zit.

			// Indien template een taak voor Sales bevat, kijken welk(e) veld(en) in welke stappen van het template ingevuld moeten worden.

			// Opzoeken of de corresponderende record voor dat veld reeds een waarde bevat (elke keer doen)

			// Hoe gaan we zien welk veld bij welk idee hoort? Kan ik hiervoor gebruikmaken van de creation date? Zit dit in de metadata van de response?

			// Indien dit nog geen waarde bevat: kijken in welke stap dit veld ingevuld moet worden

			// Invoer van gegevens mogelijk maken (POST-request naar de FieldsSet).

		}
	});
});
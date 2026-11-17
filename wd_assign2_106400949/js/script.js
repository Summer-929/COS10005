"use strict";

// RESTAURANT DATA: Stores the deposit, price level and recommendation tags for each restaurant.
var restaurantData = {
    yellow: { name: "Yellow Brick Road", deposit: 20, budget: "medium", purpose: ["friends", "family", "coffee"], diet: ["vegetarian"] },
    envi: { name: "Envi Skydining", deposit: 50, budget: "high", purpose: ["date", "family"], diet: [] },
    bangga: { name: "Bang Ga Bang Ga Korean", deposit: 20, budget: "medium", purpose: ["friends", "family"], diet: [] },
    commonman: { name: "Common Man Coffee Roasters", deposit: 20, budget: "medium", purpose: ["friends", "coffee"], diet: ["vegetarian"] },
    buldojang: { name: "Buldojang", deposit: 20, budget: "medium", purpose: ["friends", "family"], diet: [] },
    ayam: { name: "Ayam Gepuk Artisan", deposit: 10, budget: "low", purpose: ["friends"], diet: [] }
};

// RECOMMENDATION FUNCTION: Matches the user's budget, purpose and dietary choice to restaurant data.
var recommendForm = document.getElementById("recommendForm");
if (recommendForm) {
    recommendForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var diet = document.getElementById("diet").value;
        var budget = document.getElementById("budget").value;
        var purpose = document.getElementById("purpose").value;
        var matches = [];

        for (var key in restaurantData) {
            var place = restaurantData[key];
            var budgetMatch = budget === "any" || budget === place.budget || (budget === "medium" && place.budget === "low");
            var purposeMatch = purpose === "any" || place.purpose.indexOf(purpose) !== -1;
            // Dietary information is only a simple website tag; users should confirm dietary suitability directly.
            var dietMatch = diet === "none" || (diet === "vegetarian" && place.diet.indexOf("vegetarian") !== -1) || (diet === "halal" && key === "ayam");
            if (budgetMatch && purposeMatch && dietMatch) {
                matches.push({ key: key, name: place.name, deposit: place.deposit });
            }
        }

        var output = document.getElementById("recommendResult");
        if (matches.length === 0) {
            output.innerHTML = "<p>No exact match found. Try choosing a different budget or dining purpose.</p>";
        } else {
            var chosen = matches[0];
            output.innerHTML = "<h2>Our suggestion: " + chosen.name + "</h2><p>We found " + matches.length + " suitable option(s) based on your selections.</p><a class='button small' href='reservation.html?restaurant=" + chosen.key + "'>Reserve this restaurant</a>";
        }
    });
}

// REGISTRATION VALIDATION: Checks required fields and displays clear error messages.
var registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {

        var errors = [];

        var username = document.getElementById("username").value.trim();
        var email = document.getElementById("regEmail").value.trim();
        var phone = document.getElementById("regPhone").value.trim();
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        var gender = document.querySelector("input[name='gender']:checked");
        var diet = document.getElementById("regDiet").value;
        var country = document.getElementById("country").value;

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;

        if (!/^[A-Za-z0-9_]{5,}$/.test(username))
            errors.push("Username must be at least 5 characters and use only letters, numbers or underscores.");

        if (!emailPattern.test(email))
            errors.push("Enter a valid email address.");

        if (!/^\d{8,15}$/.test(phone))
            errors.push("Phone number must contain 8 to 15 digits.");

        if (!passwordPattern.test(password))
            errors.push("Password must be 10+ characters and include uppercase, lowercase, number and special character.");

        if (password !== confirmPassword)
            errors.push("Confirm password must match the password.");

        if (!gender)
            errors.push("Please select a gender option.");

        if (!diet)
            errors.push("Please select a dietary preference.");

        if (!country)
            errors.push("Please select a country or region.");

        var message = document.getElementById("registerErrors");

        if (errors.length > 0) {

            event.preventDefault();

            message.className = "form-message";
            message.textContent = errors.join("\n");

        } else {

            message.className = "form-message success";
            message.textContent = "Registration details are valid. Submitting...";

            // Allow the form to submit to regtest.php.
        }

    });
}

// RESERVATION SETUP: Reads a restaurant query parameter and preselects that restaurant.
var reservationForm = document.getElementById("reservationForm");
if (reservationForm) {
    var restaurantSelect = document.getElementById("restaurant");
    var depositAmount = document.getElementById("depositAmount");
    var depositValue = document.getElementById("depositValue");
    var dateInput = document.getElementById("resDate");
    var today = new Date();
    var todayText = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
    dateInput.min = todayText;

    var query = new URLSearchParams(window.location.search);
    var selectedRestaurant = query.get("restaurant");
    if (selectedRestaurant && restaurantData[selectedRestaurant]) restaurantSelect.value = selectedRestaurant;

    // DEPOSIT CALCULATION: Changes the displayed and submitted deposit when restaurant selection changes.
    function updateDeposit() {
        var selected = restaurantData[restaurantSelect.value];
        var amount = selected ? selected.deposit : 0;
        depositAmount.textContent = "RM" + amount;
        depositValue.value = amount;
    }
    restaurantSelect.addEventListener("change", updateDeposit);
    updateDeposit();

    // PAYMENT DISPLAY: Shows voucher input or card inputs depending on the chosen payment method.
    var paymentOptions = document.querySelectorAll("input[name='paymentMethod']");
    function updatePaymentFields() {
        var method = document.querySelector("input[name='paymentMethod']:checked").value;
        document.getElementById("voucherFields").style.display = method === "voucher" ? "block" : "none";
        document.getElementById("cardFields").style.display = method === "online" ? "block" : "none";
    }
    paymentOptions.forEach(function (option) { option.addEventListener("change", updatePaymentFields); });
    updatePaymentFields();

    // SAME EMAIL FUNCTION: Copies the contact email into billing email when checkbox is ticked.
    document.getElementById("sameEmail").addEventListener("change", function () {
        var billing = document.getElementById("billingEmail");
        billing.value = this.checked ? document.getElementById("resEmail").value : "";
    });

    // RESERVATION VALIDATION: Checks contact details, date, party size and selected payment format.
    reservationForm.addEventListener("submit", function (event) {
        var errors = [];
        var name = document.getElementById("fullName").value.trim();
        var email = document.getElementById("resEmail").value.trim();
        var phone = document.getElementById("resPhone").value.trim();
        var date = document.getElementById("resDate").value;
        var time = document.getElementById("resTime").value;
        var people = Number(document.getElementById("people").value);
        var billingEmail = document.getElementById("billingEmail").value.trim();
        var method = document.querySelector("input[name='paymentMethod']:checked").value;
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) errors.push("Please enter your full name.");
        if (!emailPattern.test(email)) errors.push("Please enter a valid email address.");
        if (!/^\d{10,}$/.test(phone)) errors.push("Phone number must contain at least 10 digits.");
        if (!restaurantSelect.value) errors.push("Please select a restaurant.");
        if (!date || date < todayText) errors.push("Reservation date cannot be empty or in the past.");
        if (!time) errors.push("Please select a reservation time.");
        if (people <= 0 || !Number.isInteger(people)) errors.push("Number of people must be greater than zero.");
        if (!emailPattern.test(billingEmail)) errors.push("Please enter a valid billing email address.");

        if (method === "online") {
            var card = document.getElementById("cardNumber").value.trim();
            var cardType = document.getElementById("cardType").value;
            var requiredDigits = cardType === "amex" ? 15 : 16;
            if (!new RegExp("^\\d{" + requiredDigits + "}$").test(card)) errors.push("Card number must contain " + requiredDigits + " digits for the selected card type.");
        }

        if (errors.length > 0) {
            event.preventDefault();
            var errorBox = document.getElementById("reservationErrors");
            errorBox.textContent = errors.join("\n");
            errorBox.className = "form-message";
        }
        // If there are no errors, the browser submits this form using POST to the assignment test URL.
    });
}

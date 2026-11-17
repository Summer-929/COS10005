DINEFINDER - COS10005 WEB DEVELOPMENT ASSIGNMENT 2
Student: Wen Jun

1. WEBSITE STRUCTURE
- index.html: Home page introducing DineFinder and its services.
- restaurants.html: Six restaurant listings with cuisine, sample dishes, estimated prices, deposits and descriptions.
- recommendation.html: Preference form that recommends a restaurant using JavaScript rules.
- register.html: Front-end registration form with JavaScript validation.
- reservation.html: Reservation form with validation, restaurant selection, deposit display and conditional payment fields.
- css/style.css: Shared wood-colour design and responsive layout.
- js/script.js: Restaurant data, recommendation rules, registration validation and reservation functions.
- images/: Folder reserved for locally stored image assets. This starter version uses remote Unsplash image URLs in the HTML/CSS.

2. GITHUB REPOSITORY
https://github.com/Summer-929/COS10005.git

3. JAVASCRIPT LOGIC (PLAIN ENGLISH)
- Recommendation: The script reads dietary preference, budget and dining purpose. It compares the choices with tags stored for each restaurant and displays a matching suggestion with a link to the reservation page.
- Registration: The script checks username length and characters, email format, phone digits, password complexity, matching passwords, gender, dietary preference and country/region. Errors are displayed and invalid details are not accepted.
- Reservation: The script preselects a restaurant when a query parameter is present. It updates the deposit when the restaurant changes, sets the earliest reservation date to today, and displays voucher or credit-card fields based on payment choice.
- Deposit: Each restaurant has a sample deposit value in the restaurantData object. The selected value is displayed and copied into a hidden form field.
- Same email: Selecting the checkbox copies the contact email into the billing email field.
- Reservation validation: The script checks required details, valid email, phone number length, date, time, party size, billing email and card number length (15 digits for Amex, 16 for Visa/Mastercard). Voucher code is displayed when voucher is selected; no voucher validation is required by the brief.

4. IMPORTANT NOTES / LIMITATIONS
- This is a front-end student project. Registration details are not saved because no database is connected.
- Reservation form uses the assignment test destination: http://mercury.swin.edu.au/it000000/cos10005/regtest.php . It may only work on the required Mercury environment.
- Restaurant dish prices and deposits are sample estimates for demonstration. Confirm current details with the restaurants before using them as real booking information.
- Dietary matching is a basic demonstration only. It does not certify that a restaurant or dish is Halal or vegetarian. Users should confirm directly with the restaurant.
- The images are loaded from Unsplash image URLs. Internet access is required to display them. Replace with locally saved, properly referenced images if required by your lecturer.
- No real credit card payment is processed. Use fake card numbers for testing only.

5. REFERENCES
- Yellow Brick Road official website: https://www.yellowbrickroad.my/
- Common Man Coffee Roasters locations: https://www.commonmancoffeeroasters.com.my/pages/our-cafes
- Yellow Brick Road listing and menu context: https://www.burpple.com/yellow-brick-road
- Buldojang restaurant information: https://www.tatlerasia.com/dining/buldojang
- Restaurant image URLs are from Unsplash (https://unsplash.com/).

6. HOW TO TEST
1. Open index.html in a browser.
2. Browse the Restaurants page and select a restaurant to open the reservation page with that restaurant preselected.
3. Open Recommendations, choose preferences and click Find my restaurant.
4. Test registration using all required fields and a password with uppercase, lowercase, number and special character (minimum 10 characters).
5. Test reservation using a future date, a phone number with at least 10 digits and either Voucher or Online payment.
6. Change the restaurant to see the deposit update.

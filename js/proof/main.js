window.onload = function() {
    function addCss(src) {
        var head = document.head;
        var link = document.createElement("link");

        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = src;
        link.crossorigin = 'anonymous';

        head.appendChild(link);
    }

    function addJs(src) {
        var body = document.body;
        var script = document.createElement("script");

        script.src = src;
        script.crossorigin = 'anonymous';

        body.appendChild(script);
    }

    // Adding BootStrap StyleSheet
    addCss(
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    );

    // Adding BootStrap Javascript/JQuery Scripts
    addJs("https://code.jquery.com/jquery-3.5.1.slim.min.js");
    addJs("https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js");
    addJs("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js");

    // Appending the Bootstrap Toast Component into the website.
    document.body.innerHTML += (`
    <div style="position: fixed; bottom: 10; left:10;" class="toast" id="who-bought-what-toast" data-delay="3000" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <img src="..." class="rounded mr-2" alt="...">
            <strong class="mr-auto">
            Your website Here!
            </strong>
            
            <small class="text-muted" id="was-bought-when">
            just now 
            </small>
            
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="toast-body" id="toastNotification-content">
            See? Just like this.
        </div>
    </div>
    `);

    // Array of product names.
    var availableProducts = [
		'Product 1',
		'Another Product',
		'that one super cool product',
		'the one that kinda get sales',
	];

    // API requests to name generator
    async function generateFullName() {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();

        return (data['results'][0]['name']['first'] +' '+ data['results'][0]['name']['last']);
    }

    // Generate a random number. Take a number as the max to generate
    // and `failsafe` prevents the script from crashing
    // repeatedly by choosing small numbers in a rapid succession.
    function generateRandomNumber(maxInt, failSafe=false) {
        var finalNumber = Math.round(Math.random() * maxInt);

        if (failSafe === true) {
            if (finalNumber <= 7) { // makes the lowest number possible a 
                return finalNumber + 7; // number from (1+7) - (5+7).
            }
        }

        return finalNumber;
    }

    // Displays the Bootstrap Toast Component
    function generateToastPopup() {
        $('#who-bought-what-toast').toast("show");
    }

    // Function that builds the popup contents
    // and displays them into the DOM Content.
    async function generateSalesNotification() {
        var fullname            = await generateFullName();
        var selectedProduct     = availableProducts[generateRandomNumber(availableProducts.length)];
        var whenBought          = generateRandomNumber(59) + 'm ago';
        var toastContentBody    = (
            fullname + ' purchased <em style="color: #d87d6a;">' +
            selectedProduct + '</em>'
        );
        
        var toastPopupWhenPurchased = document.getElementById('was-bought-when');
        var toastPopupWhoBoughtWhat = document.getElementById('toastNotification-content');

        // Tried using `append` and `appendChild`, but it didn't help me.
        toastPopupWhenPurchased.innerHTML = whenBought;
        toastPopupWhoBoughtWhat.innerHTML = toastContentBody;

        generateToastPopup();
    }

	var randomTimeInterval = ( // milliseconds for `setTimeout`
        generateRandomNumber(20, failsafe=true) * 1000
    );

    // Creates a continuous loop that generates the 
    // notification content on a randomly generated
    // number between 8 - 20 to give space and give
    // a little bit of realism vs a constant timed.
    function randomPopupInterval() {
        randomTimeInterval = (
            generateRandomNumber(20, failsafe=true) * 1000
        );
        generateSalesNotification();
        setTimeout(randomPopupInterval, randomTimeInterval);
    }
    randomPopupInterval();
}

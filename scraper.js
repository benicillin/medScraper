var source = "";


document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, { greeting: "source" }, function (response) {
            source = response.data;
            var r_string = "Orders.*],";
            var r_string2 = "Allergies.*],";
            the_regex = new RegExp(r_string);
            the_regex2 = new RegExp(r_string2);
            var results;
            var results2;
            var tr = "";
            results = the_regex.exec(source);
            results2 = the_regex2.exec(source);

            if (results != null && results.length == 1 && typeof results[0] != "undefined") {

                var jsonVal = "{\"" + results[0].substring(0, results[0].length - 2) + "]}";
                var jsObj = JSON.parse(jsonVal);

                tr = "Medication List:\n"
                for (var i = 0; i < jsObj.Orders.length; i++) {
                    tr += jsObj.Orders[i].DrugName + " " + jsObj.Orders[i].Directions + "\n";
                }
                tr += "\n***Current med list in Omniview***\n";


            }

            if (results2 != null && results2.length == 1 && typeof results2[0] != "undefined") {

                var jsonVal = "{\"" + results2[0].substring(0, results2[0].length - 2) + "]}";
                var jsObj = JSON.parse(jsonVal);

                tr += "Allergy List: "
                for (var i = 0; i < jsObj.Allergies.length; i++) {
                    tr += jsObj.Allergies[i].Allergen + ", ";
                }
                tr = tr.substring(0, tr.length - 2)

            }

            copyToClipboard(tr);
        });
    });


});


function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
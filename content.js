chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
      if (request.greeting == "hello")
          sendResponse({farewell: "goodbye"});
      else if (request.greeting == "source") {
          sendResponse({ data: document.getElementsByTagName('html')[0].innerHTML });
      }
    else
      sendResponse({}); // snub them.
  });


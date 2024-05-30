var superMovil = (function() {
    return {
        goToPreviousScreen: function() {
            var params = {
                "name": "goToPreviousScreen",
                "parameters": null,
                "callbackName": "goToPreviousScreen"
                };
            if(typeof window.webkit !== "undefined") {
                window.webkit.messageHandlers.FinancingSuperMovil.postMessage(JSON.stringify(params))
            } else {
              window.FinancingSuperMovil.goToPreviousScreen(JSON.stringify(params));
            }
            return "Atras";
        },
        showConnectionError: function() {
            var params = {
                "name": "showConnectionError",
                "parameters": null,
                "callbackName": "showConnectionErrorResponse"
                };
            if(typeof window.webkit !== "undefined") {
                window.webkit.messageHandlers.FinancingSuperMovil.postMessage(JSON.stringify(params))
            } else {
              window.FinancingSuperMovil.showConnectionError(JSON.stringify(params));
            }
            return "Error";
        },
        showTransactionTicket: function() {
           var ticketContent = {
                "totalDeferred": "5673.00",
                "monthsToBeDeferred": "24",
                "dateTime": "2023-10-16T23:38:45.408Z",
                "superMovilReference": "123123123",
                "monthlyInterest":"1.10",
                "yearlyInterest": "20.10",
                "totalToPay": "6673.19",
                "monthlyPayment": "789.45",
                "transactions": ["Liverpool", "Walmart", "AerolíneaVolaris", "Sears"]
            };

            var params = {
                "name": "showTransactionTicket",
                "parameters": {ticketContent: JSON.stringify(ticketContent)},
                "callbackName": "nativeTicketResponse"
                };
            if(typeof window.webkit !== "undefined") {
                window.webkit.messageHandlers.FinancingSuperMovil.postMessage(JSON.stringify(params))
            } else {
              window.FinancingSuperMovil.showTransactionTicket(JSON.stringify(params));
            }
            return "Error";
        }
    }
})(superMovil||{});
function responseToken(response) {
  return JSON.parse(response);
}
function nativeTicketResponse(response){
  if(response.params && response.params.userAction === 'share'){
    // Share && and tag
    window.location.href = 'https://www.google.com';
  } else {
    // Close, tag and redirect
    window.location.href = 'https://www.santander.com.mx';
  }
}

function showConnectionErrorResponse(response){
  if(response.params && response.params.userAction === 'retry'){
    window.location.href = 'https://www.google.com';
  } else {
    window.location.href = '/';
  }
}

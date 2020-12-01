async function sendEmail(e) {
    const valid = validateEmail();
    if(valid === false) {
        return;
    }
    
    e.preventDefault();

    const form = document.getElementById("searchForm");
    let email = form.email.value;
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; // site that doesn’t send Access-Control-*
    const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?email="; 

    const xhrEmailRequest = new XMLHttpRequest();
    
    xhrEmailRequest.open('get',proxyurl+url+email);
    xhrEmailRequest.send();


    xhrEmailRequest.onerror = function(error) {
        console.error("error: "+ error)
    }

    xhrEmailRequest.onreadystatechange = function () {

        if(xhrEmailRequest.readyState === 1 || xhrEmailRequest.readyState === 2 || xhrEmailRequest.readyState === 3) {
            console.log("cargando")
            deleteHtmlContent("#searchSection");
            deleteHtmlContent("#content");
            showLoadingPage();
        }

        if(xhrEmailRequest.readyState === 4) {
            
            setTimeout(() => {
                showResultPage(JSON.parse(xhrEmailRequest.responseText));
            }, 2000); 

        }
    }

    xhrEmailRequest.onprogress = function(event) {
        if (event.lengthComputable) {
          console.warn(`Received ${event.loaded} of ${event.total} bytes`);
        } else {
          console.warn(`Received ${event.loaded} bytes`); // no Content-Length
        }
      
      };

 }

 function showResultPage(responseBody) {
    
    const xhrResultPage = new XMLHttpRequest();
    const mainContent = document.getElementById("mainContent");
    const loading = document.getElementById("loading");

    loading.className = "loading-hiden";

    return Object.keys(responseBody).length > 0 ?  fillCardAndShowResult(xhrResultPage, mainContent, "../components/result/person-result.html", responseBody) : createHTMLRequest(xhrResultPage, mainContent, "../components/result/empty-result.html");
 }

 function deleteHtmlContent(id) {
    const contentToDelete = document.getElementById(id);

    contentToDelete.parentNode.removeChild(contentToDelete);
 }


function showLoadingPage() {
    const xhrLoading = new XMLHttpRequest();
    const mainContent = document.getElementById("mainContent");

    createHTMLRequest(xhrLoading, mainContent, "../components/loading/loading-screen.html");
}

function createHTMLRequest(xhrObject, htmlObject, urlTemplate) {
    xhrObject.onload = function() {
        if(this.status === 200) {
            htmlObject.innerHTML = xhrObject.responseText;
        } else {
            console.warn("Did not receive 200 response from html content", htmlObject.id);
        }
    }

    xhrObject.open('get', urlTemplate);
    xhrObject.send();
}

function fillPersonCard(json) {
    const nameAndAge = document.getElementById("#nameAndAge");
    const personDescription = document.getElementById("#personDescription");
    const personAddress = document.getElementById('#personAddress');
    const personEmail = document.getElementById("#personEmail");
    const firstPhone = document.getElementById("#firstPhone");
    const secondPhone = document.getElementById("#secondPhone");
    const thirdPhone = document.getElementById("#thirdPhone");
    const firstRelative = document.getElementById("#firstRelative");
    const secondRelative = document.getElementById("#secondRelative");

    
    nameAndAge.innerText = json.first_name+" "+json.last_name;
    personDescription.innerText = json.description;
    personAddress.innerText = json.address;
    personEmail.innerText = json.email;
    firstPhone.innerText = json.phone_numbers[0];
    secondPhone.innerText = json.phone_numbers[1];
    thirdPhone.innerText = json.phone_numbers[2];
    firstRelative.innerText = json.relatives[0];
    secondRelative.innerText = json.relatives[1];
}


function fillCardAndShowResult(xhrObject, htmlObject, urlTemplate, response) {
    xhrObject.onload = function() {
        if(this.status === 200) {
            htmlObject.innerHTML = xhrObject.responseText;
            fillPersonCard(response);
        } else {
            console.warn("Did not receive 200 response from html content", htmlObject.id);
        }
    }

    xhrObject.open('get', urlTemplate);
    xhrObject.send();
}

function validateEmail() {
    const form = document.getElementById("searchForm");
    const warningContainer = document.getElementById("warning");
    const searchTextInput = document.getElementById("searchText");

    let emailID = form.email.value;

    let atpos = emailID.indexOf("@");
    let dotpos = emailID.lastIndexOf(".");
    
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
        warningContainer.className = "warning-container";
        searchTextInput.className = "search-input-invalid";
       return false;
    }
    return (true);
 }
 

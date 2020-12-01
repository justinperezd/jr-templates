const xhrHeader = new XMLHttpRequest();
const header = document.getElementById("#header");

const xhrFooter = new XMLHttpRequest();
const footer = document.getElementById("#footer");

const xhrContent = new XMLHttpRequest();
const pageContent = document.getElementById("#content")

const xhrSearch = new XMLHttpRequest();
const search =  document.getElementById('#searchSection');


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

createHTMLRequest(xhrHeader, header, '../components/header/header.html');
createHTMLRequest(xhrFooter, footer, '../components/footer/footer.html');
createHTMLRequest(xhrContent, pageContent, '../components/content/content.html');
createHTMLRequest(xhrSearch, search, '../components/search/search.html');



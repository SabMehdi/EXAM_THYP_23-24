async function getData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
    }
}

function showItems(items) {
    const container = document.getElementById('items-container');
    container.innerHTML = ''; 

    items.forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        let infoDiv = document.createElement('div');
        infoDiv.className = 'item-info';

        let idParagraph = document.createElement('p');
        idParagraph.innerText = `Identifiant: ${item['o:id']}`;
        infoDiv.appendChild(idParagraph);

        let titleParagraph = document.createElement('p');
        titleParagraph.innerText = `Titre: ${item['o:title']}`;
        infoDiv.appendChild(titleParagraph);

        itemDiv.appendChild(infoDiv);

        if(item['thumbnail_display_urls'] && item['thumbnail_display_urls']['medium']){
            let image = document.createElement('img');
            image.src = item['thumbnail_display_urls']['medium'];
            itemDiv.appendChild(image);
        }

        container.appendChild(itemDiv);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost/omeka-s/api/items';
    getData(apiUrl).then(data => {
        showItems(data);
    });
});

async function getData() {

    try {
        const response = await fetch('data/catalog.json');
        return await response.json();
    } catch (err) {
        alert(err);
    }
}

getData().then( data => {
    console.log(data)
})




async function getData() {

    try {
        const response = await fetch('data/catalog.json');
        return await response.json();
    } catch (err) {
        alert(err);
    }
}

getData().then( data => renderTree(data) )

const mainNode = document.getElementById('main-container');
const menu = document.createElement('div');

menu.setAttribute("id", "main-menu");
mainNode.appendChild(menu);

const node = document.getElementById('main-menu');

function buildTree(children) {

    let ul = document.createElement("ul");

    for (let i = 0, n = children.length; i < n; i++) {

        let branch = children[i];
        let li = document.createElement("li");

        branch.type === 'file' ?
            li.innerHTML = `${branch.name}` :
            li.innerHTML = `<div class="menu-element">${branch.name}<span class="material-symbols-outlined">expand_more</span></div>`;

        if (branch.children) {
            li.appendChild(buildTree(branch.children));
        } else if (branch.type === 'file') {
            li.setAttribute('data-file', `${branch.path}`);
        }

        ul.appendChild(li);

    }
    return ul;
}

function renderTree(data) {
    node.appendChild(buildTree(data));
}




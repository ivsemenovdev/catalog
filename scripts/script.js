async function getData() {

    try {
        const response = await fetch('data/catalog.json');
        return await response.json();
    } catch (err) {
        alert(err);
    }
}

const mainNode = document.getElementById('main-container');
const menu = document.createElement('div');

menu.setAttribute("id", "main-menu");
mainNode.appendChild(menu);

const node = document.getElementById('main-menu');

// Построение дерево каталога

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

// ----------

getData().then( data => {

    renderTree(data);

    // "Простой аккордион"

    let ulNode = document.querySelector('ul');
    let liNodes = document.querySelectorAll('li');

    ulNode.classList.add('main-ul');

    let ulNodes = document.querySelectorAll('ul');

    for (let i = 0; i < ulNodes.length; i++) {

        if (!ulNodes[i].classList.contains("main-ul")) {
            ulNodes[i].classList.add('panel');
        }

    }

    for (let i = 0; i < liNodes.length; i++) {

        parent = liNodes[i].parentNode;

        if (liNodes[i].dataset) {
            liNodes[i].classList.add('main-li', 'accordion');
        }

    }

    let el2 = document.getElementById('main-container')

    el2.addEventListener('click', (event) => {

        if (!event.target.dataset.file) {

            event.target.classList.contains("active") ? event.target.classList.remove("active") : event.target.classList.add("active");

            let panel = event.target.parentNode.lastChild;

            if (event.target.classList.contains('menu-element')) {

                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            }
        }
    });


} )





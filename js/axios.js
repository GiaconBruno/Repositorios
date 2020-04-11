//CRIAR FUNCAO DE PESQUISAR
var repos = "GiaconBruno";
var tempo = null;

function search() {
    clearTimeout(tempo);
    tempo = setTimeout(function () {
        console.log(tempo);

        repos = document.querySelector('input').value;
        repos = (repos === "") ? "GiaconBruno" : repos;
        runAxios(); //EXECUTA FUNCAO ASSINCRONA
    }, 1000);
}

//CRIA FUNCAO ASSINCRONA
const runAxios = async () => {
    //CRIA ELEMENTO DE ESPERAR CARREGAR
    document.querySelector('#news').innerHTML = `<div class='p-3 mt-5'>
                                                    <h3>Carregando 
                                                        <div id="dv1"></div>
                                                        <div id="dv2"></div>
                                                        <div id="dv3"></div>
                                                    </h3>
                                                </div>`;
    //CRIA SPINNERs COM DALEY
    setTimeout(function () {
        document.querySelector('#dv1').classList = "spinner-grow text-success";
    }, 0);
    setTimeout(function () {
        document.querySelector('#dv2').classList = "spinner-grow text-success";
    }, 125);
    setTimeout(function () {
        document.querySelector('#dv3').classList = "spinner-grow text-success";
    }, 1000);

    await dados();
};

//CRIA FUNCAO GET (BUSCAR DADOS)
function dados() {
    var cont = 0; //VARIAVEL CONTADOR
    var fullW = window.innerWidth;
    axios.get(`https://api.github.com/users/${repos}/repos`)
        .then(function (response) {
            if (response.status === 200) {
                //VARRE TODOS OS DADOS
                response.data.forEach(value => {
                    var { name, description, html_url, has_pages, owner: { avatar_url }, updated_at } = value;

                    //Formatando Data
                    updated_at = updated_at.substr(0, 10);
                    updated_at = updated_at.slice(8, 10) + "/" + updated_at.slice(5, 7) + "/" + updated_at.slice(0, 4);

                    //VERIFICA SE EXISTE GIT-PAGES
                    var icon, link;
                    (has_pages === true) ? icon = 'fa-check' : icon = 'fa-times negative';
                    (has_pages === true) ? link = `https://${repos}.github.io/${name}` : link = `https://github.com//${repos}/${name}`;

                    //VERIFICA CONTEUDO MAIOR QUE O PERMITIDO
                    description === null ? description = "Sem descrição" : description;

                    if (fullW <= 1000) {
                        (description.length > 200) ? description : description.substr(0, 200);
                        (description.length <= 200) ? description : description.substr(0, 200) + "...";
                    } else {
                        description = String(description).substr(0, 300);
                    }

                    //VERIFICA FIRST REGISTRO
                    const content = document.querySelector('#news');
                    (cont === 0) ? content.innerHTML = '' : content.innerHTML;

                    //CRIA ELEMENTO DIV
                    const div = document.createElement("div");
                    //DETERMINA QUE DIV EH ELEMENTO FILHO DE ELEMENTO #NEWS
                    content.appendChild(div);

                    //CRIA CONTEUDO
                    const full = `<a href="${link}" target="_black">
                                <div class="news-bord m-2 text-left d-flex">
                                    <img class="p-2 align-self-center" src="${avatar_url}" />
                                    <div class="text-left py-3 pr-2 conteudo text-break">
                                        <span class="d-flow text-right">${updated_at} </span>
                                        <i class="mr-2 mt-2 float-left text-success fas ${icon} fa-lg"></i>
                                        <span class="text-break mt-3"><strong>${name}</strong></span>
                                        <div class="d-block">
                                            <span class="text-justify text-break">${description}</span>
                                        </div>
                                    </div>
                                </div>
                            </a > `;
                    //SALVA CONTEUDO DENTRO DO ELEMENTO DIV
                    div.innerHTML = full;
                    cont++; //PASSA CONTADOR
                });
            }
        })
        .catch(function (error) {
            //VALIDA SE EXISTE
            console.log(error.message);
            (error.message) === "Request failed with status code 404" ? fail("Repositorio não encontrado!!") : fail(error);
        });
}

function fail(error) {
    document.querySelector('#news').innerHTML = ` <div class="news-bord m-2 text-left d-flex">
                                                    <img class="p-2"
                                                        src="https://avatars1.githubusercontent.com/u/62614331?s=460&u=e9aa99fd52f421775ce472ca665d8f089be5b3ad&v=4" />
                                                    <div class="text-left p-2 pr-3 conteudo">
                                                        <div>
                                                            <h4><strong>Erro ao Carregar</strong></h4>
                                                        </div>
                                                        <div>
                                                            <p class="text-justify">${error}</p>
                                                        </div>
                                                    </div>
                                                </div>`
}

runAxios();
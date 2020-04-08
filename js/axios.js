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
    }, 200);

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
                    var { name, description, html_url, has_pages, owner: { avatar_url } } = value;

                    // //REMOVER LINKS
                    // var first = String(description).indexOf('http://');
                    // var end = String(description).indexOf('.com');
                    // var clear = String(description).slice(first, end + 4);
                    // description = String(description).replace(clear, "");

                    var link = `https://${repos}.github.io/${name}`;
                    //VERIFICA SE EXISTE GIT-PAGES
                    has_pages == true ? link : link = html_url;

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
                                    <img class="p-2" src="${avatar_url}" />
                                    <div class="text-left p-2 pr-3 conteudo text-break">
                                        <div>
                                            <h4><strong>${name}</strong></h4>
                                        </div>
                                        <div>
                                            <p class="text-justify">${description}</p>
                                        </div>
                                    </div>
                                </div>
                            </a > `;
                    //SALVA CONTEUDO DENTRO DO ELEMENTO DIV
                    div.innerHTML = full;
                    cont++;//PASSA CONTADOR
                });
            }
        })
        .catch(function (error) {
            //VALIDA SE EXISTE
            (error.status) === 404 ? fail("Repositorio não encontrado!!") : fail(error);
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
//CRIA FUNCAO ASSINCRONA
const runAxios = async () => {
    //CRIA ELEMENTO DE ESPERAR CARREGAR
    document.querySelector('#news').innerHTML = `<div class='p-3 mt-5'>
                                                    <h3>Carregando 
                                                        <div class='spinner-grow text-success'></div>
                                                        <div class='spinner-grow text-success'></div>
                                                        <div class='spinner-grow text-success'></div>
                                                    </h3>
                                                </div>`;
    await dados();
};
runAxios(); //EXECUTA FUNCAO ASSINCRONA

//CRIA FUNCAO GET (BUSCAR DADOS)
function dados() {
    var cont = 0; //VARIAVEL CONTADOR
    var fullW = window.innerWidth;
    axios.get('https://api.github.com/repositories')
        .then(function (response) {
            //VARRE TODOS OS DADOS
            response.data.forEach(value => {
                var { name, description, html_url, owner: { avatar_url } } = value;

                //REMOVER LINKS
                var first = String(description).indexOf('http://');
                var end = String(description).indexOf('.com');
                var clear = String(description).slice(first, end + 4);
                description = String(description).replace(clear, "");

                //VERIFICA CONTEUDO MAIOR QUE O PERMITIDO
                if (fullW <= 1000) {
                    if (description.length > 135) {
                        description = description.substr(0, 135) + "...";
                    } else {
                        description = description.substr(0, 133);
                    }
                } else {
                    description = String(description).substr(0, 300);
                }

                //VERIFICA FIRST REGISTRO
                const content = document.querySelector('#news');
                if (cont === 0) {
                    content.innerHTML = '';
                }

                //CRIA ELEMENTO DIV
                const div = document.createElement("div");
                //DETERMINA QUE DIV EH ELEMENTO FILHO DE ELEMENTO #NEWS
                content.appendChild(div);

                //CRIA CONTEUDO
                const full = `<a href="${html_url}" target="_black">
                                <div class="news-bord m-2 text-left d-flex">
                                    <img class="p-2" src="${avatar_url}" />
                                    <div class="text-left p-2 pr-3 conteudo">
                                        <div>
                                            <h4><strong>${name}</strong></h4>
                                        </div>
                                        <div>
                                            <p class="text-justify">${description}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>`;
                //SALVA CONTEUDO DENTRO DO ELEMENTO DIV
                div.innerHTML = full;
                cont++;//PASSA CONTADOR
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
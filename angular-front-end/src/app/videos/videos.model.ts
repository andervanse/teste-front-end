export class ListaVideos {
    constructor() {
        this.items = [];
        this.pesquisa = new Pesquisa();
    }

    pesquisa: Pesquisa;
    items: Video[];
}

export class Video {
    constructor() {
        this.imagens = [];
    }

    id: string;
    dataPublicacao: Date;
    titulo: string;
    canal: string;
    descricao: string;    
    imagens: Imagens[];
}

export class Imagens {
    tipo: string;
    urlImagem: string;
    largura: number;
    altura: number;
}

export class Pesquisa {
    texto: string;
    proximaPagina: string;
    paginaAnterior: string;    
}
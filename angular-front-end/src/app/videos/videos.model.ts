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
    canalId: string;
    tituloCanal: string;
    descricao: string;    
    imagens: Imagens[];
    estatisticas: Estatisticas;
}

export class Estatisticas {
    quantidadeViews: number;
    quantidadeLikes: number;
    quantidadeDeslikes: number;
    quantidadeFavoritos: number;
    quantidadeComentarios: number;
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
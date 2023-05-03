class NetworkService{
    //#-значит что переменная приватная
    #url;
    constructor(url){
        this.#url=url;        
    }

    async retrieveFromPath(path){
        return fetch(`${this.#url}/${path}`).then((response) => response.ok && response.json());
    }
    post(){

    }
    delete(){

    }
    put(){

    }
}

export default NetworkService;
//recupera un valore dal localStorage KEY è il nome del dato da recuperare
export const getItemFromLocalStorage = (key:string) => {
    if( localStorage.getItem(key)||"") {
        //lo converte da JSON a oggetto js e restituisce il risultato
        return JSON.parse(localStorage.getItem(key)||"")
    }
    //ritorna null se il valore non esiste
    return null;
};
//salva un valore nel LocalStorage ITEM è l'oggetto o il valore da salvare
export const setLocalStorageItem = (key:string, value:any) => {
        //dopo aver convertito il JSON in stringa salva il valore
        localStorage.setItem(key, JSON.stringify(value));
    
};
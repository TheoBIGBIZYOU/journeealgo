//Vérifier si on peut associer les éléments du tableau pour créer l'objectif (le mot recherché)

const problemesFaciles: {[objectif: string]: Array<string>} =
    {
        "":                 ["bla", "bl", "cl"], //true (pour créer une chaine de caractère vide, pas besoin de données)
        "abcdef":           ["ab", "abc", "cd", "def", "abcd"], //true ()
        "skateboard":       ["bo", "rd", "ate", "t", "ska", "sk", "boar"], //false (on ne peut pas créer le "board" car des lettres se chevauchent sinon)
        "enterapotentpot":  ["a", "p", "ent", "enter", "ot", "o", "t"], //true
    }

const problemesDifficiles: {[objectif: string]: Array<string> } =
    {
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeef": [
            "e",
            "ee",
            "eee",
            "eeee",
            "eeeee",
            "eeeeee",
        ] //false (on ne peut pas créer le "f")
    }

function constructionPossible(
    objectif: string, //mon objectif courrant
    alphabet: Array<string>,
    //memo est un objet qui a pour clé "objectif" de type string et pour valeur un booleen. Et on initialise avec un objet vide
    memo:{[objectif: string]: boolean} = {}
): boolean{
    //Si j'ai déjà un résultat pour objectif dans mon cache, je renvoie le résultat
    if(objectif in memo){
        return memo[objectif];
    }

    //Si mon objectif est une chaine de caractère vide, alors la fonction renvoie toujours vrai
    if(objectif ===""){
        return true;
    }

    //Pour les objectifs normaux qui ne sont pas dans le cache, pour chaque élément
    for(let element of alphabet){
        //si l'objectif commence par cet élément
        if(objectif.indexOf(element)===0){
            //Je reconstruis un sous objectif "reste" qui est l'objectif initial moins l'élément
            const reste = objectif.slice(element.length);
            //Et j'appelle récursivement la fonction avec le sous objectif "reste" en paramètre
            if(constructionPossible(reste, alphabet, memo)){
                //si le sous objectif est constructible, je le mémorise et renvoie true pour continuer
                memo[objectif] = true;
                return true;
            }
        }
    }
    //Si on est arrivé au bout de la boucle sans renvoyer true, alors c'est qu'il n'est pas possible de construire l'objectif.
    //Je mémorise false dans le cache et je renvoie false
    memo[objectif] = false;
    return false;
}


function bench (problemes: {[p: string]: Array<string>}){
    for (const objectif in problemes){
        const alphabet = problemes[objectif];
        //les anti quote (alt gr 7) permettent de ne pas faire de concaténation
        //le $ permet de récupérer la valeur de la variable quand on utilise l'anti quote
        console.log(`"${objectif}"-> ${constructionPossible(objectif, alphabet)}`);
    }
}

bench(problemesFaciles);
bench(problemesDifficiles);
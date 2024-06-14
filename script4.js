/* 
    Biblioteca  (Mediateca con video e audio)

    Classe Libro:
        - titolo;
        - autore;
        - disponibilità (bool)

    Romanzo:
        - genere;
    
    Saggio:
        - argomento;

    Manuali:
        - categoria;
        - edizione;

    1) Crea il metodo per visualizzare i dettagli.
    2) Crea il metodo per il prestito.
    3) Crea il metodo per la restituzione.

    Video:
        - framerate;
    
    Audio:
        - formato;

    1) Implementa il Download.
    2) Ridefinisci il metodo del prestito.
    3) Tenere il conto dei download
*/

// Definisco la Classe Libro
class Item {
    #title;
    #author;
    #isAvailable = true;

    constructor(title, author) {
        this.#title = title;
        this.#author = author;
    }

    set title(title) {
        this.#title = title;
    }

    get title() {
        return this.#title;
    }

    set author(author) {
        this.#author = author;
    }

    get author() {
        return this.#author;
    }

    set isAvailable(isAvailable) {
        this.#isAvailable = isAvailable;
    }

    get isAvailable() {
        return this.#isAvailable;
    }

    showDetails() {
        return `${this.title} è un libro scritto da ${this.author}. Attualmente ${this.isAvailable ? 'è' : 'non è'} disponibile.`;
    }

    rentBook() {
        if (this.isAvailable) {
            this.isAvailable = !this.isAvailable;
            return `Hai ricevuto il libro ${this.title} in prestito`;
        } else {
            return `Attualmente ${this.title} non è disponibile`;
        }
    }

    returnBook() {
        if (!this.isAvailable) {
            this.isAvailable = !this.isAvailable;
            return `Hai restituito correttamente il libro ${this.title}`;
        } else {
            return `Tutti i libri di ${this.title} sono stati restituiti`;
        }
    }
}

// Creo la Classe Romanzo che estende Libro
class Novel extends Item {
   #genre;

    constructor(title, author, genre) {
        super(title, author);
        this.#genre = genre;
    }

    set genre(genre) {
        this.#genre = genre;
    }

    get genre() {
        return this.#genre;
    }

    showDetails() {
        return `${super.showDetails()} E' di genere ${this.genre}.`;
    }
}

// Creo la Classe Saggio che estende Libro
class Essay extends Item {
    #topic;

    constructor(title, author, topic) {
        super(title, author);
        this.#topic = topic;
    }

    showDetails() {
        return `${super.showDetails()} Tratta di ${this.topic}.`;
    }

    set topic(topic) {
        this.#topic = topic;
    }

    get topic() {
        return this.#topic;
    }

}

// Creo la Classe Manuale che estende Libro
class Manual extends Item {
    #category;
    #edition;

    constructor(title, author, category, edition) {
        super(title, author);
        this.#category = category;
        this.#edition = edition;
    }

    set category(category) {
        this.#category = category;
    }

    get category() {
        return this.#category;
    }

    set edition(edition) {
        this.#edition = edition;
    }

    get edition() {
        return this.#edition;
    }

    showDetails() {
        return `${super.showDetails()} Riguarda di ${this.category} ed è la sua ${this.edition} edizione.`;
    }
}

// Creo la Classe Digitale che estende Book
class Digital extends Item {
    #numDownloads = 0;

    constructor(title, author) {
        super(title, author);
    }

    set numDownloads(numDownloads) {
        this.#numDownloads = numDownloads;
    }

    get numDownloads() {
        return this.#numDownloads;
    }

    showDetails() {
        return `L'autore di ${this.title} è ${this.author}`;
    }

    rentBook() {   
        this.numDownloads++;
        return `Hai scaricato correttamente ${this.title}`;
    }

    returnBook() {
        return `Non è possibile effettuare il reso di ${this.title}`;
    }


}

// Creo la Classe Video che estende Digital
class Video extends Digital {
    #framerate
    
    constructor(title, author, framerate) {
        super(title, author);
        this.#framerate = framerate;
    }

    set framerate(framerate) {
        this.#framerate = framerate;
    }

    get framerate() {
        return this.#framerate;
    }

    showDetails() {
        return `${super.showDetails()} ed ha un framerate di ${this.framerate}.`
    }
    
}

// Creo la Classe Audio che estende Book
class Audio extends Digital {
    #format;

    constructor(title, author, format) {
        super(title, author);
        this.#format = format;
    }

    set format(format) {
        this.#format = format;
    }

    get format() {
        return this.#format;
    }

    showDetails() {
        return `${super.showDetails()} ed è ascoltabile nel formato ${this.format}`;
    }
}

// Creo un libro di genere Romanzo
const novel1 = new Novel('Il signore degli anelli', 'J.R.R. Tolkien', 'Fantasy');

// Creo un libro di genere Essay
const essay1 = new Essay('Il potere del pensiero positivo', 'Norman Vincent Peale', 'psicologia positiva');

// Creo un libro di genere Manual
const manual1 = new Manual('JavaScript: The Good Parts', 'Douglas Crockford', 'programmazione', 'prima');

// Creo un Video
const video1 = new Video('The Prestige', 'Christopher Nolan', 24);

// Creo un Audio
const audio1 = new Audio('Bohemian Rhapsody', 'Queen', 'MP3');

console.log(novel1.showDetails());
console.log(novel1.rentBook());
console.log(novel1.rentBook( ));

console.log(essay1.showDetails());
console.log(essay1.returnBook());


console.log(manual1.showDetails());

console.log(video1.rentBook());
console.log(video1.numDownloads);
console.log(video1.showDetails());

console.log(audio1.rentBook());
console.log(audio1.rentBook());
console.log(audio1.rentBook());
console.log(audio1.rentBook());
console.log(audio1.showDetails());

console.log(audio1.numDownloads);
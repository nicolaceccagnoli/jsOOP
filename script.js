// Programmazione ad Oggetti con le Classi

// Creo una Classe Utente
class User {

    name;
    surname;
    IdNumber;

    constructor(name, surname, IdNumber) {
        this.name = name;
        this.surname = surname;
        this.IdNumber = IdNumber;
    }

    sayHi() {
        console.log('Ciao il mio nome è: ' + this.name + ' ' + this.surname + ' ' + 'e ho la tessera numero ' + this.IdNumber);
    }
}

// Creo una Classe Person
class Person{
    name;
    surname;
    #isAlive = true;

    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }

    presentation() {
        console.log(`Ciao sono ${this.name}`);
        if (this.#isAlive) {
            console.log('Sono vivo')
        } else {
            console.log('Sono morto')
        }
    }

    get isAlive() {
        return this.#isAlive;
    }
}

// Creo una Classe Studente che estende Persona
class Student extends Person {
    course;
    matrixNumber;

    constructor(name, surname, course, matrixNumber) {
        super(name, surname);
        this.course = course;
        this.matrixNumber = matrixNumber;
    }

    doExam(materia) {
        console.log(`Oggi deveo fare l'esame di ${materia}`)
    }

    imAlive() {
        if (this.isAlive) {
            console.log(`${this.name} è vivo`);
        } else {
            console.log(`${this.name} è morto`);
        }
    }

    presentation() {
        console.log(`Frequento il corso di ${this.course}`);
    }
}

// Creo una classe Teacher che estende Person
class Teacher extends Person {
    subject;

    constructor(name, surname, subject) {
        super(name, surname);
        this.subject = subject;
    }

    applyVotes() {
        console.log(`Ho corretto le verifiche di ${this.subject}`);
    }

    presentation() {
        console.log(`Salve, mi chiamo ${this.name} e insegno ${this.subject}`);
        this.applyVotes();
    }
}

// Creo una classe Assistente che estende Studente
class Assistant extends Student {
    assistito;

    constructor(name, surname, course, matrixNumber, assistito) {
        super(name, surname, course, matrixNumber);
        this.assistito = assistito;
    }
}

// Creo un istanza della Classe Utente
let user1 = new User('Nicola', 'Ceccagnoli');
let user2 = new User('Mario', 'Rossi', '0002');


user1.IdNumber = '0001';

console.log(user1);
console.log(user2);

user1.sayHi();
user2.sayHi();

let person1 = new Person('Bruno', 'Bianchi');

console.log(person1);

person1.presentation();

let student1 = new Student('Theo', 'Hernandez', 'Ingegneria', '1111');

console.log(student1);

student1.doExam('Informatica');
student1.presentation();

student1.imAlive();

let professor1 = new Teacher('Zlatan', 'Ibrahimovic', 'Filosofia');

console.log(professor1);

// professor1.applyVotes();
professor1.presentation();

let assistant1 = new Assistant('Paolo', 'Pagliacci', 'Informatica', '2222', professor1);

console.log(assistant1);

assistant1.presentation();
assistant1.doExam('Matematica'); 
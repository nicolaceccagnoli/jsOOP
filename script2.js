/*
    All'interno di un'azienda abbiamo dei dirigenti, dei dipendenti e 
    degli stagisti. 
    Dirigenti e dipendenti hanno una tariffa oraria;
    gli stagisti hanno un forfait mensile;
    I dirigenti hanno un bonus annuale variabile;
        - Scrivere un metodo che calcola lo stipendio mensile di dirigenti, dipendenti e stagisti;
        - Scrivere un metodo che calcola lo stipendio annuale di ciascuno
    
    SOLO i dirigenti hanno una sezione che dirigono
    SOLO gli impiegati hanno un capo
*/

// Creo una Classe Person
class Worker {
    name;
    surname;
    hourlyRate;

    constructor(name, surname, hourlyRate) {
        this.name = name;
        this.surname = surname;
        this.hourlyRate = hourlyRate;
    }

    presentation() {
        return `Ciao sono ${this.name}`;
    }

    // Definisco una funzione per calcolare lo stipendio mensile
    getMonthlySalary() {
        return (this.hourlyRate * 8) * 20;
    }

    getAnnualSalary() {
        return this.getMonthlySalary() * 12;
    }

}

// Creo una classe Manager estendendo Person
class Manager extends Worker{
    section;
    bonus;

    constructor(name, surname, hourlyRate, section, bonus) {
        super(name, surname, hourlyRate);
        this.section = section;
        this.bonus = bonus;
    }

    toHire() {
        console.log('Dobbiamo trovare nuovi dipendenti')
    };

    toFire() {
        console.log('Ci sono alcuni licenziamenti da fare')
    };

    getAnnualSalary() {
        let noBonus = super.getAnnualSalary();

        let bonus = (noBonus * this.bonus) / 100;

        return noBonus + bonus;
    }

}

// Creo una classe Employee estendendo Person
class Employee extends Worker {
    supervisor;
    
    constructor(name, surname, hourlyRate, supervisor) {
        super(name, surname, hourlyRate);
        this.supervisor = supervisor;
    }

    toComplain() {
        console.log('Ho troppo lavoro da fare');
    }


}

// Creo una classe Stagista estendendo Person
class Stagist extends Employee {
    forfait;

    constructor(name, surname, supervisor, forfait, hourlyRate = 0) {
        super(name, surname, hourlyRate, supervisor);
        this.forfait = forfait;
    }

    getMonthlySalary() {
        if (this.hourlyRate === 0) {
            return this.forfait
        } else {
            return super.getMonthlySalary();
        }
    }

}

const manager1 = new Manager('Nicola', 'Ceccagnoli', 12, 'Ricerca & Sviluppo', 50);

// console.log(`Lo stipendio mensile di ${manager1.name} ${manager1.surname} è di ${manager1.getMonthlySalary()},00 €`);
// console.log(`Lo stipendio annuale di ${manager1.name} ${manager1.surname} è di ${manager1.getAnnualSalary()},00 €`);


const employee1 = new Employee('Mario', 'Rossi', 8, manager1);

// console.log(`Lo stipendio mensile di ${employee1.name} ${employee1.surname} è di ${employee1.getMonthlySalary()},00 €`);
// console.log(`Lo stipendio annuale di ${employee1.name} ${employee1.surname} è di ${employee1.getAnnualSalary()},00 €`);

const stagist1 = new Stagist('Gianluca', 'Verdi', employee1, 500);

// console.log(`Lo stipendio mensile di ${stagist1.name} ${stagist1.surname} è di ${stagist1.getMonthlySalary()},00 €`);
// console.log(`Lo stipendio annuale di ${stagist1.name} ${stagist1.surname} è di ${stagist1.getAnnualSalary()},00 €`);

let workersArray = [manager1, employee1, stagist1];

// for (let i = 0; i < workersArray.length; i++) {
//     console.log(`Lo stipendio mensile di ${workersArray[i].name} ${workersArray[i].surname} è di ${workersArray[i].getMonthlySalary()},00 €`);
//     console.log(`Lo stipendio annuale di ${workersArray[i].name} ${workersArray[i].surname} è di ${workersArray[i].getAnnualSalary()},00 €`);
// }

workersArray.forEach(worker => {
    console.log(worker.presentation());
    console.log(`Lo stipendio mensile di ${worker.name} ${worker.surname} è di ${worker.getMonthlySalary()},00 €`);
    console.log(`Lo stipendio annuale di ${worker.name} ${worker.surname} è di ${worker.getAnnualSalary()},00 €`);
})
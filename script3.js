/*
    Abbiamo un sistema di prenotazione di viaggi e vari mezzi di trasporto (aereo, treno, bus).
    Il sistema deve essere in grado di calcolare il costo del viaggio, la durata stimata e gestire la prenotazione.
    
    In base al viaggio l'agenzia viaggi avrà una percentuale

    Aggiungere una descrizione del mezzo

    Il Veicolo ha le seguenti proprietà:
        - capienza
        - numero prenotati
        - km/h
        - €/km
        - tipo
        - modello
        - consumo l/km
        - fuel
        - €/l fuel
        - servizi[]

    e i seguenti metodi:

        calcola costo viaggio (passeggero)
        calcola costo viaggio (azienda)
        calcola durata stimata (distanza e km/h)
        aggiungi prenotazione/i
        rimuovi prenotazione/i
        vedi dettaglio

    Le classi figlie saranno:

        - Airplane
        - Train
        - Bus
*/

// Creo la classe Fuel
class Fuel {
    constructor(name, priceL) {
        this.name = name;
        this.priceL = priceL;
    }
}

// Creo la Classe Veicolo   
class Vehicle {
    #type;
    model;
    capacity;
    #reservations = 0; 
    speedKmH
    consumptionLKm;
    fuel;
    services = [];
    incrementPC;

    constructor(type, model, capacity, speedKmH, consumptionLKm, fuel, services, incrementPC) {
        this.#type = type;
        this.model = model;
        this.capacity = capacity;
        this.speedKmH = speedKmH;
        this.consumptionLKm = consumptionLKm;
        this.fuel = fuel;
        this.services = services;
        this.incrementPC = incrementPC;
    }

    get type() {
        return this.#type;
    }

    set type(type) {
        this.#type = type
    }

    get reservations() {
        return this.#reservations;
    }

    set reservations(reservations) {
        this.#reservations = reservations
    }


    calcPassengerPrice(distance) {
        // Prezzo del carburante diviso capienza
        // Maggiorato di 50%
        let basePrice = this.calcCompanyPrice(distance) / this.capacity;

        return ((basePrice * this.incrementPC) / 100)+ basePrice;
    }

    calcCompanyPrice(distance) {
        // Consumo per distanza
        let neededFuel = this.consumptionLKm * distance;

        return neededFuel * this.fuel.priceL;
    }

    calcAvgTimeH(distance) {
        let timeInMinutes = (distance / this.speedKmH) * 60;
        let minutes = timeInMinutes % 60;
        let hours = (timeInMinutes - minutes) / 60;

        return hours + ' ore e ' + minutes.toFixed() + ' minuti';
    }

    makeReservation(numPerson) {
        let availability = this.capacity - this.#reservations;

        if (availability === 0) {
            console.log('Impossibile completare la prenotazione, non ci sono più posti disponibili')
            return false;
        } 
        
        if(numPerson <= availability) {
            this.#reservations += numPerson;
            console.log(`Prenotazione effettuata, ci sono ancora ${availability} posti disponibili`)
            return true;
        } else {
            console.log(`Impossibile effettuare la prenotazione, ci sono soltanto ${availability} posti disponibili `)
            return false;
        }
    }

    removeReservation(numPerson) {
        let availability = this.capacity - this.#reservations;

        if (this.#reservations === 0) {
            console.log('Non ci sono ancora prenotazioni')
        } else if (this.#reservations >= numPerson) {
            this.#reservations -= numPerson;
            console.log(`Rimozione effettuata, ci sono ancora ${availability} posti disponibili`)
            return true;
        }
        return false;
    }

    showDetails() {
        console.log(`Il tipo di mezzo è un ${this.type}, il modello è ${this.model} e utilizza un carburante di tipo ${this.fuel.name}. Il numero massimo di passeggeri che può ospitare è ${this.capacity}, mentre attualmente prenotati sono ${this.#reservations}. Offre i seguenti servizi: ${this.services.join(', ')}`);
    }

}

// Creo la classe Airplane che estende Vehicle
class Airplane extends Vehicle {
    defaultConsumptionL;
    constructor (type, model, capacity, speedKmH, consumptionLKm, fuel, services, defaultConsumptionL) {
        let incrementPC = 80;
        super(type, model, capacity, speedKmH, consumptionLKm, fuel, services, incrementPC)
        this.defaultConsumptionL = defaultConsumptionL;
    }

    calcCompanyPrice(distance) {

        console.log('company price aereo');

        let initialPrice = super.calcCompanyPrice(distance);
        let additionalPrice = this.defaultConsumptionL * this.fuel.priceL;

        return additionalPrice + initialPrice;
    }
}

// Creo la classe Treno che estende Vehicle
class Train extends Vehicle {
    constructor (type, model, capacity, speedKmH, consumptionLKm, fuel, services) {
        let incrementPC = 50;
        super(type, model, capacity, speedKmH, consumptionLKm, fuel, services, incrementPC)
    }
}

// Creo la classe Bus che estende Vehicle
class Bus extends Vehicle {
    constructor (type, model, capacity, speedKmH, consumptionLKm, fuel, services) {
        let incrementPC = 20;
        super(type, model, capacity, speedKmH, consumptionLKm, fuel, services, incrementPC)
    }
}



const fuel1 = new Fuel('Jet Fuel', 1.5);
const fuel2 = new Fuel('Diesel', 2.075)

const airplane1 = new Airplane('Aereo', 'Boeing 747', 600, 988, 12, fuel1, ['WC', 'TV', 'Pasti', 'Wi-Fi'], 5000);

const train1 = new Train('Treno', 'Frecciarossa', 450, 360, 90, fuel2, ['WC', 'Bar', 'Wi-Fi', 'Ristorante']);

const bus1 = new Bus('Autobus', 'Neoplan Skyliner', 60, 120, 2, fuel2, ['WC', 'Wi-Fi', 'Spazio bagagli']);

const arrayVehicles = [airplane1, train1, bus1];

arrayVehicles.forEach(vehicle => {
    console.log('Costo viaggio per passeggero: ' + parseFloat(vehicle.calcPassengerPrice(100).toFixed(2)));
    // console.log('Costo viaggio per compagnia: '+ parseFloat(vehicle.calcCompanyPrice(100).toFixed(2)));
    console.log(vehicle.calcAvgTimeH(100));
    console.log(vehicle.showDetails());
})

console.log(airplane1.makeReservation(12), airplane1.reservations, airplane1.capacity)

console.log(airplane1.removeReservation(2), airplane1.reservations, airplane1.capacity)

console.log(airplane1.removeReservation(10), airplane1.reservations, airplane1.capacity)

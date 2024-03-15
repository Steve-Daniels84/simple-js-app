let favouriteFood = 'Buffalo Chicken Wings... YUM!';

let car = {
    make: 'Ford',
    model: 'Puma',
    color: 'Red',
    mileage: 1000
};

alert('Hello World..');

document.write(favouriteFood);

car['model'] = 'SEAT';

document.write(
    ` ${car.make} 
    ${car.model} 
    ${car.color} 
    ${car.mileage}`
    );

let cars = [
    {make: 'Ford', model: 'Fiesta', bhp: 50},
    {make: 'Seat', model: 'Leon', bhp: 180},
    {make: 'Citroen', model: '2CV', bhp: 10}
];

let carsVar = length(cars);

document.write(cars[1]['make']);

document.write(carsVar);

#Exercises

from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")

    @abstractmethod
    def wheels(self):
        pass

class Car(Vehicle):
    def wheels(self):
        return 4

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def wheels(self):
        return 8

    def describe(self):
        print(f"{self.make} {self.model} (Capacity = {self.capacity})")


car = Car("Toyota", "Corolla")
truck = Truck("Volvo", "FH16", 12)

vehicles = [
    Car("Car1", "Ford"), Car("Car2", "BYD"), Truck("Truck1", "FH12", 8), Truck("Truck2", "Sino", 20)
]

car.describe()
truck.describe()
print(f"{car.wheels()} wheels.")
print(f"{truck.wheels()} wheels.")

print("\n----------------------------------------\n")

for vehicle in vehicles:
    vehicle.describe()
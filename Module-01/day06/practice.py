# Exercise 1
class ReportBuilder:
    def build_report(self):
        print("Bulding report...")

class ReportSaver:
    def save_report(self):
        print("Saving report...")

class ReportEmailer:
    def email_report(self):
        print("Emailing report...")


# Exercise 2
from abc import ABC, abstractmethod

class Shape(ABC):

    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side
       
    def area(self):
        return self.side ** 2     

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

# Test
# shapes = [Circle(3), Square(4), Triangle(6, 8)]
# for shape in shapes:
#     print(shape.area())


# Exercise 3
class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)

        return cls._instance
    def __init__(self):
        if not hasattr(self, "_initialized"):
            self.currency = "ETB"
            self._initialized = True

# Test
# settings1 = AppSettings()
# settings2 = AppSettings()
# print(settings1 is settings2)


# Exercise 4
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side
       
    def area(self):
        return self.side ** 2     

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

class ShapeFactory:
    @staticmethod
    def create(kind, *args):
        if kind.lower() == "circle":
            return Circle(*args)
        elif kind.lower() == "square":
            return Square(*args)
        elif kind.lower() == "triangle":
            return Triangle(*args)
        else:
            return None

# Test
# circle = ShapeFactory.create("CIRCLE", 6)
# square = ShapeFactory.create("square", 8)
# triangle = ShapeFactory.create("Triangle", 4, 5)

# print(circle.area())
# print(square.area())
# print(triangle.area())


# Exercise 5
from abc import ABC, abstractmethod

class NewsAgency:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def publish(self, news):
        for subscriber in self.subscribers:
            subscriber.receive(news)

class Subscriber(ABC):
    @abstractmethod
    def receive(self, news):
        pass

class EmailSubscriber(Subscriber):
    def receive(self, news):
        print(f"Email: {news}")

class SMSSubscriber(Subscriber):
    def receive(self, news):
        print(f"SMS: {news}")

# Test
agency = NewsAgency()
sms = SMSSubscriber()
email = EmailSubscriber()

agency.subscribe(sms)
agency.subscribe(email)

agency.publish("New version of Python released!")
# Exercise -1

# class Book:
#     def __init__(self, title, author, pages):
#         self.title = title
#         self.author = author
#         self.pages = pages
    
#     def describe(self):
#         print(f"{self.title} by {self.author} ({self.pages} pages).")

# book1 = Book("Fikir Eskemekabr", "Addis Alemayehu", 550)
# book2 = Book("Emegua", "Dr. Alemayehu Wase", 270)

# print(book1.describe())
# print(book2.describe())

#Exercise -2
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, n):
        self.__quantity += n

    def sell(self, n):
        if n <= self.__quantity:
            self.__quantity -= n
        else:
            print("Not enough stock available.")

product1 = Product("Phone", 44000, 4)
product2 = Product("Milk", 200, 8)

product1.restock(6)
product2.sell(2)

print(product1.quantity)
print(product2.quantity)

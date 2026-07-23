#Exercises
#Unique cities

# cities = ["Addis Ababa", "Hawassa", "Mekelle", "Adama", "Hawassa", "Mekelle"]
# unique_cities = set(cities)

# print(f"All cities: {cities} (Total: {len(cities)}) \n")
# print(f"Unique cities: {unique_cities} (Total: {len(unique_cities)})")

#Price report

# grocery_items = {"Pasta": 120, "Enjera": 40, "Macaroni": 200, "Tomato": 50, "Avocado": 100}

# for item, price in grocery_items.items():
#     print(f"Item: {item}\t Price: {price} ETB.")

#Tax comprehension

# prices = [100, 250, 400, 80]

# tax_added = [price + price * 0.15 for price in prices]

# print(tax_added)

#Cheap items

# prices = [100, 250, 400, 80]

# cheap_items = [price for price in prices if price < 200]

# print(cheap_items)

# Write & read
# with open("names.txt", "w") as names_file:
#     names_file.write("Dawit Tesfaye \n")
#     names_file.write("Selam Dereje \n")
#     names_file.write("Tesfa Kebede \n")

# with open("names.txt") as names_file:
    # for line in names_file:
    #     print(line.strip())

#Safe division

try:
    number = int(input("Please Enter The Number: "))
    result = 1000 / number
except ValueError:
    print("The input value must be a number.")
except ZeroDivisionError:
    print("The number can't be zero.")
else:
    print(result)
finally:
    print("Done!")

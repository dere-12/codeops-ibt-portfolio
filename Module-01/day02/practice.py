# Exercise 1

def split_bill(total_bill, people_num):
    bill = total_bill / people_num
    for i in range(1, people_num+1):
        print(f"person-{i} -> {bill}" )

split_bill(20, 4)



#Exercise 2

# Temperature labe
# temprature = int(input("Please Enter Temprature in °C: "))
# if temprature < 15:
#     print("cold")
# elif temprature >= 15 and temprature <= 28:
#     print("warm")
# else:
#     print("hot")

# Receipt loop
# for i in range(1, 11):
#     print(f"Recipt #{i}")

# Even numbers
# for i in range(1, 20):
#     if i % 2 == 0:
#         print(i)


# Discount function
# def  apply_discount(price, percent=0.1):
#     return price - price * percent

# print(apply_discount(10))
# print(apply_discount(100, 0.2))

# Countdown
# count = 5
# while count >= 0:
#     if count == 0:
#         print("Liftoff")
#         break
#     print(count)
#     count -= 1
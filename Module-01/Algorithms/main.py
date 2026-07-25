# Question 1: Given an array of numbers, write a function that prints in the console another array which contains all the even numbers in the original array, which also have even indexes only.

def get_only_evens(arr):
    even_items = []
    for i, item in enumerate(arr):
        if i % 2 == 0 and item % 2 == 0:
            even_items.append(item)
    return even_items

# Test
# print(get_only_evens([1, 2, 3, 6, 4, 8]))
# print(get_only_evens([0, 1, 2, 3, 4]))




#Question 2: ● Create a function that takes number as a parameter and prints "Ok" in the console if the given string is greater than its reversed digit version. If not, the function will print "Not ok"

def reverse_compare(num):

    num_str = str(num)
    numbers = []
    for n in num_str:
        numbers.append(n)

    numbers.reverse()

    reverse_num = ""
    for number in numbers:
        reverse_num += number

    if num > int(reverse_num):
        print("Ok")
    else:
        print("Not ok")

# Test
# reverse_compare(72) 
# reverse_compare(23)  
# reverse_compare(8623)  




# Question 3: ● Write a function that takes a positive integer and returns the factorial of the number. Notes: The factorial of 0 is 1. Ex: factorial seven is : 1 × 2 × 3 × 4 × 5 × 6 × 7. The factorial of any positive integer x is x * (x - 1) * (x - 2) * . . . . . . * 1 (ex: factorial of 4 is 4 * 3 * 2 * 1 = 24)

def return_factorial(n):
    if n <= 1:
        return 1

    return n * return_factorial(n -1)

# Test
# print(return_factorial(0))
# print(return_factorial(1))
# print(return_factorial(6))
# print(return_factorial(5))




# Question 4: ● A Meera array is defined to be an array containing only numbers as its elements and forall n values in the array, the value n*2 is not in the array. So [3, 5, -2] is a Meera array because 3*2, 5*2 or 2*2 are not in the array. But [8, 3, 4] is not a Meera array because 2*4=8 and both 4 and 8 are elements found in the array. Write a function that takes an array of numbere elements and prints “I am a Meera array” in the console if its array does NOT contain n and also n*2 as value. Otherwise, the function prints “I am NOT a Meera array”

def check_meera(num_arr):  
    for num in (num_arr):
        if num * 2 in num_arr:
            return num     
    return 1

# Test
# meera = check_meera([1, -6, 4, -3])
# if meera == 1:
#     print("I am a Meera array")
# else:
#     print(f"I am NOT a Meera array because {meera} * 2 is {meera * 2} ")




# Question 5:  Define a Dual array to be an array where every value occurs exactly twice. For example, {1, 2, 1, 3, 3, 2} is a dual array.The following arrays are not Dual arrays {2, 5, 2, 5, 5} (5 occurs three times instead of two times) {3, 1, 1, 2, 2} (3 occurs once instead of two times) Write a function named isDual that returns 1 if its array argument is a Dual array. Otherwise it returns 0.

def isDual(arr):
    for item in arr:
        if arr.count(item) != 2:
            return 0
    return 1

# Tesst
# print(isDual([1, 2, 1, 3, 3, 2]))
# print(isDual([2, 5, 2, 5, 5]))




# Question 6: ● Write a function that takes the number of seconds and returns the digital format clock time as a string. Time should be counted from 00:00:00.

def digital_clock(seconds):
    seconds = seconds % (24 * 3600)
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60

    return f"{hours:02}:{minutes:02}:{secs:02}"


# Test
# print(digital_clock(5025))
# print(digital_clock(61201))
# print(digital_clock(87000))
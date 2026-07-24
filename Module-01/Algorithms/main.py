#Question 1

def get_only_evens(arr):
    even_items = []
    for i, item in enumerate(arr):
        if i % 2 == 0 and item % 2 == 0:
            even_items.append(item)
    return even_items

# Test
# print(get_only_evens([1, 2, 3, 6, 4, 8]))
# print(get_only_evens([0, 1, 2, 3, 4]))




#Question 2

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




# Question 3

def return_factorial(n):
    if n <= 1:
        return 1

    return n * return_factorial(n -1)

# Test
# print(return_factorial(0))
# print(return_factorial(1))
# print(return_factorial(6))
# print(return_factorial(5))




# Question 4
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




# Question 5

def isDual(arr):
    for item in arr:
        if arr.count(item) != 2:
            return 0
    return 1

# Tesst
# print(isDual([1, 2, 1, 3, 3, 2]))
# print(isDual([2, 5, 2, 5, 5]))




# Question 6

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
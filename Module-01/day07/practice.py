# Exercise 1
import time

accounts_list = []
accounts_dic = {}
for i in range(1, 100001):
    accounts_list.append(f"ACC{i:06}")

for i in range(1, 100001):
    accounts_dic[f"ACC{i:06}"] = f"Customer {i}"

targer = "ACC100000"

# Test
# start = time.perf_counter()
# index = accounts_list.index(targer)
# end = time.perf_counter()
# print(f"List lookup took {end - start:.8f} seconds")
# print(f"Found at index {index}")

# start = time.perf_counter()
# customer = accounts_dic[targer]
# end = time.perf_counter()
# print(f"Dictionary lookup took {end - start:.8f} seconds")
# print(customer)



# Exercise 2
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.items:
            return self.items.pop()
        return None

    def peek(self):
        if self.items:
            return self.items[-1]
        return None

names = ["John", "Sara", "David", "Helen"]
stack = Stack()
for name in names:
    stack.push(name)

reversed_names = []

while stack.peek() is not None:
    reversed_names.append(stack.pop())

# Test
# print(reversed_names)



# Exercise 3
from collections import deque

queue = deque()

queue.append("John")
queue.append("Abel")
queue.append("Dawit")
queue.append("Kebede")

# Test 
# while queue:
#     customer = queue.popleft()
#     print(f"Serving {customer}")



# Exercise 4
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self): 
        current = self.head

        while current is not None:
            print(current.data)
            current = current.next

# Test
# li = LinkedList()
# li.push_front("Abel")
# li.push_front("Selam")
# li.push_front("Dawit")
# li.push_front("Teme")

# li.print_all()
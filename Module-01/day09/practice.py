# Exercise 1 and 2
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.right, value)

    else:
        root.right = insert(root.right, value)

    return root

def inorder(root):
    if root is not None:
        inorder(root.left)
        print(root.value)
        inorder(root.right)

# Exercise 2
def height(node):
    if node is None:
        return 0

    left_height = height(node.left)
    right_height = height(node.right)

    return 1 + max(left_height, right_height)


# Test: Exercise 1 and 2
# root = None
# balances = [500, 300, 700, 200, 400, 600, 800]
# for balance in balances:
#     root = insert(root, balance)

# inorder(root)
# print("\n......Exercise 2.......\n")
# print(height(root))



# Exercise 3
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])

    while queue:
        vertex = queue.popleft()
        if vertex not in visited:
            visited.add(vertex)
            for neighbor in graph[vertex]:
                queue.append(neighbor)
    return visited

# Test
# graph = {
#     "A": ["B", "C"],
#     "B": ["D", "E"],
#     "C": ["F"],
#     "D": [],
#     "E": ["F"],
#     "F": []
# }

# print(bfs(graph, "A"))



# Exercise 4
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()

    visited.add(start)
    print(start)

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited

# Test
# graph = {
#     "A": ["B", "C"],
#     "B": ["D", "E"],
#     "C": ["F"],
#     "D": [],
#     "E": ["F"],
#     "F": []
# }

# dfs(graph, "A")



# Exercise 5
import heapq

tasks = []

heapq.heappush(tasks, (3, "Reply to emails"))
heapq.heappush(tasks, (1, "Fix production bug"))
heapq.heappush(tasks, (5, "Watch YouTube"))
heapq.heappush(tasks, (2, "Attend meeting"))
heapq.heappush(tasks, (4, "Write documentation"))

# Test
# while tasks:
#     priority, task = heapq.heappop(tasks)
#     print(priority, task)
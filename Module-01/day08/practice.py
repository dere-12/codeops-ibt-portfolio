# Exercise 1
def total(nums):
    if len(nums) == 0:
        return 0
    return nums[0] + total(nums[1:])

def count_down(n):
    if n == 0:
        return
    print(n)
    count_down(n -1)

# Test
# numbers = [1, 3, 4, 6]
# print(total(numbers))
# count_down(10)



# Exercise 2
def binary_search(items, target):
    low = 0
    high = len(items) -1 

    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

# Test
# nums = [1, 3, 4, 6, 10]
# print(binary_search(nums, 10))
# print(binary_search(nums, 0))



# Exercise 3
def merge(left, right):
    merged = []
    i = 0
    j = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])

    return merged

def merge_sort(items):
    if len(items) <= 1:
        return items

    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    return merge(left, right)

# Test
# nums = [8, 4, 2, 9, 0, 6, -7, 12, 3]
# print(merge_sort(nums))



# Exercise 4
accounts = {
    ("Helen",  30),
    ("Belay", 10),
    ("Dawit", 80),
    ("Sisay", 60)
}

sorted_accounts = sorted(accounts, key=lambda account: account[1], reverse=True)

# Test
# print(sorted_accounts)



# Exercise 5
def has_pair(nums, target):
    left = 0
    right = len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return False

# Test
# nums = [8, 4, 2, 9, 6, 12, 3]
# print(has_pair(nums, 6))
# print(has_pair(nums, 15))
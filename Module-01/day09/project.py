from abc import ABC, abstractmethod

class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self.observers = []
        self.history = []

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, value):
        self.__balance = value

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            self.notify(f"{amount} ETB deposited successfully.")
            self.history.append(f"{amount} ETB deposited.")
        else:
            self.notify("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount <= 0:
            self.notify("Withdrawal amount must be positive.")
        elif amount > self.__balance:
            self.notify("Insufficient balance.")
        else:
            self.__balance -= amount
            self.notify(f"{amount} ETB withdrawn successfully.")
            self.history.append(f"{amount} ETB withdrawn.")

    def statement(self):
        print(f"""
        Account Type : Account
        Owner        : {self.owner}
        Account No.  : {self.account_number}
        Balance      : {self.balance}
        """)

    def subscribe(self, observer):
        self.observers.append(observer)

    def notify(self, message):
        for observer in self.observers:
            observer.send(message)

    def undo_last(self):
        if self.history:
            return self.history.pop()
        else:
            self.notify("No transaction history to undo.")

class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance, rate):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest) 

    def statement(self):
        print(f"""
        Account Type : Saving Account
        Owner        : {self.owner}
        Account No.  : {self.account_number}
        Balance      : {self.balance}
        """)

class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance, overdraft):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= 0:
            self.notify("Withdrawal amount must be positive.")
        elif amount > self.balance + self.overdraft:
            self.notify("Insufficient balance.")
        else:
            self.balance -= amount
            self.notify(f"{amount} ETB withdrawn successfully.")
            self.history.append(f"{amount} ETB withdrawn.")
    def statement(self):
        print(f"""
        Account Type : Current Account
        Owner        : {self.owner}
        Account No.  : {self.account_number}
        Balance      : {self.balance}
        """)

class AlertService(ABC):
    @abstractmethod
    def send(self, message):
        pass

class SMSAlert(AlertService):
    def send(self, message):
        print(f"SMS Alert: {message}")

class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance, extra):
        if kind.lower() == "savings":
            return SavingsAccount(owner, number, balance, extra)
        if kind.lower() == "current":
            return CurrentAccount(owner, number, balance, extra)
        else:
            return None

class AccountRegistry:
    def __init__(self):
        self.accounts = {}

    def add(self, account):
        self.accounts[account.account_number] = account

    def find(self, account_number):
        return self.accounts[account_number]
    
    def list_all(self):
        for account in self.accounts.values():
            account.statement()

    def top_by_balance(self, n):
        sorted_accounts = sorted(self.accounts.values(), key=lambda account: account.balance, reverse=True)
        top_accounts = sorted_accounts[:n]
        for top_account in top_accounts:
            top_account.statement()

    def binary_search(self, acc_numbers, target):
        lo = 0
        hi = len(acc_numbers) - 1

        while lo <= hi:
            mid = (lo + hi) // 2
            if acc_numbers[mid] == target:
                return mid
            elif acc_numbers[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return -1
    
    def find_by_number(self, acc_num):
        sorted_acc_numbers = sorted(self.accounts.keys())
        index_of_target = self.binary_search(sorted_acc_numbers, acc_num)

        if index_of_target == -1:
            return None
        
        acc_number = sorted_acc_numbers[index_of_target]
        return self.accounts[acc_number]
    
    def total_transactions(self, acc_num):
        account = self.find_by_number(acc_num)
            
        if account is None:
            return 0

        def count_transaction(history):
            if len(history) == 0:
                return 0
            return 1 + count_transaction(history[1:])
        
        return count_transaction(account.history)

class Branch:
    def __init__(self, name, balance):
        self.name = name
        self.balance = balance
        self.children = []

    def add_child(self, branch):
        self.children.append(branch)

    def total_balance(self):
        total = self.balance
        for child in self.children:
            total += child.total_balance()
        return total

class TransferGraph:
    def __init__(self):
        self.graph = {}

    def add_branch(self, name):
        if name not in self.graph:
            self.graph[name] = []

    def add_transfer(self, from_branch, to_branch):
        self.graph[from_branch].append(to_branch)

    def bfs(self, start):
        visited = set()
        queue = [start]
        result = []

        while queue:
            current = queue.pop(0)
            if current in visited:
                continue

            visited.add(current)
            result.append(current)

            for neighbor in self.graph[current]:
                if neighbor not in visited:
                    queue.append(neighbor)
                    
        return result

head = Branch("Head Office", 1000)
addis = Branch("Addis Ababa", 500)
oromia = Branch("Oromia Region", 400)

cbe1 = Branch("CBE-1", 200)
cbe2 = Branch("CBE-2", 300)
adama = Branch("Adama", 150)

head.add_child(addis)
head.add_child(oromia)

addis.add_child(cbe1)
addis.add_child(cbe2)

oromia.add_child(adama)

print(head.total_balance())

print("\n\t.........................\n")

graph = TransferGraph()
graph.add_branch("CBE-1")
graph.add_branch("CBE-2")
graph.add_branch("Adama")
graph.add_branch("Jimma")

graph.add_transfer("CBE-1", "CBE-2")
graph.add_transfer("CBE-1", "Adama")
graph.add_transfer("CBE-2", "Jimma")
graph.add_transfer("Adama", "Jimma")

print("Branches reachable from CBE-1:")
print(graph.bfs("CBE-1"))
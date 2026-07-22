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
        acc_number = sorted_acc_numbers[index_of_target]
        return self.accounts[acc_number].statement()


print(".........................day08................")

saving_account1 = AccountFactory.create("savings", "Belay", "10004", 200, 0.07)
saving_account2 = AccountFactory.create("savings", "Abel", "10002", 300, 0.07)
current_account1 = AccountFactory.create("Current", "Dawit", "10005", 1900, 400)
current_account2 = AccountFactory.create("Current", "John", "10003", 1000, 400)

sms = SMSAlert()
saving_account1.subscribe(sms)
saving_account2.subscribe(sms)
current_account1.subscribe(sms)
current_account2.subscribe(sms)

registry = AccountRegistry()
registry.add(saving_account1)
registry.add(saving_account2)
registry.add(current_account1)
registry.add(current_account2)

registry.top_by_balance(4)

print("\n\t.........................\n")

registry.find_by_number("-1")


# registry.find("10005").statement()

# print("\n\t.........................\n")

# registry.list_all()

# print("\n\t.........................\n")

# current_account1.deposit(100)
# current_account1.withdraw(1500)
# current_account1.withdraw(800)

# print(current_account1.history)

# current_account1.undo_last()

# print(current_account1.history)
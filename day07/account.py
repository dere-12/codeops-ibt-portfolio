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

print("\n__________________day07_____________________________\n")

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

registry.find("10005").statement()

print("\n\t.........................\n")

registry.list_all()

print("\n\t.........................\n")

current_account1.deposit(100)
current_account1.withdraw(1500)
current_account1.withdraw(800)

print(current_account1.history)

current_account1.undo_last()

print(current_account1.history)

# print("\n__________________day06_____________________________\n")

# saving_account1 = AccountFactory.create("savings", "Belay", "01", 200, 0.07)
# current_account1 = AccountFactory.create("Current", "Dawit", "02", 500, 300)

# sms = SMSAlert()
# saving_account1.subscribe(sms)
# current_account1.subscribe(sms)

# saving_account1.deposit(-300)
# saving_account1.deposit(300)
# saving_account1.withdraw(-30)
# saving_account1.withdraw(30)
# saving_account1.withdraw(1000)

# print("\n.........................\n")

# current_account1.deposit(-100)
# current_account1.deposit(100)
# current_account1.withdraw(-10)
# current_account1.withdraw(10)
# current_account1.withdraw(800)
# current_account1.withdraw(1000)

# print("\n.........................\n")

# saving_account1.statement()
# current_account1.statement()


# print("\n__________________day05_____________________________\n")

# saving_account1 = SavingsAccount("John", "0008", 100, 0.05)
# saving_account1.deposit(30)
# saving_account1.withdraw(60)
# saving_account1.add_interest()
# print(saving_account1.balance)

# print("\n........................\n")

# current_account1 = CurrentAccount("Desta", "00012", 3000, 500)
# print(current_account1.balance)
# current_account1.withdraw(3400)
# print(current_account1.balance)

# print("\n..........................\n")

# accounts = [
#     SavingsAccount("Hawi", "02", 2000, 0.05), CurrentAccount("Temesgen", "03", 2500, 300)
# ]

# for account in accounts:
#     account.statement()

# print("\n__________________day04_____________________________\n")

# account1 = Account("Dawit", "0001", 5000)
# account2 = Account("Liya", "0002", 3000)

# account1.deposit(1000)
# account1.withdraw(2000)

# account2.deposit(-500)
# account2.withdraw(4000)

# print(account1.balance)
# print(account2.balance)
from abc import ABC, abstractmethod

class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self.observers = []

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

saving_account1 = AccountFactory.create("savings", "Belay", "01", 200, 0.07)
current_account1 = AccountFactory.create("Current", "Dawit", "02", 500, 300)

sms = SMSAlert()
saving_account1.subscribe(sms)
current_account1.subscribe(sms)

saving_account1.deposit(-300)
saving_account1.deposit(300)
saving_account1.withdraw(-30)
saving_account1.withdraw(30)
saving_account1.withdraw(1000)

print("\n.........................\n")

current_account1.deposit(-100)
current_account1.deposit(100)
current_account1.withdraw(-10)
current_account1.withdraw(10)
current_account1.withdraw(800)
current_account1.withdraw(1000)

print("\n.........................\n")

saving_account1.statement()
current_account1.statement()
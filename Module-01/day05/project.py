class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, value):
        self.__balance = value

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"{amount} ETB deposited successfully.")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient balance.")
        else:
            self.__balance -= amount
            print(f"{amount} ETB withdrawn successfully.")

    def statement(self):
        pass

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
            print("Withdrawal amount must be positive.")
        elif amount > self.balance + self.overdraft:
            print("Insufficient balance.")
        else:
            self.balance -= amount
            print(f"{amount} ETB withdrawn successfully.")

    def statement(self):
        print(f"""
        Account Type : Current Account
        Owner        : {self.owner}
        Account No.  : {self.account_number}
        Balance      : {self.balance}
        """)

saving_account1 = SavingsAccount("John", "0008", 100, 0.05)
saving_account1.deposit(30)
saving_account1.withdraw(60)
saving_account1.add_interest()
print(saving_account1.balance)

print("\n_______________________________________________\n")

current_account1 = CurrentAccount("Desta", "00012", 3000, 500)
print(current_account1.balance)
current_account1.withdraw(3400)
print(current_account1.balance)

print("\n_______________________________________________\n")

accounts = [
    SavingsAccount("Hawi", "02", 2000, 0.05), CurrentAccount("Temesgen", "03", 2500, 300)
]

for account in accounts:
    account.statement()

print("\n_______________________________________________\n")
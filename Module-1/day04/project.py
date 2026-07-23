class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

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

account1 = Account("Dawit", "0001", 5000)
account2 = Account("Liya", "0002", 3000)

account1.deposit(1000)
account1.withdraw(2000)

account2.deposit(-500)
account2.withdraw(4000)

print(account1.balance)
print(account2.balance)

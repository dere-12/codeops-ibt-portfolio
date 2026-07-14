# MINI-PROJECT

customers = [("Almaz", 1500), ("Dawit", 700), ("Tigist", 200), ("Hanna", 1200), ("Samuel", 450),]
def tier(balance): 
   if balance >= 1000: 
      return "Premium" 
   elif balance >= 500: 
      return "Standard" 
   return "Basic" 

premium_tier = 0
standard_tier = 0
basic_tier = 0
for name, balance in customers: 
   print(f"{name}: {tier(balance)} ({balance} ETB)")
   if tier(balance) == "Premium":
      premium_tier += 1
   elif tier(balance) == "Standard":
      standard_tier += 1
   else:
      basic_tier += 1
print(f"Premium = {premium_tier}, Standard = {standard_tier}, and Basic = {basic_tier}")
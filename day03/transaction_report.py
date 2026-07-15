
customers = {}
try:
    with open("transactions.txt") as tr_file:       
        for line in tr_file:
            split_line = line.strip().split(", ")
            customer_name = split_line[0]
            amount = int(split_line[1])

            if customer_name in customers:
                amount = amount + customers[customer_name]
            
            customers[customer_name] = amount
except FileNotFoundError:
    print("File Not Found. Check the file name and try again")

temp_amounts = list(customers.values())

temp_amounts.sort(reverse=True)

sorted_customers = {}
for sorted_amount in temp_amounts:
    for name, amount in customers.items():
        if sorted_amount == amount:
           sorted_customers[name] = sorted_amount


with open("report.txt", "w") as repert_file:
    repert_file.write("Transaction Summary Report\n")
    for name, amount in sorted_customers.items():
        repert_file.write(f"{name}, {amount}\n")



print(customers)
print(sorted_customers)


print("hello world") # printing stuff

if 2<5: # conditional
    print(2)

name = input() #inputting
print(f"hello, {name}")


i=28
print(f" f is {i}") #usin variables in text

i=True
print(f" f is {i}")

x = -0

if x>0: #conditional and identation
    print("x is positive")
elif x<0:
    print("x is negative")
else:
    print("x is zero")

name = "alice"
coordinates = (10, 20.0)
names= ["fagner", "joao","carlos"] #list
print(names[0])


#loops
for i in range(5):
     print(i)

for name in names:
    print(name)

#dictionaries

ages = {"Alice":22, "bob":27}
ages["carlie"] = 30
ages["Alice"] += 1

print(ages)


#functions

def square(x):
    return x * x

for i in range(10):
    print("{} saquared is {}".format(i, square(i)))
from time import sleep
from random import *

print("Welcome to the question generator.")
sleep(1)
print("This program will generate questions based on the topics of mathematics.")
sleep(1)
print("Question Generation has start in")
sleep(1)
print("3")
sleep(1)
print("2")
sleep(1)
print("1")
sleep(1)

def right_wrong(ans):
    set={ans+randint(1,10),ans,ans+randint(1,10),ans-randint(1,10)}
    print("Options are: ",set)
    x=input("Enter your answer:")
    if x==str(ans):
        return("Correct Answer")
    else:
        return("Wrong Answer")

def que_gen(a):
    list=["addition","subtraction","multiplication","division","square","cube","square root","cube root","percentage","average","LCM","HCF","simple interest","compound interest"]
    #"profit and loss","time and work","time and distance","area and perimeter","volume and surface area","probability","permutation and combination","algebra","geometry","trigonometry","mensuration","statistics","data interpretation","data sufficiency","reasoning","puzzle","blood relation","coding and decoding","series","clock","calendar","direction","syllogism","seating arrangement","input output","statement and argument","statement and assumption","statement and conclusion","course of action","cause and effect","inference","decision making","data sufficiency","data interpretation","data analysis"
    for i in range(a):
        x=choice(list)
        if x=="addition":
            f=randint(1,100)
            g=randint(1,100)
            print("What is the sum of",f,"and",g,"?")
            ans=f+g
            print(right_wrong(ans))
        elif x=="subtraction":
            f=randint(1,100)
            g=randint(1,100)
            print("What is the difference between",f,"and",g,"?")
            ans=f-g
            print(right_wrong(ans))
        elif x=="multiplication":
            f=randint(1,100)
            g=randint(1,100)
            print("What is the product of",f,"and",g,"?")
            ans=f*g
            print(right_wrong(ans))
        elif x=="division":
            f=randint(1,100)
            g=randint(1,100)
            print("What is the quotient when",f,"is divided by",g,"?")
            ans=f//g
            print(right_wrong(ans))
        elif x=="square":
            f=randint(1,100)
            print("What is the square of",f,"?")
            ans=f**2
            print(right_wrong(ans))
        elif x=="cube":
            f=randint(1,100)
            print("What is the cube of",f,"?")
            ans=f**3
            print(right_wrong(ans))
        elif x=="square root":
            f=randint(1,100)
            print("What is the square root of",f,"?")
            ans=int(f**0.5)
            print(right_wrong(ans))
        elif x=="cube root":
            f=randint(1,100)
            print("What is the cube root of",f,"?")
            ans=int(f**(1/3))
            print(right_wrong(ans))
        elif x=="percentage":
            f=randint(1,100)
            g=randint(1,100)
            print("What is",f,"percent of",g,"?")
            ans=(f/100)*g
            print(right_wrong(ans))
        elif x=="average":
            f=randint(1,100)
            g=randint(1,100)
            h=randint(1,100)
            print("What is the average of",f,",",g,"and",h,"?")
            ans=(f+g+h)/3
            print(right_wrong(ans))
        elif x=="LCM":
            f=randint(1,100)
            g=randint(1,100)
            print("What is the LCM of",f,"and",g,"?")
            ans=(f*g)//gcd(f,g)
            print(right_wrong(ans))
        elif x=="HCF":
            f=randint(1,100)
            g=randint(1,100)
            print("What is the HCF of",f,"and",g,"?")
            ans=gcd(f,g)
            print(right_wrong(ans))
        elif x=="simple interest":
            f=randint(1,100)
            g=randint(1,100)
            h=randint(1,100)
            print("What is the simple interest on",f,"at",g,"percent for",h,"years?")
            ans=(f*g*h)/100
            print(right_wrong(ans))
        elif x=="compound interest":
            f=randint(1,100)
            g=randint(1,100)
            h=randint(1,100)
            print("What is the compound interest on",f,"at",g,"percent for",h,"years?")
            ans=f*(1+(g/100))**h - f
            print(right_wrong(ans))
        sleep(1)
    yes()

def gcd(a,b):
    if b==0:
        return a
    else:
        return gcd(b,a%b)

def yes():
    print("Do you want to generate more questions?")
    x=input("Enter 'y' for yes and 'n' for no: ")
    if x=="y":
        n=int(input("Enter the number of questions you want to generate: "))
        que_gen(n)
    else:
        print("Thank you for using the question generator.")

n=int(input("Enter the number of questions you want to generate: ")) 
que_gen(n)
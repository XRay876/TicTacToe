import random
def checker():
    if counter > 3:
        if a[0][0] == sign2 and a[1][1] == sign2 and a[2][2] == sign2:
            print('Победа машины')
            exit()
        elif a[0][0] == sign1 and a[1][1] == sign1 and a[2][2] == sign1:
            print('Победа человека')
            exit()
        elif a[0][2] == sign2 and a[1][1] == sign2 and a[2][0] == sign2:
            print('Победа машины')
            exit()
        elif a[0][2] == sign1 and a[1][1] == sign1 and a[2][0] == sign1:
            print('Победа человека')
            exit()
        for i in range(3):
            if a[i][0] == sign2 and a[i][1] == sign2 and a[i][2] == sign2:
                print('Победа машины')
                exit()
            elif a[i][0] == sign1 and a[i][1] == sign1 and a[i][2] == sign1:
                print('Победа человека')
                exit()
            elif a[0][i] == sign2 and a[1][i] == sign2 and a[2][i] == sign2:
                print('Победа машины')
                exit()
            elif a[0][i] == sign1 and a[1][i] == sign1 and a[2][i] == sign1:
                print('Победа человека')
                exit()
            else:
                print('Ничья')
                exit()
        if counter > 8:
            print('Ничья')
            exit()

def II():
    global counter
    posx1 = random.randint(0, 2)
    posy1 = random.randint(0, 2)
    if (a[posx1][posy1] != sign1) and (a[posx1][posy1] != sign2):
        a[posx1][posy1] = sign2
        counter += 1
        print('-' * 9)
        showMat(a)
    else:
        II()

def MM():
    global counter
    posx, posy = map(int, input('Введите номер строки и, через пробел, номер столбца:').split())
    posx -= 1
    posy -= 1
    if (a[posx][posy] != sign1) and (a[posx][posy] != sign2) and (0 <= posx <= 2 and 0 <= posy <= 2):
        a[posx][posy] = sign1
        counter += 1
        showMat(a)
    else:
        print('На этом месте есть уже символ, введите позицию еще раз!')
        MM()


def showMat(a):
    for i in a:
        print(*i)


counter = 0
a = [ ['_', '_', '_'],
     ['_', '_', '_'],
     ['_','_','_'] ]
showMat(a)
sign1 = input('o or x: ')
sign2 = 'x'
if sign1 == 'x':
    sign2 = 'o'
else:
    sign1 = 'o'
    sign2 = 'x'

numer = input('Кто первый, человек или робот: ')
if numer == '1' or numer.lower() == 'человек' or numer == 'Я':
    for i in range(9):
        print('-' * 9)

        MM()

        checker()

        II()
else:
    for i in range(9):
        print('-' * 9)

        II()

        checker()

        MM()
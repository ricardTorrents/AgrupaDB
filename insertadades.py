from faker import Faker
from random import randint
import psycopg2



def fakeDni():
    letters=['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E']
    dni=""
    total=0
    for x in range(8):
        num=randint(0,9)
        dni+=str(num)
        total+=num
    
    indxLletra=total % 23
    dni+=letters[indxLletra]
    return dni
def fakeMobil():
    numbers=['1','2','3','4','5','6','7','8','9','0']
    mobil='6'
    for x in range(8):
        mobil+=numbers[randint(0,9)]
    
    return mobil

def fakefixe():
    numbers=['1','2','3','4','5','6','7','8','9','0']
    fixe='93'
    for x in range(6):
        fixe+=numbers[randint(0,9)]
    
    return fixe
def fakeAdresa(faker):
	numbers=['1','2','3','4','5','6','7','8','9','0',""]
	tipus=['Avinguda','carrer','plaça','Carretera']
	adresa=tipus[randint(0,3)]+" "+faker.first_name()+" "+numbers[randint(0,8)]+numbers[randint(0,10)]
	return adresa
def insertSocis(numSocis,cursor):
    sexe=['H','D']
    faker=Faker('es_ES')
    dni=[]
    

    insert ="INSERT INTO soci(dni,nom,cognoms,data_naixement,adreça,ciutat,email,telefon,telefon2,sexe) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    for i in range(numSocis):

        nom=faker.first_name()
        cognoms=faker.last_name()+" "+faker.last_name()
        email=faker.email()
        data_naixement=faker.date()
        adreça=fakeAdresa(faker)
        telefon=fakeMobil()
        telefon2=fakefixe()
        s=sexe[randint(0,1)]
        ciutat="Vilanova i la Geltru"
        d=fakeDni()
        while(d in dni):
            d=fakeDni()
        dni.append(d)
        DNI=d
        soci=DNI,nom,cognoms,data_naixement,adreça,ciutat,email,telefon,telefon2,s
        cursor.execute(insert,soci)
        conn=psycopg2.connect("dbname=agrupacio user=torrents password=agrupa")
cursor=conn.cursor()

insertSocis(500,cursor)

conn.commit()
cursor.close()
conn.close()

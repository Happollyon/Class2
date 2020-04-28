from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
class Flight(db.Model):
    __tablename__ = "fligts"
    id = db.Column(db.Integer, primary_key = True)
    origin = db.Column(db.String, nullable=False)
    destination = db.Column(db.String, nullable=False)
    duration = db.Column(db.integer, nullable=False)
    counter = 1


    #Keeps track of passangers

    def __init__(self, origin, destination, duration):
        self.id = Flight.counter
        Flight.counter += 1

        self.passengers = []

        self.origin = origin
        self.destination = destination
        self.duration = duration
    def printinfo(self):
        print("----------------------------")
        print(f"flight origin: {self.origin}")
        print(f"flight destination: {self.destination}")
        print(f"flight duration: {self.duration}")


        for passengers in self.passengers:
            print(f"{passengers.name}")


    def delay(self,amount):
        self.duration +=amount


    def add_passenger(self,p):
        self.passengers.append(p)
        p.flight_id=self.id

class Passenger(db.Model):
    __tablename__="passengers"
    id = db.Column(db.integer, primary_key = True)
    name = db.Column
    flight_id= db.Column(db.Integer, db.ForeignKey("flight.id"), nullable=false)
    def __init__(self,name):
        self.name = name
def main():

    f = Flight(origin="new yourk", destination="paris", duration=540)
    f.delay(100)
    anlice = Passenger(name="alice")
    bob = Passenger(name="bob")
    f.add_passenger(anlice)
    f.add_passenger(bob)

    f2 = Flight(origin="tokio", destination="rio",duration="600")

    f.printinfo()
    f2.printinfo()

if __name__ =="__main__":
    main()
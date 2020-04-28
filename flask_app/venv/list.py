import os
#SETfrom sqlalchemy import create_engine
#from sqlachemy.orn import scoped_session, sessionmaker
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

def main():
    flights =  db.execte("SELECT origin, destination,duration FROM flights").fetchall()

    for flights in flights:
        print(f"{flights.origin} to {flights.detination} {flights.duration} minutes")
if __name__ =="__main__":
    main()
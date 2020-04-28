import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker


engine = create_engine('postgres://pkmhwepyovbzgd:25d436d8c8618f1fb393d32f4c5773e767d46452106a2e22f9828b1567234070@ec2-54-247-78-30.eu-west-1.compute.amazonaws.com:5432/djvoogidqpt44')
db = scoped_session(sessionmaker(bind=engine))

db.session()
db.execute("CREATE TABLE a")
db.commit()


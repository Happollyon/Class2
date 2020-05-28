import os
import requests


from json import dumps
from flask import Flask, session, render_template,request,redirect,jsonify,make_response
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)

 #Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
app.debug=True

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))




@app.route("/")
def index():
    return 'hi'
@app.route("/login") #loggin page
def login():
    return render_template("log.html")

@app.route("/loginform/<string:user>/<string:password>", methods=["POST"]) #receives form to login
def loginform(user,password):
    user=user
    password=password
    #user = request.form["user"] #user submited
    #psw = request.form["psw"]#psw submited
    account= db.execute("SELECT * FROM users WHERE username = :user AND psw = :psw ",{"user":user,"psw":password}).fetchone()#checks if user exists
    db.commit()

    if account is None:
        return jsonify({'msg':'wrong password or wrong user'})

    else:

        session['id']= account.id #creates a session
        return jsonify({'msg':'wellcome',
                        'login':'true'})

@app.route("/register") #register page
def register():
    return render_template("register.html")

@app.route("/register2/<string:user>/<string:psw>", methods=["POST"])#once form is submited
def register2(user, psw):
    user = user
    psw = psw
    check_user= db.execute("SELECT * FROM users WHERE username=:user",{"user":user}).fetchone()
    db.commit()
    if(check_user)
        {
            return jsonify({'register_msg':'user exists.'})
        }
    db.execute("INSERT INTO users(username,psw) VALUES(:user,:psw)", {"user" :user,"psw" :psw}) #inserts new user to database
    DATA = db.execute(f"SELECT * FROM users WHERE username = :user",{"user":user}).fetchall()
    db.commit()

    return jsonify({'msg':'user registered'})
@app.route("/logout")
def logout():
    session['username'] = "" # removes id from session
    return redirect("/login")

@app.route("/search/<string:bookname>", methods=["POST"])
def search(bookname):
    if session['id']=="":
        return jsonify({'msg':'you are not logged in.'})
    else:

        bookname = "%"+bookname+"%"
        #cheks for isbn
        isbn_result = db.execute("SELECT * FROM BOOKS WHERE isbn LIKE :string",{"string":bookname}).fetchall()
        db.commit()
        #cheks for title
        title_result = db.execute("SELECT * FROM BOOKS WHERE title LIKE :string", {"string": bookname}).fetchall()
        db.commit()
        #checks for author
        author_result = db.execute("SELECT * FROM BOOKS WHERE author LIKE :string", {"string":bookname}).fetchall()
        db.commit()
        return jsonify({'title_result':[dict(row) for row in title_result],'isbn_result':[dict(row) for row in isbn_result],'author_result':[dict(row) for row in author_result]})
#creating pages for each book
@app.route("/search2/<string:id>/<string:isbn>")
def search2(id,isbn):
    if session['id']=="":
        return jsonify({'msg':'you are not logged in.'})
    else:
        #xXDlTGtNEjl0XsUCu07fg   key

        review= db.execute("SELECT * FROM reviews WHERE book_id = :book_id", {'book_id':id}).fetchall()# selects review from database
        res = requests.get("https://www.goodreads.com/book/review_counts.json", params={"key": "xXDlTGtNEjl0XsUCu07fg", "isbns": isbn}) #sends request to api
        data= res.json() # response into json
        avg=data["books"][0]['average_rating']
        votes=data["books"][0]['work_ratings_count']
        db.commit()
        if avg =='':
             avg='no reviews in goodread.com'
             votes=0


        return jsonify({'reviews':[dict(row) for row in review], 'avg_rating':avg,'votes':votes})
            #render_template("book.html", book=book, avg=avg, votes=votes, review=review)

#get review form the form
@app.route("/review/<string:rate>/<string:book_id>/<string:review_posted>", methods=['POST'])

def review(rate,book_id,review_posted):
    if session['id']=="":
        return jsonify({'msg':'you are not logged in.'})
    else:

        db.execute("INSERT INTO reviews(book_id,user_id,review_text,review_vote) VALUES(:book_id,:user_id,:string,:vote)",{"book_id":book_id,"user_id":session["id"],'string':review_posted,'vote':rate})#inserts to database
        db.commit()
        return render_template("search.html")
    
#api
@app.route("/api/<string:isbn>")
def api(isbn):
    json= db.execute('SELECT * FROM books WHERE isbn = :isbn',{'isbn':isbn}).fetchone()
    db.commit()


    return jsonify({'title':json.title,
                    'author':json.author,
                    'year':json.year,
                    'isbn':json.isbn})
#postgres://lrxehxwkuoirfd:6ee12405429e17f54f785526587930bbcadc06bc67ba45d06373c692ae299db9@ec2-54-217-204-34.eu-west-1.compute.amazonaws.com:5432/d6k7t01tcjbjrt
    
import os
import requests



from flask import Flask, session, render_template,request,redirect,jsonify
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

#A=db.execute("SELECT * FROM flights").fetchall()
#db.commit()


@app.route("/") #here is the index page
def index():
    return render_template("index.html")

@app.route("/login") #loggin page
def login():
    return render_template("log.html")

@app.route("/loginform", methods=["POST"]) #receives form to login
def loginform():
    user = request.form["user"] #user submited
    psw = request.form["psw"]#psw submited
    account= db.execute("SELECT * FROM users WHERE username = :user AND psw = :psw ",{"user":user,"psw":psw}).fetchone()#checks if user exists
    db.commit()

    if account is None:
        return "<h1>USER NOT FOUND</h1>"

    else:

        session['id']= account.id #creates a session
        return render_template("search.html", account=account)

@app.route("/register") #register page
def register():
    return render_template("register.html")

@app.route("/register2", methods=["POST"])#once form is submited
def register2():
    user = request.form['user']
    psw = request.form['psw']

    db.execute("INSERT INTO users(username,psw) VALUES(:user,:psw)", {"user" :user,"psw" :psw}) #inserts new user to database
    DATA = db.execute(f"SELECT * FROM users WHERE username = :user",{"user":user}).fetchall()
    db.commit()

    return render_template("test.html", DATA=DATA)
@app.route("/logout")
def logout():
    session['username'] = "" # removes id from session
    return redirect("/login")

@app.route("/search", methods=["POST"])
def search():
    string = request.form['string']
    string = "%"+string+"%" #attaches % to the string

    #cheks for isbn
    isbn_result = db.execute("SELECT * FROM BOOKS WHERE isbn LIKE :string",{"string":string}).fetchall()
    db.commit()
    #cheks for title
    title_result = db.execute("SELECT * FROM BOOKS WHERE title LIKE :string", {"string": string}).fetchall()
    db.commit()
    #checks for author
    author_result = db.execute("SELECT * FROM BOOKS WHERE author LIKE :string", {"string": string}).fetchall()
    db.commit()


    return render_template('search2.html', isbn_result=isbn_result,title_result=title_result, author_result=author_result)

#creating pages for each book
@app.route("/<string:name>")
def search2(name):
    #xXDlTGtNEjl0XsUCu07fg   key
    book = db.execute("SELECT * FROM books where title=:name",{"name":name}).fetchone() #recovers book data from database

    review= db.execute("SELECT * FROM reviews WHERE book_id = :book_id", {'book_id':book.id}).fetchall()# selects review from database
    res = requests.get("https://www.goodreads.com/book/review_counts.json", params={"key": "xXDlTGtNEjl0XsUCu07fg", "isbns": book.isbn}) #sends request to api
    data= res.json() # response into json
    avg=data["books"][0]['average_rating']
    votes=data["books"][0]['work_ratings_count']
    db.commit()
    return render_template("book.html", book=book, avg=avg, votes=votes, review=review)

#get review form the form
@app.route("/review", methods=['POST'])
def review():
    string = request.form['text']
    book_id=request.form['id']
    vote = request.form['vote']
    db.execute("INSERT INTO reviews(book_id,user_id,review_text,review_vote) VALUES(:book_id,:user_id,:string,:vote)",{"book_id":book_id,"user_id":session["id"],'string':string,'vote':vote})#inserts to database
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
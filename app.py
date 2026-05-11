from flask import Flask, render_template, url_for

app = Flask(__name__, static_folder='static', template_folder='templates')

# ---------- Home ----------
@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

# ---------- About ----------
@app.route("/about")
def about():
    return render_template("About_US.html")

# ---------- Enrollment ----------
@app.route("/enrollment")
def enrollment():
    return render_template("enrollment.html")

@app.route("/enrollment/registration")
def registration():
    return render_template("registration.html")

# ---------- Facilities ----------
@app.route("/facilities")
def facilities():
    return render_template("facilities.html")

# ---------- Library ----------
@app.route("/library")
def library():
    return render_template("library.html")

# ---------- Programs ----------
@app.route("/programs")
def programs():
    return render_template("programs.html")

# ---------- Resources ----------
@app.route("/resources")
def resources():
    return render_template("resources.html")

# ---------- Student Services ----------
@app.route("/services")
def services():
    return render_template("services.html")

# ---------- Store ----------
@app.route("/store")
def store():
    return render_template("store.html")

# ---------- Favicon ----------
@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('assets/Logo.jpg')

# ---------- Run App ----------
if __name__ == "__main__":
    app.run(debug=True)
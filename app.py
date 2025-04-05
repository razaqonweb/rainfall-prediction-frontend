from flask import Flask, render_template, request, url_for

app = Flask(__name__, static_folder="static", static_url_path="/")


@app.get("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)

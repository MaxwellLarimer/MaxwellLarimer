from rapidfire import create_app
import os

app = create_app()

# catch all for serving react from flask
@app.route('/',defaults={'path': ''})

@app.route('/max')
def index():
    return 'Max was here'
# def index():
#     return redirect('http://localhost:63655', code=301)
    
@app.route('/<path:path>')
def serve_react(path):
    print('testing')
    return app.send_static_file('index.html')
from rapidfire import create_app
import os

app = create_app()

# catch all for serving react from flask

@app.route('/',defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    print('testing')
    return app.send_static_file('index.html')
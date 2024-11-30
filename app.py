from flask import Flask, jsonify, request
import psycopg2

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        dbname='music_db',
        user='your_username',
        password='your_password',
        host='localhost'
    )
    return conn

@app.route('/artists', methods=['GET', 'POST'])
def manage_artists():
    if request.method == 'POST':
        name = request.json['name']
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO artists (name) VALUES (%s)', (name,))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({'message': 'Artist added successfully'}), 201

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM artists;')
    artists = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(artists)

if __name__ == '__main__':
    app.run(debug=True)
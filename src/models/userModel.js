const db = require('../db/database');

exports.create = (name, email, callback) => {
  const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
  stmt.run([name, email], function(err) {
    callback(err, this.lastID);
  });
  stmt.finalize();
};

exports.getAll = (callback) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    callback(err, rows);
  });
};

exports.getUserByEmail = (email, callback) => {
  db.all("SELECT email FROM users WHERE email = ?", [email], (err, row) => {
    callback(err, row);
  })
}

exports.getById = (id, callback) => {
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    callback(err, row);
  });
};

exports.update = (id, name, email, callback) => {
  const stmt = db.prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
  stmt.run([name, email, id], function(err) {
    callback(err, this.changes);
  });
  stmt.finalize();
};

exports.delete = (id, callback) => {
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  stmt.run([id], function(err) {
    callback(err, this.changes);
  });
  stmt.finalize();
};

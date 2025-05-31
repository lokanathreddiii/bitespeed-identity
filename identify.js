const db = require('./db');

function now() {
  return new Date().toISOString();
}

function insertContact({ email, phoneNumber, linkedId = null, linkPrecedence = 'primary' }, callback) {
  db.run(`
    INSERT INTO Contact (email, phoneNumber, linkedId, linkPrecedence, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [email, phoneNumber, linkedId, linkPrecedence, now(), now()],
    function (err) {
      if (err) return callback(err);
      callback(null, this.lastID);
    });
}

function getAllRelatedContacts(email, phoneNumber, callback) {
  db.all(`
    SELECT * FROM Contact
    WHERE email = ? OR phoneNumber = ?`,
    [email, phoneNumber],
    callback);
}

function identifyContact(email, phoneNumber, res) {
  getAllRelatedContacts(email, phoneNumber, (err, contacts) => {
    if (err) return res.status(500).send({ error: 'DB error' });

    if (contacts.length === 0) {
      insertContact({ email, phoneNumber }, (err, newId) => {
        if (err) return res.status(500).send({ error: 'Insert error' });
        return res.json({
          contact: {
            primaryContatctId: newId,
            emails: [email],
            phoneNumbers: [phoneNumber],
            secondaryContactIds: []
          }
        });
      });
    } else {
      const primary = contacts.find(c => c.linkPrecedence === 'primary') || contacts[0];
      const primaryId = primary.linkedId || primary.id;

      const alreadyExists = contacts.some(c => c.email === email && c.phoneNumber === phoneNumber);
      if (!alreadyExists) {
        insertContact({
          email,
          phoneNumber,
          linkedId: primaryId,
          linkPrecedence: 'secondary'
        }, () => {});
      }

      db.all(`SELECT * FROM Contact WHERE id = ? OR linkedId = ?`, [primaryId, primaryId], (err2, allContacts) => {
        if (err2) return res.status(500).send({ error: 'Fetch error' });

        const emails = [...new Set(allContacts.map(c => c.email).filter(Boolean))];
        const phones = [...new Set(allContacts.map(c => c.phoneNumber).filter(Boolean))];
        const secondaryIds = allContacts.filter(c => c.linkPrecedence === 'secondary').map(c => c.id);

        res.json({
          contact: {
            primaryContatctId: primaryId,
            emails,
            phoneNumbers: phones,
            secondaryContactIds: secondaryIds
          }
        });
      });
    }
  });
}

module.exports = identifyContact;

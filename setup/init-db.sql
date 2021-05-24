CREATE EXTENSION lo;

CREATE TABLE client(
    id TEXT PRIMARY KEY NOT NULL,
    fname TEXT,
    lname TEXT,
    pwd TEXT,
    link_gmail BOOLEAN DEFAULT false,
    img_thumb TEXT
);

CREATE TABLE cvresume (
    id uuid PRIMARY KEY,
    cv_name TEXT NOT NULL,
    email_id TEXT REFERENCES client(id),
    content JSON
);

CREATE TABLE otp (
    id uuid PRIMARY KEY,
    email_id TEXT REFERENCES client(id),
    expiry DATE,
    otp CHAR(6)
);

INSERT INTO client(id,fname,lname,pwd,link_gmail,img_thumb) VALUES('admin-chan@gmail.com','admin','chan','12345678',false,'');
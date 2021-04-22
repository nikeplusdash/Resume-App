CREATE EXTENSION lo;

CREATE TABLE client(
    id TEXT PRIMARY KEY NOT NULL,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    pwd TEXT NOT NULL,
    link_gmail BOOLEAN DEFAULT false,
    img_thumb BYTEA
);

CREATE TABLE cvresume (
    id uuid PRIMARY KEY,
    cv_name TEXT NOT NULL,
    email_id TEXT REFERENCES client(id),
    content JSON
);

-- lo_import to import the image into DB
-- lo_export to export the image from DB
-- for NodeJS use FS for I/O
-- https://robert-keller22.medium.com/upload-and-download-images-to-a-postgres-db-node-js-92e43f232ae4
CREATE TABLE image (title text, raster lo);
CREATE TRIGGER t_raster BEFORE UPDATE OR DELETE ON image
    FOR EACH ROW EXECUTE FUNCTION lo_manage(raster);


INSERT INTO client(id,fname,lname,pwd,link_gmail,img_thumb) VALUES('admin-chan@gmail.com','admin','chan','12345678',false,'');
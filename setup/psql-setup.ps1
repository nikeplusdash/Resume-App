createuser app
createdb appdb
psql -c "ALTER USER app WITH ENCRYPTED PASSWORD 'anspwd';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE appdb TO app;"
psql -U app -d appdb -W -f .\Server\setup\init-db.sql
# Kanban
 pour creer une key.pem et cert.pem

 openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

set HTTPS=true&&npm start
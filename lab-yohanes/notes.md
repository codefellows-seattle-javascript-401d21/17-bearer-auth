#SOURCE
https://github.com/Iamheathsmith/17-bearer-auth/blob/lab-heath/lab-heath/README.md

 #GET 'ER RUNNING
 npm run start-db

 nodemon

 http POST http://localhost/api/v1/signup username=yoHector email='hector@gmnail.com' password=12345678

OR

new synatax:
http POST :3000/api/v1/signup username=hector email='meh@me.com' password=whatever

#ALWAYS RUN MANGODB FIRST


#MY DATAASE
http POST :3000/api/v1/signup username=tim email='tim@blah.com' password=stuff

#ID
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIyMTgxODc0NDgyMWMwNDQxM2RhODVjMzA3ZWE2ZjM0MTA3NjM3ZmVkMTQzYTgxNGVkZDA1Njc0ZjI3YzI5OThhOWYwYTU3YzUwMTAwZmQyNTBhNTZhYjJhYmMwNWZlMjIwODM0YjZlMjFlZGI4MDJlOTkyYjMxOTEwYjc1OWQxIiwiaWF0IjoxNTE3OTgyNzE1fQ.otS5wutjAcKJFuLBu1FpCiw_MOcaNenLjHPCeMSEhSU

#SIGN IN WORKS
http -a tim:stuff :3000/api/v1/signin


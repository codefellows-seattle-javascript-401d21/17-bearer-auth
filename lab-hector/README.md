# Lab 17: Bearer Auth

How to use this app:

- Fork this repo
- Clone to your local machine
- Navigate to the lab-hector and run ```npm i``` this will install the dependencies needed for this to run
After all the environment is setup. For some reason I have to run: ``` mongo killall``` and in another terminal window```nodemon``` (this is on my package.json, I may need to change this later)
- You want to signup as a new user running: ``` http POST :3000/api/v1/signup username=hector12345 email='hector@meh.com' password=1234```
-You will get a return: ```HTTP/1.1 201 Created``` ```"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI1MjIxNTRjNTFiODkzYjJhOTEwMzk0MTBjODYyMjVmYThmZTg0ZTQxMDMzMmExYmQ3Mjg3YjQyMGZhZmJjOTFhMjI5YjUzNWU1NDUxMzI3NjgyYjg1YTRlYTJlNWY0YjhmMTM5NmY0MWZmMmUxNTA3OGQzNjk0ODE4MWYxNWM3IiwiaWF0IjoxNTE3OTg0MjA2fQ.4H116m_ohyhVikgNryx8gJAd6NQtudR0Qx6cdawZEJ0"```
- To check you can run: ```http -a hector12345:1234 :3000/api/v1/signin``` and you will get: ```HTTP/1.1 200 OK```

- Still a work in progress...to be continued...




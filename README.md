# ENV
create an .env file with the following variables:
NODE_ENV = development
HOST = ''
PORT = 8000
DB_URL = 'uri of mongodb'


# RUN
sudo docker build . -t colearn-app
sudo docker run -p8000:8000 colearn-app

-to stop docker container:
sudo docker ps (get the id of the running container)
sudo docker stop <container id> (kill it gracefully)


# ENDPOINTS
- get all [GET]: localhost:8000/api/lessons/
  
  The expected result will be as follows:
  ```
  {
    "results": 5,
    "data": [
        {
            "_id": "6213b997d636ef6f6d693183",
            "title": "node.js",
            "description": "bla bla bla",
            "thumbnail": "",
            "price": 10,
            "days": [
                1,
                3,
                6
            ],
            "start_date": "2022-02-05T00:00:00.000Z",
            "final_date": "2022-02-25T00:00:00.000Z",
            "start_time": "2022-03-05T12:05:00.000Z",
            "end_time": "2022-03-05T15:00:00.000Z",
            "dates": [
                "2022-02-05T00:00:00.000Z",
                "2022-02-08T00:00:00.000Z",
                "2022-02-10T00:00:00.000Z",
                "2022-02-12T00:00:00.000Z",
                "2022-02-15T00:00:00.000Z",
                "2022-02-17T00:00:00.000Z",
                "2022-02-19T00:00:00.000Z",
                "2022-02-22T00:00:00.000Z",
                "2022-02-24T00:00:00.000Z"
            ]
        },
        {
            "_id": "6213ba27d636ef6f6d693186",
            "title": "html",
            "description": "bla bla bla",
            "thumbnail": "",
            "price": 10,
            "days": [
                1,
                3,
                6
            ],
            "start_date": "2022-02-20T00:00:00.000Z",
            "final_date": "2022-03-15T00:00:00.000Z",
            "start_time": "2022-03-20T12:05:00.000Z",
            "end_time": "2022-03-20T15:00:00.000Z",
            "dates": [
                "2022-02-20T00:00:00.000Z",
                "2022-02-22T00:00:00.000Z",
                "2022-02-24T00:00:00.000Z",
                "2022-02-27T00:00:00.000Z",
                "2022-03-01T00:00:00.000Z",
                "2022-03-03T00:00:00.000Z",
                "2022-03-06T00:00:00.000Z",
                "2022-03-08T00:00:00.000Z",
                "2022-03-10T00:00:00.000Z",
                "2022-03-13T00:00:00.000Z",
                "2022-03-15T00:00:00.000Z"
            ]
        },
        {
            "_id": "621457ca3c0878423754c3d2",
            "title": "python",
            "description": "bla bla bla",
            "thumbnail": "",
            "price": 10,
            "days": [
                1,
                3,
                6
            ],
            "start_date": "2022-01-01T00:00:00.000Z",
            "final_date": "2022-01-30T00:00:00.000Z",
            "start_time": "2022-02-01T12:05:00.000Z",
            "end_time": "2022-02-01T15:00:00.000Z",
            "dates": [
                "2022-01-01T00:00:00.000Z",
                "2022-01-04T00:00:00.000Z",
                "2022-01-06T00:00:00.000Z",
                "2022-01-08T00:00:00.000Z",
                "2022-01-11T00:00:00.000Z",
                "2022-01-13T00:00:00.000Z",
                "2022-01-15T00:00:00.000Z",
                "2022-01-18T00:00:00.000Z",
                "2022-01-20T00:00:00.000Z",
                "2022-01-22T00:00:00.000Z",
                "2022-01-25T00:00:00.000Z",
                "2022-01-27T00:00:00.000Z",
                "2022-01-29T00:00:00.000Z"
            ]
        },
        {
            "_id": "62145a9a3c0878423754c3d8",
            "title": "angular",
            "description": "bla bla bla",
            "thumbnail": "",
            "price": 10,
            "days": [
                1
            ],
            "start_date": "2022-04-11T00:00:00.000Z",
            "final_date": "2022-04-11T00:00:00.000Z",
            "start_time": "2022-05-11T12:05:00.000Z",
            "end_time": "2022-05-11T15:00:00.000Z",
            "dates": [
                "2022-04-11T00:00:00.000Z"
            ]
        },
        {
            "_id": "62145c1d3c0878423754c3de",
            "title": "react",
            "description": "bla bla bla",
            "thumbnail": "",
            "price": 10,
            "days": [
                1,
                3,
                5
            ],
            "start_date": "2022-04-04T00:00:00.000Z",
            "final_date": "2022-04-08T00:00:00.000Z",
            "start_time": "2022-05-04T12:05:00.000Z",
            "end_time": "2022-05-04T15:00:00.000Z",
            "dates": [
                "2022-04-04T00:00:00.000Z",
                "2022-04-06T00:00:00.000Z",
                "2022-04-08T00:00:00.000Z"
            ]
        }
    ],
    "success": true
  }
  ```
  
  The get all endpoints can have a query to get lessons by specific dates as follows:
  'localhost:8000/api/lessons?dates[gte]=2022-4-1&dates[lte]=2022-4-10'

  The expected result will be as follows:
  ```
  {
    "results": 1,
    "data": [
        {
            "_id": "62145c1d3c0878423754c3de",
            "title": "react",
            "description": "bla bla bla",
            "thumbnail": "",
            "price": 10,
            "days": [
                1,
                3,
                5
            ],
            "start_date": "2022-04-04T00:00:00.000Z",
            "final_date": "2022-04-08T00:00:00.000Z",
            "start_time": "2022-05-04T12:05:00.000Z",
            "end_time": "2022-05-04T15:00:00.000Z",
            "dates": [
                "2022-04-04T00:00:00.000Z",
                "2022-04-06T00:00:00.000Z",
                "2022-04-08T00:00:00.000Z"
            ]
        }
    ],
    "success": true
  }
  ```


- create one [POST]: localhost:8000/api/lessons/
  
  To create a lesson, you will need to fell in the following fields. They are all required, and must be 'form-data':

  title: string
  description: string
  price: number
  start_date: string ex. 2022-2-20
  final_date: string ex. 2022-3-15
  start_time: string ex. 12:05
  end_time: string ex. 15:00
  days: number ex. 1

  The days denotes days of the week by numbers as follows:
  0 Sunday
  1 Monday
  2 Tuesday
  3 wednesday
  4 thursday
  5 friday
  6 saturday

  If you need to enter multiple days, you will be required to write 'days' in multiple fields, with their respective numbers, like so:
  days: 1
  days: 3
  days: 6

  Note that. The first day should correspond the first date. And the first first day should be the first in the array, then followed by subsequent days. This is extremly important, or the dates will not be right.

  You will recieve a 201 code, along with the created document upon succes.

- get by id [GET]: localhost:8000/api/lessons/:id
  
  You will recieve the document along with a 200 code upon success.

  ```
  {
    "document": {
        "_id": "6213b997d636ef6f6d693183",
        "title": "node.js",
        "description": "bla bla bla",
        "thumbnail": "",
        "price": 10,
        "days": [
            1,
            3,
            6
        ],
        "start_date": "2022-02-05T00:00:00.000Z",
        "final_date": "2022-02-25T00:00:00.000Z",
        "start_time": "2022-03-05T12:05:00.000Z",
        "end_time": "2022-03-05T15:00:00.000Z",
        "dates": [
            "2022-02-05T00:00:00.000Z",
            "2022-02-08T00:00:00.000Z",
            "2022-02-10T00:00:00.000Z",
            "2022-02-12T00:00:00.000Z",
            "2022-02-15T00:00:00.000Z",
            "2022-02-17T00:00:00.000Z",
            "2022-02-19T00:00:00.000Z",
            "2022-02-22T00:00:00.000Z",
            "2022-02-24T00:00:00.000Z"
        ]
    },
    "success": true
  }
  ```

- update by id [PUT]: localhost:8000/api/lessons/:id
  
  To update a document, you will need to enter the following fields in a 'form-data'. The required fields will be marked as 'required'.
  The 'thumbnail' field is one picture, and in jpg or png format only. You cannot create a document with a thumbnail, as the thumbnail will have a unique id created by the id of the document.
  All the dates will be changed as well.

  title: string [required]
  description: string [required]
  price: number [required]
  thumbnail: file, jpg/png
  start_date: string ex. 2022-2-20 [required]
  final_date: string ex. 2022-3-15 [required]
  start_time: string ex. 12:05 [required]
  end_time: string ex. 15:00 [required]
  days: number ex. 1 [required]

  You will recieve a 201 code and the updated document upon success.

  ```
  {
    "document": {
        "_id": "6213b997d636ef6f6d693183",
        "title": "node.js 2",
        "description": "bla bla bla",
        "thumbnail": "127.0.0.1:8000/public/uploads/lessons/6213b997d636ef6f6d693183/260091650_774416337292522_4615334536867527225_n-1645783091066.jpg",
        "price": 10,
        "days": [
            1,
            3,
            6
        ],
        "start_date": "2022-02-05T00:00:00.000Z",
        "final_date": "2022-02-25T00:00:00.000Z",
        "start_time": "2022-03-05T12:05:00.000Z",
        "end_time": "2022-03-05T15:00:00.000Z",
        "dates": [
            "2022-02-05T00:00:00.000Z",
            "2022-02-08T00:00:00.000Z",
            "2022-02-10T00:00:00.000Z",
            "2022-02-12T00:00:00.000Z",
            "2022-02-15T00:00:00.000Z",
            "2022-02-17T00:00:00.000Z",
            "2022-02-19T00:00:00.000Z",
            "2022-02-22T00:00:00.000Z",
            "2022-02-24T00:00:00.000Z"
        ]
    },
    "success": true
  }
  ```

- delete by id [DELETE]: localhost:8000/api/lessons/:id
  
  The delete endpoint will delete the lesson in question, along with it's events.
  You will recieve a 204 code (No Content) with nothing else upon success.
  The related thumbnail will be deleted as well.
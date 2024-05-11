import unittest
import requests
import json
from bson import ObjectId


class modificar_cita_Tests(unittest.TestCase):
    valid_request_data = None
    invalid_request_data = None

    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://localhost:5000/citas/modify/${id}"
        cls.valid_request_data = {
            "_id" : ObjectId("6625808339d27fad9f3b6137"),
            "fecha" : "2024-05-20T15:30"
        }
        cls.invalid_request_data = {
            "_id" : ObjectId("6625808339d27fad9f3b6137"),
            "fecha" : "2023-05-20T15:30"
        }
    
    @classmethod
    def tearDownClass(cls):
        del cls.valid_request_data
        del cls.invalid_request_data

    def test_modificar_cita(self):
        response = requests.put(self.base_url, json=self.valid_request_data)

        #fecha = json.loads(response.json()["body"])["fecha"]

        self.assertEqual(200,response.status_code)


if __name__ == '__main__':
    unittest.main()
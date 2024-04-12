# from django.test import tag
# from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import APITestCase, APIClient
# from rest_framework.authtoken.models import Token
# from .models import Customer, User

# class CustomerViewSetTestCase(APITestCase):

#     def setUp(self):
#         self.client = APIClient()
#         self.user = User.objects.create_user(username='testcustomer', password='testpassword')
#         self.token = Token.objects.create(user=self.user)
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

#     @tag('Unit-Test')
#     def test_CreateCustomer(self):
#         url = reverse('customer-list')
#         data = {"fullName": "John Doe", "email": "johndoe@example.com", "phone": "0501234567"}
#         response = self.client.post(url, data, format='json')
#         if response.status_code != status.HTTP_201_CREATED:
#             print(response.data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)


#     @tag('Unit-Test')
#     def test_RetrieveCustomer(self):
#         customer = Customer.objects.create(fullName="Jane Doe", email="janedoe@example.com", phone="0987654321")
#         url = reverse('customer-detail', kwargs={'pk': customer.pk})
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['fullName'], "Jane Doe")

#     @tag('Unit-Test')
#     def test_ListCustomers(self):
#         Customer.objects.create(fullName="Alice", email="alice@example.com", phone="0123456789")
#         Customer.objects.create(fullName="Bob", email="bob@example.com", phone="9876543210")
#         url = reverse('customer-list')
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 2)

#     @tag('Unit-Test')
#     def test_UpdateCustomer(self):
#         customer = Customer.objects.create(fullName="Charlie", email="charlie@example.com", phone="1231231234")
#         url = reverse('customer-detail', kwargs={'pk': customer.pk})
#         data = {"fullName": "Charlie Brown", "email": "charliebrown@example.com"}
#         response = self.client.patch(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         updated_customer = Customer.objects.get(pk=customer.pk)
#         self.assertEqual(updated_customer.fullName, "Charlie Brown")
#         self.assertEqual(updated_customer.email, "charliebrown@example.com")

#     @tag('Unit-Test')
#     def test_DeleteCustomer(self):
#         customer = Customer.objects.create(fullName="David", email="david@example.com", phone="3213214321")
#         url = reverse('customer-detail', kwargs={'pk': customer.pk})
#         response = self.client.delete(url)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(Customer.objects.count(), 0)

from django.test import tag
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from .models import Order, OrderItem, Product, Customer, User

class OrdersViewSetTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testorderuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.customer = Customer.objects.create(fullName='Jane Doe', email='jane@example.com', phone='0501234567')
        self.product = Product.objects.create(prodName='Test Product', price=10.99, type='raw')

    @tag('Unit-Test')
    def test_CreateOrder(self):
        url = reverse('order-list')
        data = {
            'customer': self.customer.id,
            'comments': 'Urgent delivery',
            'products': [{'id': self.product.id, 'quantity': 3}]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(OrderItem.objects.count(), 1)
        order = Order.objects.first()
        self.assertEqual(order.customer, self.customer)
        self.assertEqual(order.comments, 'Urgent delivery')

    @tag('Unit-Test')
    def test_RetrieveOrder(self):
        order = Order.objects.create(customer=self.customer, comments='Sample order')
        OrderItem.objects.create(order=order, product=self.product, quantity=2)
        url = reverse('order-detail', kwargs={'pk': order.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['customer'], self.customer.id)
        self.assertEqual(len(response.data['products']), 1)

    @tag('Unit-Test')
    def test_ListOrders(self):
        Order.objects.create(customer=self.customer, comments='First order')
        Order.objects.create(customer=self.customer, comments='Second order')
        url = reverse('order-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    @tag('Unit-Test')
    def test_UpdateOrder(self):
        order = Order.objects.create(customer=self.customer, comments='Initial comment')
        order_item = OrderItem.objects.create(order=order, product=self.product, quantity=1)
        url = reverse('order-detail', kwargs={'pk': order.pk})
        data = {
            'comments': 'Updated comment',
            'products': [{'id': self.product.id, 'quantity': 2}]
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        order_item.refresh_from_db()
        self.assertEqual(order_item.quantity, 2)
        order.refresh_from_db()
        self.assertEqual(order.comments, 'Updated comment')

    @tag('Unit-Test')
    def test_DeleteOrder(self):
        order = Order.objects.create(customer=self.customer, comments='To be deleted')
        OrderItem.objects.create(order=order, product=self.product, quantity=1)
        url = reverse('order-detail', kwargs={'pk': order.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(OrderItem.objects.count(), 0)

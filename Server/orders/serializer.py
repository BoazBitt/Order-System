from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product
from datetime import datetime



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id' ,'prodName']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    products = OrderItemSerializer(source='orderitem_set', many=True, read_only=True)
    creation_date = serializers.SerializerMethodField()
    last_update_date = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id',
            'order_number',
            'customer',
            'comments',
            'creation_date',
            'last_update_date',
            'products'
        ]

    def get_creation_date(self, obj):
        return self.format_date(obj.creation_date)

    def get_last_update_date(self, obj):
        return self.format_date(obj.last_update_date)

    def format_date(self, date):
        day = date.day
        if 4 <= day <= 20 or 24 <= day <= 30:
            suffix = "th"
        else:
            suffix = ["st", "nd", "rd"][day % 10 - 1]
        
        return date.strftime(f"%B {day}{suffix}, %Y")

    def create(self, validated_data):
        # Get the highest existing ID and add one to it to generate the next order number
        last_order = Order.objects.order_by('-id').first()
        next_id = last_order.id + 1 if last_order else 1
        order_number = f'ORD-00{next_id}'
        validated_data['order_number'] = order_number
        return super().create(validated_data)
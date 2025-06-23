from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']  # includes id, name, etc.

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()  # Nested category

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'category', 'stock', 'image', 'is_available', 'created_at', 'updated_at']

    def create(self, validated_data):
        category_data = validated_data.pop('category')  # Extract category data from validated data
        category_instance, created = Category.objects.get_or_create(**category_data)  # Get or create the category
        product = Product.objects.create(category=category_instance, **validated_data)  # Create the product with the category
        return product

    def update(self, instance, validated_data):
        category_data = validated_data.pop('category', None)  # Extract category data
        if category_data:
            category_instance, created = Category.objects.get_or_create(**category_data)  # Get or create category if it changes
            instance.category = category_instance  # Update the product's category
        
        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

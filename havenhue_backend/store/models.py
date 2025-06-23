from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)  # Name of the category (e.g., 'Sofas', 'Chairs')
    description = models.TextField(blank=True, null=True)  # Description of the category (optional)

    def __str__(self):
        return self.name  # This will display the category name in admin and console

class Product(models.Model):
    name = models.CharField(max_length=200)  # Product title or name
    description = models.TextField()  # Full description
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Handles currency format like 9999.99
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products') # E.g., 'Sofas', 'Chairs', 'Wall Art'
    stock = models.PositiveIntegerField(default=0)  # Total items available in inventory
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)  # Optional image upload
    is_available = models.BooleanField(default=True)  # If not in stock or hidden, this can be False
    created_at = models.DateTimeField(auto_now_add=True)  # Auto record when added
    updated_at = models.DateTimeField(auto_now=True)  # Auto update when modified

    def __str__(self):
        return self.name  # This will display product name in admin and console
from django.db import models


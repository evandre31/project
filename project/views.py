from django.contrib.auth.models import User
from django.shortcuts import render


def home(request):
    users = User.objects.all()
    return render(request, 'home.html', {'users': users})


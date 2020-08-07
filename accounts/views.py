from django.shortcuts import render
from django.contrib.auth import authenticate, login


def profile(request):
    # profile_ = Profile.objects.get(user=request.user)  # get profile qui a user(dans profile) = au user request
    return render(request, 'accounts/profile/profile.html', {})

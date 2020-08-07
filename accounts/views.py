from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from accounts.forms import SignupForm


def register(request):  # ou appeler  signin
    if request.method == 'POST':  # save
        form = SignupForm(request.POST)
        if form.is_valid():  # si valide  alors save
            form.save()  # save le new user  mais sans login
            mon_username = form.cleaned_data['username']  # extraire username depuis le form
            mon_password = form.cleaned_data['password1']  # extraire password depuis le form
            user = authenticate(username=mon_username, password=mon_password)  # préparer le user
            login(request, user)  # faire le login
            return redirect('/accounts/profile')  # redirect vers ...
    else:  # show form
        form = SignupForm()
    return render(request, 'accounts/registration/register.html', {'form': form})


def profile(request):
    # profile_ = Profile.objects.get(user=request.user)  # get profile qui a user(dans profile) = au user request
    return render(request, 'accounts/profile/profile.html', {})

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Profile


class SignupForm(UserCreationForm):  # pour register
    email = forms.EmailField(required=True, max_length=100)  # pour que email soit required

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def clean_email(self):  # pour que email soit unique
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('username')
        if email and User.objects.filter(email=email).exclude(username=username).exists():
            raise forms.ValidationError(u'Email addresses must be unique.')
        return email


class UserForm(forms.ModelForm):  # form pour user update
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']


class ProfileForm(forms.ModelForm):  # form pour profile update
    class Meta:
        model = Profile
        fields = ['phone', 'address', 'image']

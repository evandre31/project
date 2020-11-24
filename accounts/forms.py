from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Profile


class SignupForm(UserCreationForm):  # pour register
    username = forms.CharField(help_text='pas despace ni walou',
                               error_messages={'required': "username obligatoire depuis server"},
                               label='Username',
                               widget=forms.TextInput(
                                   attrs={'onfocusout': 'validateUserName()', 'placeholder': 'username'}))
    email = forms.EmailField(help_text='un email valid stp ex@abc.de',
                             required=True,
                             label='Email',
                             max_length=100,
                             error_messages={'required': "email obligatoire depuis server"},
                             widget=forms.EmailInput
                             (attrs={'onfocusout': 'validateEmail()', 'placeholder': 'mets ton email'}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'onfocusout': 'validatePassword()'}))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'onfocusout': 'validateConfirmPassword()'}))

    #  pour que email soit required

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def clean_email(self):  # validation de email dans register
        email = self.cleaned_data.get('email')
        with open("accounts/disposable-email-provider-domains", 'r') as f:  # fichier content provider
            blacklist = f.read().splitlines()
        for disposable_email in blacklist:
            if disposable_email in email:  # si email est dans blacklist
                raise forms.ValidationError('nta mareg %s' % disposable_email)  # envoyer error msg
            else:  # si email n'est pas dans blacklist alors verifier dans la database
                username = self.cleaned_data.get('username')
                if email and User.objects.filter(email=email).exclude(username=username).exists():
                    raise forms.ValidationError(u'Email addresses must be unique.')  # email exist error msg
        return email


class UserForm(forms.ModelForm):  # form pour user update
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class ProfileForm(forms.ModelForm):  # form pour profile update
    class Meta:
        model = Profile
        fields = ['phone', 'address', 'image']

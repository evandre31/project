from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, update_session_auth_hash
from django.template.loader import render_to_string
from .token import activation_token
from django.core.mail import send_mail
from accounts.forms import SignupForm, UserForm, ProfileForm
from accounts.models import Profile


def register(request):  # ou appeler  signin
    if request.method == 'POST':  # save
        form = SignupForm(request.POST)
        if form.is_valid():  # si valide  alors save
            user = form.save(commit=False)  # save le new user  mais sans login
            user.is_active = False
            user.save()
            site = get_current_site(request)
            mail_subject = 'confirmation message for foueds site '
            message = render_to_string('accounts/registration/confirm_email.html',
                                       {'user': user,
                                        'domain': site.domain,
                                        'uid': user.id,
                                        'token': activation_token.make_token(user)}
                                       )
            to_email = form.cleaned_data.get('email')
            to_list = [to_email]
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [to_email]
            send_mail(mail_subject, message, from_email, recipient_list, fail_silently=True)
            return redirect('/accounts/register/activate_mail_sent')

    else:  # show form
        form = SignupForm()
    return render(request, 'accounts/registration/register.html', {'form': form})


def validate_username(request):
    username = request.GET.get('username')
    is_taken = User.objects.filter(username__iexact=username).exists()
    data = {'is_taken': is_taken}
    if data['is_taken']:
        data['error_message'] = "The username already taken"
    return JsonResponse(data)


def activate_mail_sent(request):
    return render(request, 'accounts/registration/activate_mail_sent.html', {})


@login_required
def profile(request):
    storage = messages.get_messages(request)
    profile_ = Profile.objects.get(user=request.user)  # get profile qui a user(dans profile) = au user request
    return render(request, 'accounts/profile/profile.html', {'profile': profile_, 'messages': storage})


@login_required
def profile_edit(request):
    profile_ = Profile.objects.get(user=request.user)  # get profile qui a user(dans profile) = au user request
    if request.method == 'POST':
        userform = UserForm(request.POST, instance=request.user)
        profileform = ProfileForm(request.POST, request.FILES, instance=profile_)  # request.FILES : pour uplaod file
        if userform.is_valid() and profileform.is_valid():
            userform.save()  # save user directement mais le profile nécessité la suivante
            myform = profileform.save(commit=False)  # s'assurer que le profile est relié au user
            myform.user = request.user  # s'assurer que le profile est relié au user
            myform.save()  # save profile
            messages.success(request, 'updated')  # qui sera affiché dans redirect template
            return redirect('accounts:profile')
    else:  # (affichage)
        userform = UserForm(instance=request.user)  # request.user = data du user connecté (affichage)
        profileform = ProfileForm(instance=profile_)  # profile_ = profile du user connecté  (affichage)
    return render(request, 'accounts/profile/edit_profile.html', {'userform': userform, 'profileform': profileform})


def activate(request, uid, token):
    try:
        user = get_object_or_404(User, pk=uid)
    except:
        raise Http404("No user found")
    if user is not None and activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        messages.success(request, 'your account is activated , welcome on my site')
        return redirect('/accounts/profile')
    else:
        return HttpResponse("<h3>Invalid activation link</h3>")

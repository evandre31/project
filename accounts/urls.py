from django.urls import path, include
from . import views
from django.conf.urls import url  # changement de mot de passe
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView
from django.contrib.auth import views as auth_views  # paquet de views user


app_name = 'accounts'

# urlpatterns = [
#     path('signup/', views.signup, name='signup'),
#     path('profile/', views.profile, name='profile'),
#     path('profile/edit', views.profile_edit, name='profile_edit'),
# ]

urlpatterns = [
    path('login/',
         auth_views.LoginView.as_view(template_name='accounts/registration/login.html'),
         name='login'),

    path('logout/',
         auth_views.LogoutView.as_view(template_name='accounts/registration/logged_out.html'),
         name='logout'),

    path('register/', views.register, name='register'),


    # path('signout/', views.signout, name='signout'),
    # path('signup/', views.signup, name='signup'),
    path('profile/', views.profile, name='profile'),
    # path('profile/edit', views.profile_edit, name='profile_edit'),
    # path('change_password/', views.change_password, name='change_password'),
    #
    # path('password-reset/',
    #      auth_views.PasswordResetView.as_view(template_name='accounts/registration/password_reset.html'),
    #      name='password_reset'),
    # path('password-reset/done/',
    #      auth_views.PasswordResetDoneView.as_view(template_name='accounts/registration/password_reset_done.html'),
    #      name='password_reset_done'),
    # path('password-reset-confirm/<uidb64>/<token>/',
    #      auth_views.PasswordResetConfirmView.as_view(template_name='accounts/registration/password_reset_confirm.html'),
    #      name='password_reset_confirm'),
    #
    # path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='accounts/registration/password_reset_complete.html'), name='password_reset_complete'),
]

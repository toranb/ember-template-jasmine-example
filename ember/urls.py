from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

class Index(TemplateView):
    template_name = 'example/index.html'

urlpatterns = patterns('',
    url(r'^/?$', Index.as_view()),
)

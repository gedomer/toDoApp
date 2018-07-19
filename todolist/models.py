from django.db import models

class TodoList(models.Model): 
	STATUSES=(
		('A','Active'),
		('C','Completed'),
	)
	content = models.TextField(max_length=100)
	create_time = models.DateField(auto_now_add=True) 
	status = models.CharField(max_length=1,choices=STATUSES,default='A') 

	def __str__(self):
		return self.content
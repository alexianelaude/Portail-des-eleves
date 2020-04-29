from rest_framework import serializers
from datetime import datetime

from courses.models import Course, Form, Question, Rating, Comment


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        read_only_fields = ('id', )
        fields = read_only_fields + ("name", "form")


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        read_only_fields = ('id', )
        fields = read_only_fields + ('form', 'label', 'required', 'archived', 'category')


class FormSerializer(serializers.ModelSerializer):
    # Writable nested serializer
    questions = QuestionSerializer(many=True, required=False)
    courses = CourseSerializer(many=True, required=False)

    class Meta:
        model = Form
        read_only_fields = ('id', 'date', )
        fields = read_only_fields + ('name', 'questions', 'courses')

    def create_questions(self, instance, update_questions):
        for question_data in update_questions:
            question_data["form"] = instance
            question = Question.objects.create(**question_data)
            question.save()

    def update_questions(self, instance, update_questions):
        for question_data in update_questions:
            question_data["form"] = instance
            Question.objects.filter(id=question_data["id"]).update(**question_data)
            question.save()

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')

        form = Form.objects.create(**validated_data)

        self.create_questions(form, questions_data)

        return form

    def update(self, instance, validated_data):
        # Issue with required fields ?
        instance.date = datetime.now()
        questions_data = validated_data.get("questions")

        update_questions = []
        create_questions = []

        for question in questions_data:
            question = questions_data[0]
            if question.get('id'):
                update_questions.append(question)
            else:
                create_questions.append(question)

        self.create_questions(instance, create_questions)
        self.update_questions(instance, update_questions)

        return instance


class RatingSerializer(serializers.ModelSerializer):
    """
    TODO : 
    Validator for rating -> Check field type based on the question
    """

    class Meta:
        model = Rating
        read_only_fields = ("id", )
        fields = read_only_fields + ('value', )
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Rating.objects.all(),
                fields=['question', 'course']
            )
        ]

    def validate(self, data):
        """Check that the answer type is correct"""
        super(serializers.ModelSerializer, self).validate(data)

        if not Question.objects.filter(id=data["question"]).category == 'R':
            raise serializers.ValidationError("Rating must refer to a 'R' category question")


class CommentSerializer(serializers.ModelSerializer):
    """
    TODO : 
    Validator for rating -> Check field type based on the question
    """

    class Meta:
        model = Comment
        read_only_fields = ("id", )
        fields = read_only_fields + ('content', )
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Comment.objects.all(),
                fields=['question', 'course']
            )
        ]

    def validate(self, data):
        """Check that the answer type is correct"""
        super(serializers.ModelSerializer, self).validate(data)

        if not Question.objects.filter(id=data["question"]).category == 'C':
            raise serializers.ValidationError("Comment must refer to a 'C' category question")
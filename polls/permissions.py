from rest_framework import permissions


class PollPermission(permissions.BasePermission):
    """
        Status ->     | POST                        | Not accepted         | Accepted          |
                      | For them | For another user | Own | Other user's   | Own | Other user's |
        Administrator | C        |                  | RUD | RU             | RU  | RU           |
        Simple        | C        |                  | RUD |                | R   | R            |

        This permission MUST NOT handle the endpoints /vote/ and /results/.
        The POST restriction is handled in the serializer.
    """

    message = 'Request not allowed.'

    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, poll):
        if request.method in permissions.SAFE_METHODS:
            self.message = 'You are not allowed to see this poll.'

            return (request.user.is_staff or  # Administrators can always retrieve.
                    request.user == poll.user or  # Authors can always retrieve.
                    poll.has_been_published)  # Published polls are public.
        elif request.method in ('PATCH',):
            self.message = 'You are not allowed to update this poll.'

            return (request.user.is_staff or  # Administrators can always update.
                    (request.user == poll.user and
                     not poll.state == 'ACCEPTED'))  # Authors can only update if the poll is not accepted.
        elif request.method in ('DELETE',):
            self.message = 'You are not allowed to delete this poll.'

            return request.user == poll.user and poll.state != 'ACCEPTED'
        elif request.method in ('POST',):
            return True

        return False


class ResultsPermission(permissions.BasePermission):
    """
                  | Not published | Published |
        Anyone    |               | R         |
    """

    message = 'You are not allowed to view the results of this poll.'

    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

    def has_object_permission(self, request, view, poll):
        return poll.has_been_published


class VotePermission(permissions.BasePermission):
    """
                  | Not active | Active |
        Anyone    |            | C      |
    """

    message = 'You are not allowed to vote to this poll.'

    def has_permission(self, request, view):
        return request.method in ('POST',)

    def has_object_permission(self, request, view, poll):
        return poll.is_active

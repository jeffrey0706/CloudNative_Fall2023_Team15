import hashlib

# from app.models import User

hash = hashlib.sha512()
name = 'anderson'
salt = ''
hash.update(f"anderson$'<:WF".encode("utf-8"))
print(hash.hexdigest())
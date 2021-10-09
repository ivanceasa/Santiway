"""empty message

Revision ID: c37beda54c62
Revises: a375dbe9354e
Create Date: 2021-10-09 08:57:34.539676

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c37beda54c62'
down_revision = 'a375dbe9354e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comment', sa.Column('user_comments', sa.Integer(), nullable=True))
    op.add_column('comment', sa.Column('post_comments', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'comment', 'user', ['user_comments'], ['id'])
    op.create_foreign_key(None, 'comment', 'post', ['post_comments'], ['id'])
    op.add_column('post', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'post', 'user', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'post', type_='foreignkey')
    op.drop_column('post', 'user_id')
    op.drop_constraint(None, 'comment', type_='foreignkey')
    op.drop_constraint(None, 'comment', type_='foreignkey')
    op.drop_column('comment', 'post_comments')
    op.drop_column('comment', 'user_comments')
    # ### end Alembic commands ###
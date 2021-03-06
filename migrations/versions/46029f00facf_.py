"""empty message

Revision ID: 46029f00facf
Revises: 5684ed3ffe91
Create Date: 2021-11-06 13:23:53.775881

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '46029f00facf'
down_revision = '5684ed3ffe91'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('booking', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'booking', 'user', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'booking', type_='foreignkey')
    op.drop_column('booking', 'user_id')
    # ### end Alembic commands ###

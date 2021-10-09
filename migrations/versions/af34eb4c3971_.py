"""empty message

Revision ID: af34eb4c3971
Revises: c37beda54c62
Create Date: 2021-10-09 09:05:58.550038

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'af34eb4c3971'
down_revision = 'c37beda54c62'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_route',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('route_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['route_id'], ['route.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'route_id')
    )
    op.create_table('user_stage',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('stage_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['stage_id'], ['stage.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'stage_id')
    )
    op.create_table('user_hostel',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('hostel_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['hostel_id'], ['hostel.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'hostel_id')
    )
    op.add_column('hostel', sa.Column('route_id', sa.Integer(), nullable=True))
    op.add_column('hostel', sa.Column('stage_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'hostel', 'stage', ['stage_id'], ['id'])
    op.create_foreign_key(None, 'hostel', 'route', ['route_id'], ['id'])
    op.add_column('stage', sa.Column('route_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'stage', 'route', ['route_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'stage', type_='foreignkey')
    op.drop_column('stage', 'route_id')
    op.drop_constraint(None, 'hostel', type_='foreignkey')
    op.drop_constraint(None, 'hostel', type_='foreignkey')
    op.drop_column('hostel', 'stage_id')
    op.drop_column('hostel', 'route_id')
    op.drop_table('user_hostel')
    op.drop_table('user_stage')
    op.drop_table('user_route')
    # ### end Alembic commands ###
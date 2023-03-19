"""empty message

Revision ID: 607074358e1a
Revises: 2d3dde329ec4
Create Date: 2022-10-16 17:09:47.308054

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '607074358e1a'
down_revision = '2d3dde329ec4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('User', 'email',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
    op.alter_column('User', 'password',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('User', 'password',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
    op.alter_column('User', 'email',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
    # ### end Alembic commands ###

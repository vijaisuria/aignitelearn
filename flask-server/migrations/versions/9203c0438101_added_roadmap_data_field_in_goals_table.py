"""Added roadmap data field in goals table

Revision ID: 9203c0438101
Revises: fd44b49d9ffc
Create Date: 2025-01-04 17:30:14.472701

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9203c0438101'
down_revision = 'fd44b49d9ffc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('goals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('RoadmapData', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('goals', schema=None) as batch_op:
        batch_op.drop_column('RoadmapData')

    # ### end Alembic commands ###

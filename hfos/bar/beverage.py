#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# Isomer Application Framework
# ============================
# Copyright (C) 2011-2018 Heiko 'riot' Weinen <riot@c-base.org> and others.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

__author__ = "Heiko 'riot' Weinen"
__license__ = "AGPLv3"

"""
Schema: Beverage
================

Contains
--------

beverage: Structure to store beverages for bar inventories,

"""

from isomer.schemata.defaultform import *
from isomer.schemata.base import base_object, uuid_object

BeverageSchema = base_object('beverage')

BeverageSchema['properties'].update({
    'description': {'type': 'string', 'format': 'html',
                    'title': 'Beverage description',
                    'description': 'Beverage description'},
    'supplier': uuid_object('supplier', description='Select a supplier'),
    'volume': {'type': 'string'},
    'amount_per_crate': {'type': 'integer'},
    'price_selling': {'type': 'number'},
    'price_buying': {'type': 'number'},
    'price_crate': {'type': 'number'},
    'deposit_crate': {'type': 'number'},
    'deposit_bottle': {'type': 'number'}
})

BeverageForm = [
    {
        'type': 'section',
        'htmlClass': 'row',
        'items': [
            {
                'type': 'section',
                'htmlClass': 'col-xs-4',
                'items': [
                    'name', lookup_field('supplier', 'supplier')
                ]
            },
            {
                'type': 'section',
                'htmlClass': 'col-xs-4',
                'items': [
                    'volume', 'price_selling'
                ]
            },
            {
                'type': 'section',
                'htmlClass': 'col-xs-4',
                'items': [
                    'price_buying', 'price_crate'
                ]
            },
            {
                'type': 'section',
                'htmlClass': 'col-xs-4',
                'items': [
                    'deposit_crate', 'deposit_bottle'
                ]
            },
        ]
    },
    'description',
    editbuttons
]

Beverage = {'schema': BeverageSchema, 'form': BeverageForm}

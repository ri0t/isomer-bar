/*
 * #!/usr/bin/env python
 * # -*- coding: UTF-8 -*-
 *
 * __license__ = """
 * Isomer Application Framework
 * ============================
 * Copyright (C) 2011- 2018 riot <riot@c-base.org> and others.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * """
 */

import order_icon from './assets/iconmonstr-beer-1.svg';
import pos_icon from './assets/iconmonstr-checkout-2.svg';


export function routing($stateProvider) {

    $stateProvider
        .state('app.bar_order', {
            url: '/order',
            template: '<barorder></barorder>',
            label: 'Bar Management',
            icon: order_icon
        })
        .state('app.bar_pos', {
            url: '/pos',
            template: '<barpos></barpos>',
            label: 'Point Of Sale',
            icon: pos_icon
        })
}

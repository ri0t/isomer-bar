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

import './bar/bar.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import { routing } from './bar.config.js';

import ordercomponent from './bar/order';
import ordertemplate from './bar/order.tpl.html';

import poscomponent from './bar/pos';
import postemplate from './bar/pos.tpl.html';


export default angular
    .module('main.app.bar', [uirouter])
    .config(routing)
    .component('barpos', {controller: poscomponent, template: postemplate})
    .component('barorder', {controller: ordercomponent, template: ordertemplate})
    .name;

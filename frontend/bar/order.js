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

'use strict';

/**
 * @ngdoc function
 * @name isomerFrontendApp.controller:BarCtrl
 * @description
 * # BarCtrl
 * Controller of the isomerFrontendApp
 */
class Bar {

    constructor(scope, rootscope, $modal, user, objectproxy, socket, menu) {
        this.scope = scope;
        this.rootscope = rootscope;
        this.$modal = $modal;
        this.user = user;
        this.op = objectproxy;
        this.socket = socket;
        this.menu = menu;

        this.beverages = [];

        this.order_items = [
            {
                beverage: {
                    uuid: 'foobar',
                    name: 'Mate',
                    price_crate: 23
                },
                crates: 5
            }, {
                beverage: {
                    uuid: 'quxbaz',
                    name: 'Cerna Hora Boruvka',
                    price_crate: 15
                },
                crates: 3
            }
        ];

        let self = this;

        this.request_beverages = function () {
            console.log('[BAR] Login successful - fetching beverages data');
            this.op.search('beverage', '*', ['name', 'description', 'price_crate']).then(function (msg) {
                let beverages = msg.data.list;
                console.log("[BAR] Beverages: ", beverages);
                for (let beverage of beverages) {
                    self.beverages[beverage.uuid] = beverage;
                }
            });
        };

        this.loginupdate = this.rootscope.$on('User.Login', function () {
            self.request_beverages();
        });

        if (this.user.signedin === true) {
            self.request_beverages();
        }


        self.scope.$on('$destroy', function () {
        });
    }
}

Bar.$inject = ['$scope', '$rootScope', '$modal', 'user', 'objectproxy', 'socket', 'menu'];

export default Bar;
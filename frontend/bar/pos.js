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

    constructor(scope, rootscope, user, objectproxy, socket, uuid, notification, $timeout) {
        this.scope = scope;
        this.rootscope = rootscope;
        this.user = user;
        this.op = objectproxy;
        this.socket = socket;
        this.uuid = uuid;
        this.notification = notification;

        this.numerical_input = "";
        this.comment_field = "";
        this.running_total = 0;
        this.total_label = "Total:";
        this.finished = false;
        this.alien = false;

        this.orders = {};

        this.beverages = [
            {
                group: 'alcoholic',
                name: 'Pisswasser',
                uuid: 'foo',
                price: {
                    alien: 2.5,
                    member: 1.3
                }
            },
            {
                group: 'alcoholic',
                name: 'Berliner',
                uuid: 'bar',
                price: {
                    alien: 2.5,
                    member: 1.3
                }
            },
            {
                group: 'alcoholic',
                name: 'Boruvka',
                uuid: 'qux',
                price: {
                    alien: 2.5,
                    member: 1.3
                }
            },
            {
                group: 'alcoholic',
                name: 'Tas',
                uuid: 'spam',
                price: {
                    alien: 2.5,
                    member: 1.3
                }
            },
            {
                group: 'alcoholic',
                name: 'Granat',
                uuid: 'ham',
                price: {
                    alien: 2.5,
                    member: 1.3
                }
            },
            {
                group: 'non-alcoholic',
                name: 'Club Mate',
                uuid: 'eggs',
                price: {
                    alien: 2,
                    member: 1.3
                }
            },
            {
                group: 'non-alcoholic',
                name: 'Flora',
                uuid: 'foofoo',
                price: {
                    alien: 2,
                    member: 1.3
                }
            },
            {
                group: 'non-alcoholic',
                name: 'Limo',
                uuid: 'foobar',
                price: {
                    alien: 2,
                    member: 1.3
                }
            },
            {
                group: 'snacks',
                name: 'Salami',
                uuid: 'fooqux',
                price: {
                    alien: 1,
                    member: 1
                }
            },
            {
                group: 'snacks',
                name: 'Zuckerriegel',
                uuid: 'foospam',
                price: {
                    alien: 1,
                    member: 1
                }
            }
        ];

        this.gridsterOptions = {
            // any options that you can set for angular-gridster (see:  http://manifestwebdesign.github.io/angular-gridster/)
            columns: screen.width / 50,
            rowHeight: 75,
            colWidth: 50,
            floating: false,
            draggable: {
                enabled: false
            },
            resizable: {
                enabled: false
            }
        };

        this.pos_buttons = {};

        this.groups = {
            'alcoholic': {
                color: 'darkslategray'
            },
            'non-alcoholic': {
                color: 'lightseagreen'
            },
            'snacks': {
                color: 'lightcoral'
            }
        };

        this.add_beverage = function (item) {
            if (typeof this.pos_buttons[item.group] === 'undefined') {
                this.pos_buttons[item.group] = {};
            }
            this.pos_buttons[item.group][item.uuid] = {
                name: item.name,
                size: {
                    width: 3,
                    height: 2
                }
            };
            this.beverages[item.uuid] = {
                name: item.name,
                price: item.price
            }
        };

        this.add_beverages = function () {
            for (let item of this.beverages) {
                this.add_beverage(item)
            }
        };

        this.add_beverages();

        
        let self = this;


        this.clock = "00:00";
        this.tickInterval = 1000;

        let tick = function() {
            self.clock = Date.now();
            $timeout(tick, self.tickInterval);
        };

        // Start the timer
        $timeout(tick, this.tickInterval);
        
        
        this.clear_all = function () {
            this.orders = {};
            this.running_total = 0;

            this.clear_numeric_input();
            this.finished = false;
            this.total_label = "Total:";
        };

        this.add_item = function (uuid) {
            console.log('[POS] Adding item');

            if (this.finished) {
                this.clear_all();
            }

            let order_uuid = this.uuid.v4();

            let price_selector = this.alien ? 'alien' : 'member';

            this.orders[order_uuid] = {
                type: 'item',
                class: price_selector,
                price: this.beverages[uuid].price[price_selector],
                name: this.beverages[uuid].name
            };
            this.recalculate_total();
        };

        this.add_manual = function (negative, override) {
            console.log('[POS] Adding manual price');

            if (this.finished && !override === true) {
                this.clear_all();
            }

            let order_uuid = this.uuid.v4();
            let price = (typeof negative === 'undefined') ? this.pending_value : -this.pending_value;
            let name = (this.comment_field !== '') ? this.comment_field : 'Manual Input';

            function isNumeric(n) {
              return !isNaN(parseFloat(n)) && isFinite(n);
            }
            if (!isNumeric(price)) {
                this.notification.add('warning', 'Invalid number', 'Please enter valid prices and use a comma to separate.');
                return
            }

            let price_selector = this.alien ? 'alien' : 'member';

            this.orders[order_uuid] = {
                type: 'manual',
                class: price_selector,
                price: price,
                name: name
            };
            this.clear_numeric_input();
            this.recalculate_total();
        };

        this.remove_order = function (uuid) {
            console.log('[POS] Removing order item:', uuid);

            if (this.finished) {
                return
            }

            delete this.orders[uuid];

            this.recalculate_total();
        };

        this.recalculate_total = function () {
            console.log('[POS] Recalculating total');

            this.running_total = 0;
            for (let uuid in this.orders) {
                let item = this.orders[uuid];
                console.log('[POS] Item:', item);
                this.running_total += item.price;
            }
        };
        
        let toNumber = function (numberString) {
            let result = 0;
            if (numberString) {
                result = numberString * 1;
            }
            return result;
        };

        this.update_input = function() {
            this.pending_value = toNumber(this.numerical_input);
        };
        
        this.updateOutput = function (btn) {
            if (this.numerical_input === "0" || this.newNumber) {
                this.numerical_input = btn;
                this.newNumber = false;
            } else {
                this.numerical_input += String(btn);
            }
            this.pending_value = toNumber(this.numerical_input);
        };

        this.clear_numeric_input = function() {
            this.pending_value = 0;
            this.numerical_input = '';
            this.comment_field = '';
        };

        this.submit_atari = function() {
            this.submit();
        };

        this.submit_coupon = function() {
            this.submit();
        };

        this.submit_cash = function() {
            this.submit();
        };

        this.submit = function() {
            this.finished = true;
        };

        this.calculate_return = function() {
            this.comment_field = "Customer paid";
            this.add_manual(true, true);
            this.total_label = "Return:";
        };

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

Bar.$inject = ['$scope', '$rootScope', 'user', 'objectproxy', 'socket', 'uuid', 'notification', '$timeout'];

export default Bar;